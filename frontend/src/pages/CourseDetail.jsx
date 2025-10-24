// src/pages/CourseDetail.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { BookOpen, Calendar, Mail } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import Schedule from "../components/Schedule";
import Lessons from "../components/Lessons";
import Emails from "../components/Emails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [lessons, setLessons] = useState([]);
  const [emails, setEmails] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(`${API_URL}/api/lessons/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLessons(data.lessons);
      setEmails(data.emails);
      setSchedule(data.schedule);
    };
    fetchLessons();
  }, [API_URL, id, token]);
  return (
    <>
      <Navbar showbuttons={false} />
      <div className="min-h-screen bg-[#1F2028] flex flex-col items-center text-white px-6 py-20">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Micro-Course: Basic Python for Data Cleaning
        </h1>

        {/* Tabs */}
        <div className="flex space-x-10 border-b border-gray-700 mb-6">
          {["lessons", "schedule", "emails"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "lessons" && (
          <Lessons lessons={lessons} setLessons={setLessons} />
        )}

        {activeTab === "schedule" && <Schedule schedule={schedule} />}

        {activeTab === "emails" && <Emails emails={emails} />}
      </div>
    </>
  );
}
