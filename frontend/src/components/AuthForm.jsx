import React, { useState, useRef } from "react";
import Button from "./Button";
import Input from "./InputBox";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [error, setError] = useState("");

  const MAX_ATTEMPTS = 3;

  const webcamRef = useRef(null);
  const [captureMode, setCaptureMode] = useState(false);

  const navigate = useNavigate();

  // Wait helper
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Capture webcam image
  const captureImage = () => {
    if (!webcamRef.current) return null;
    return webcamRef.current.getScreenshot();
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!username || !email || !password || !confirmPassword) {
        setError("All fields are required.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Signup failed");
          return;
        }

        alert("Signup successful! You can now sign in.");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsSignup(false);
      } catch {
        setError("Server error! Check backend.");
      }
      return;
    }

    // LOGIN LOGIC ------------------------------
    const response = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      // Max attempts exceeded
      if (newAttempts >= MAX_ATTEMPTS) {
        setError("3 failed attempts! Capturing image...");

       setCaptureMode(true);

        // give webcam real time to start
        await wait(1500);

        const img = captureImage();
        console.log(img);
        
        setCaptureMode(false);


        if (img) {
          await fetch("http://localhost:5000/api/auth/log-failed-attempt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, image: img }),
          });
          alert("Attempt logged with photo.");
        } else {
          alert("Failed to capture image.");
        }

        setCaptureMode(false);
        return;
      }

      // Normal failed attempt
      setError(`${data.error} | Attempts left: ${MAX_ATTEMPTS - newAttempts}`);
      return;
    }

    // SUCCESS LOGIN
    alert(`Welcome ${data.user.name}!`);
    setLoginAttempts(0);
    setError("");
    navigate("/welcome");
  };

  const handleSwitchMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoginAttempts(0);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="title">{isSignup ? "Create Account" : "Sign In"}</h1>

        {/* FIXED WEBCAM (invisible but active) */}
        {captureMode && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              width: "200px",
              height: "150px",
              background: "#000",
              zIndex: 9999,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 200, height: 150, facingMode: "user" }}
            />
          </div>
        )}


        <form onSubmit={handleSubmit}>
          {isSignup && (
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignup && (
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {error && <p className="error-text">{error}</p>}

          <Button text={isSignup ? "Sign Up" : "Sign In"} type="submit" />
        </form>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button className="switch-btn" onClick={handleSwitchMode}>
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
