import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData, setFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup Failed");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
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
