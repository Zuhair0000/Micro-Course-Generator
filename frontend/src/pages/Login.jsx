import React from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#1F2028]">
      <Navbar />

      <div className="flex justify-center items-center mt-20 px-4">
        <AuthForm type="login" />
      </div>
    </div>
  );
}
