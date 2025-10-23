const Groq = require("groq-sdk");
const pool = require("../db");
const { Models } = require("groq-sdk/resources/models.mjs");
const { response } = require("express");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateLessons = async (req, res) => {
  const { topic, targetedAudience } = req.body;
  const user_id = req.user.id;
  if (!topic || !targetedAudience) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const prompt = `
      You are a micro-course generator. Create a 5-lesson structure for the topic: "${topic} for ${targetedAudience}".
      For each lesson, include:
      - lesson_title
      - lesson_summary
      - quiz_question
      - quiz_answer

      Then generate 3 email sequence ideas for launching the course, in this JSON format:
      {
        "lessons": [
          { "title": "...", "summary": "...", "quiz": "...", "answer": "..." }
        ],
        "emails": [
          { "subject": "...", "body": "..." }
        ],
        "schedule": "daily" or "weekly"
      }
    `;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You generate structured JSON responses only.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(completion.choices[0].message.content);

    const { lessons, emails, schedule } = data;

    const draftResult = await pool.query(
      "INSERT INTO drafts (user_id, title, schedule) VALUES ($1, $2, $3) RETURNING id",
      [user_id, topic, schedule]
    );

    const draftId = draftResult.rows[0].id;

    for (const lesson of lessons) {
      await pool.query(
        "INSERT INTO lessons (draft_id, title, content) VALUES ($1, $2, $3)",
        [
          draftId,
          lesson.title,
          `${lesson.summary}\n\nQuiz: ${lesson.quiz}\/ Answer: ${lesson.answer}`,
        ]
      );
    }

    if (emails && emails.length > 0) {
      for (const email of emails) {
        const subject = email.subject || email.title || "Untitled Email";
        const body = email.body || email.content || "No body provided";

        await pool.query(
          "INSERT INTO emails (draft_id, subject, body) VALUES ($1, $2, $3)",
          [draftId, subject, body]
        );
      }
    } else {
      console.warn("⚠️ No emails found in AI response.");
    }

    res.status(201).json({
      message: "Ai-generated micro-course saved successfully",
      draftId,
      lessons,
      emails,
      schedule,
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("❌ Error generating course:", err);
    res.status(500).json({ error: err.message });
  }
};
