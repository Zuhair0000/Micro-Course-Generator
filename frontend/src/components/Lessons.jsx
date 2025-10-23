import { BookOpen } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./Card";

export default function Lessons({ lessons }) {
  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-xl mb-4">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Course Lessons</h2>
        <p className="text-muted-foreground text-lg">
          A quick overview of all lessons included in your micro-course
        </p>
      </div>

      {/* Lessons List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {lessons.map((lesson, index) => (
          <Card
            key={lesson.id || index}
            className="bg-[#1F2028]/80 border border-white/10 shadow-md hover:shadow-xl transition-all"
          >
            <CardContent className="p-6 flex items-start gap-4">
              {/* Lesson Badge */}

              {/* Lesson Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F3911D]" /> {lesson.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  {lesson.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>📘 Lessons are unlocked progressively through your drip schedule.</p>
      </div>
    </div>
  );
}
