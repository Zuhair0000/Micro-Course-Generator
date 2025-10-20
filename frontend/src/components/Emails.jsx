import React from "react";
import { Card, CardContent } from "./Card";
import { Mail } from "lucide-react";

export default function Emails() {
  return (
    <div className="py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-xl mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Email Sequence</h2>
        <p className="text-muted-foreground text-lg">
          Automated emails sent to guide learners through your micro-course
        </p>
      </div>

      {/* Email Cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {[
          {
            day: "Day 0",
            title: "Welcome Email",
            desc: "Sent immediately after enrollment — introduces the course and sets expectations.",
          },
          {
            day: "Day 1",
            title: "Lesson 1 Reminder",
            desc: "Highlights the first lesson with a summary and call to action to start learning.",
          },
          {
            day: "Day 3",
            title: "Lesson 2 Released",
            desc: "Notifies the learner that the next lesson is now available, reinforcing engagement.",
          },
          {
            day: "Day 5",
            title: "Completion & Feedback",
            desc: "Encourages the learner to complete the final lesson and share feedback.",
          },
        ].map((email, index) => (
          <Card
            key={index}
            className="bg-[#1F2028]/80 border border-white/10 shadow-md hover:shadow-xl transition-all"
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {email.day}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#F3911D]" /> {email.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {email.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>💌 All emails are sent automatically based on your drip schedule.</p>
      </div>
    </div>
  );
}
