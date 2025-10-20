import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center bg-[#1F2028] text-white px-6 py-3">
      <Link className="text-lg font-bold flex justify-center items-center">
        Micro-Course Generator
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          to="/signup"
          className="px-4 py-2 bg-gradient-brand rounded-2xl hover:opacity-90 transition"
        >
          Sign up
        </Link>
        <Button onSubmit={() => navigate("/login")}>Login</Button>
      </div>
    </nav>
  );
}
