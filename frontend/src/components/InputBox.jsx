
import React from "react";

export default function Input({ label, type, value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        required
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}
