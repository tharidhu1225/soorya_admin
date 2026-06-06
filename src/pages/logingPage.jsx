import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URI;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.error || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/068/582/882/small/a-beautifully-plated-spaghetti-dish-garnished-with-basil-set-on-a-wooden-table-with-wine-glasses-and-fairy-lights-in-the-background-photo.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-black/60 border border-yellow-500/30 rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo.jpeg"
              alt="Soorya Garden"
              className="w-28 h-28 object-contain mb-4"
            />

            <h1 className="text-3xl font-bold text-yellow-400 text-center">
              SOORYA GARDEN
            </h1>

            <p className="text-gray-300 text-center text-sm mt-2">
              Restaurant & Bar Menu Management System
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Footer */}
            <div className="pt-4">
              <p className="text-center text-gray-400 text-sm">
                © 2026 TN International (Pvt) Ltd. All rights reserved.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}