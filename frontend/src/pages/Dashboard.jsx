import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-[#1F2028] py-40 px-6">
        <h1 className="text-4xl text-center font-bold text-orange-500 mb-4">
          Create Micro-Courses
        </h1>
        <p className="text-gray-400 mb-30 text-center">
          Transform any topic into a professional micro-course with AI-powered
          content generation, landing pages, and email sequences.
        </p>

        <Button onSubmit={() => navigate("/create")}>Create</Button>

        <div className="relative w-[calc(100%+3rem)] -mx-6 my-2 h-64 overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#gradient)"
              d="M0,0 C360,160 1080,160 1440,0 L1440,320 L0,320 Z"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F3911D" />
                <stop offset="100%" stopColor="#840B86" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className="text-3xl text-orange-500 font-bold py-10">
          Previous Courses
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg=[#2A2B33] rounded-2xl border w-72 p-5 shadow-lg cursor-pointer text-white border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Title</h3>
            <p className="text-gray-400 mb-3 text-sm">12/12/25</p>
            <p className="text-gray-300 mb-3 text-sm">lessons preview</p>
          </div>

          <div className="bg=[#2A2B33] rounded-2xl border w-72 p-5 shadow-lg cursor-pointer text-white border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Title</h3>
            <p className="text-gray-400 mb-3 text-sm">12/12/25</p>
            <p className="text-gray-300 mb-3 text-sm">lessons preview</p>
          </div>

          <div className="bg=[#2A2B33] rounded-2xl border w-72 p-5 shadow-lg cursor-pointer text-white border-white/20 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Title</h3>
            <p className="text-gray-400 mb-3 text-sm">12/12/25</p>
            <p className="text-gray-300 mb-3 text-sm">lessons preview</p>
          </div>
        </div>
      </div>
    </>
  );
}
