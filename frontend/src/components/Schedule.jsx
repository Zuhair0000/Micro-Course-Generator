import React from "react";
import { BookOpen, Calendar, Mail } from "lucide-react";
import { Card, CardContent } from "./Card";

export default function Schedule({ schedule }) {
  const days = schedule === "daily" ? [1, 2, 3, 4, 5] : [1, 8, 15, 22, 29]; // weekly visualization

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-xl mb-4">
          <Calendar className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Drip Schedule</h2>
        <p className="text-muted-foreground text-lg">
          See how your lessons and emails are released over 5 days
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-12">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FFA500] via-[#FF5EAA] to-[#800080]"></div>

        {/* Days */}
        {days.map((day) => (
          <div key={day} className="relative mb-16">
            {/* Day Bubble */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-full border-4 border-background shadow-xl z-10">
              <span className="text-2xl font-extrabold text-white drop-shadow-sm">
                {day}
              </span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-8 items-center">
              {/* Email card (left side on odd days, right side on even) */}
              <div className={day % 2 === 1 ? "text-right" : "col-start-2"}>
                <Card className="inline-block max-w-md shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground font-medium mb-1">
                        Email Sent
                      </div>
                      <div className="font-semibold">
                        Day {day}: Lesson Reminder
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lesson card (right side on odd days, left side on even) */}
              <div className={day % 2 === 1 ? "col-start-2" : "text-right"}>
                <Card className="inline-block max-w-md shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-5 flex items-start gap-3">
                    {day % 2 === 1 && (
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div className={day % 2 === 1 ? "text-left" : "text-right"}>
                      <div className="text-sm text-muted-foreground font-medium mb-1">
                        Lesson Unlocked
                      </div>
                      <div className="font-semibold">
                        Lesson {day}: Topic Title Here
                      </div>
                    </div>
                    {day % 2 !== 1 && (
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <Card className="mt-20">
        <CardContent className="p-6 flex justify-center gap-10">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Email Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Lesson Unlocked</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
