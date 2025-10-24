import { BookOpen } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./Card";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Lessons({ lessons, setLessons }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");

  const handlelEditLesson = async () => {
    try {
      const res = await fetch(`${API_URL}/api/lessons/edit/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success("Lesson Updated Successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating:", err);
      setErrorMessage(err.message || "unknown error occured");
    }
  };

  const handlelDeleteLesson = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/lessons/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      toast.success("Lesson deleted Successfully");

      setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    } catch (err) {
      console.error("Error updating:", err);
      setErrorMessage(err.message || "unknown error occured");
    }
  };

  const handleOpenModal = (e, lesson) => {
    e.preventDefault();
    setIsModalOpen(true);
    setCurrentId(lesson.id);
    setFormData({
      title: lesson.title,
      content: lesson.content,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = (e) => {
    e.preventDefault;
    setIsModalOpen(false);
  };

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
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F3911D]" /> {lesson.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  {lesson.content}
                </p>
              </div>
              <button onClick={(e) => handleOpenModal(e, lesson)}>Edit</button>
              <button onClick={(e) => handlelDeleteLesson(e, lesson.id)}>
                Delete
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1F2028] text-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F3911D] via-[#C94BAA] to-[#840B86] bg-clip-text text-transparent">
                ✏️ Edit Lesson
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter lesson title..."
                  className="w-full bg-[#2A2B36] border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F3911D] text-gray-100 placeholder-gray-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  placeholder="Write the lesson content here..."
                  value={formData.content}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-[#2A2B36] border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C94BAA] text-gray-100 placeholder-gray-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <Button onSubmit={handlelEditLesson}>Save Changes</Button>
              </div>
            </form>
            {errorMessage && (
              <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>📘 Lessons are unlocked progressively through your drip schedule.</p>
      </div>
    </div>
  );
}
