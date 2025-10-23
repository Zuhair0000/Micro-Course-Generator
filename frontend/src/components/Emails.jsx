import React from "react";
import { Card, CardContent } from "./Card";
import { Mail } from "lucide-react";

export default function Emails({ emails }) {
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
        {emails.map((email, index) => (
          <Card
            key={index}
            className="bg-[#1F2028]/80 border border-white/10 shadow-md hover:shadow-xl transition-all"
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#F3911D]" /> {email.subject}
                </h3>
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
