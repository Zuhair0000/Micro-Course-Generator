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

exports.getAllDrafts = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT id, title, schedule, created_at FROM drafts WHERE user_id = $1",
      [userId]
    );

    res
      .status(201)
      .json({ message: "Drafts fetched successfully", drafts: result.rows });
  } catch (err) {
    console.error("Failed to fetch drafts:", err);
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};

exports.getLessonsByDraftId = async (req, res) => {
  const { draftId } = req.params;

  try {
    const resultLessons = await pool.query(
      "SELECT * FROM lessons WHERE draft_id = $1",
      [draftId]
    );

    const resultEmails = await pool.query(
      "SELECT * FROM emails WHERE draft_id = $1",
      [draftId]
    );

    const resultSchedule = await pool.query(
      "SELECT schedule FROM drafts WHERE id = $1",
      [draftId]
    );

    console.log("Lessons found:", resultLessons.rows);
    console.log("Requested draftId:", draftId);
    res.status(201).json({
      message: "lessons fetched successfully",
      lessons: resultLessons.rows,
      emails: resultEmails.rows,
      schedule: resultSchedule.rows,
    });
  } catch (err) {
    console.error("Failed to fetch lessons:", err);
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
};

exports.editLesson = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(409).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE lessons SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );

    res
      .status(200)
      .json({ message: "Lesson updated successfully", lesson: result.rows[0] });
  } catch (err) {
    console.error("Failed to Update lesson:", err);
    return res.status(500).json({ message: "Failed to update lessons" });
  }
};

exports.deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM lessons WHERE id = $1", [id]);

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error("Failed to deleted lesson:", err);
    return res.status(500).json({ message: "Failed to deleted lessons" });
  }
};
