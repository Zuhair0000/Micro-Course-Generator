import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1F2028]">
      <Navbar />

      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-l from-[#f3911D] to-[#840B86] text-transparent bg-clip-text mb-4">
          Create Your Micro-Course
        </h1>
        <p className="max-w-2xl text-gray-300 mb-8">
          Transform your company’s vision into compelling brand stories that
          resonate with your audience. Powered by advanced AI to craft
          narratives that inspire and convert.
        </p>
        <Button onSubmit={() => navigate("/login")}>Get Started</Button>
      </div>
    </div>
  );
}
