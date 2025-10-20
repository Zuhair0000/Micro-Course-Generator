import React from "react";

export default function Button({ children, onSubmit }) {
  return (
    <button
      className="px-8 py-4 text-lg font-medium rounded-2xl bg-gradient-to-l from-[#f3911D] to-[#840B86] text-white"
      onClick={onSubmit}
    >
      {children}
    </button>
  );
}
