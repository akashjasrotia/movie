import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("http://localhost:3000/isLoggedIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 font-[Poppins]">
      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-xl text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="block mb-2 text-gray-300 text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-500 transition-all py-3 rounded-xl font-medium shadow-md hover:shadow-blue-500/30"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:text-blue-300 cursor-pointer transition"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
