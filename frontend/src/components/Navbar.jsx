import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ showbuttons = true }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-[#1F2028] text-white px-6 py-3">
      <Link
        to={token ? "/dashboard" : "/"}
        className="text-lg font-bold flex justify-center items-center"
      >
        Micro-Course Generator
      </Link>

      {showbuttons && (
        <div className="flex gap-4 items-center">
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-brand rounded-2xl hover:opacity-90 transition"
          >
            Sign up
          </Link>
          <Button onSubmit={() => navigate("/login")}>Login</Button>
        </div>
      )}

      {token && <Button onSubmit={handleLogout}>Logout</Button>}
    </nav>
  );
}
