import React from "react";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className="btn-primary">
      {text}
    </button>
  );
}