import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formdata) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup Failed");

      navigate("/logon");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#1F2028]">
      <Navbar />

      <div className="flex justify-center items-center mt-20 px-4">
        <AuthForm
          type="signup"
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
