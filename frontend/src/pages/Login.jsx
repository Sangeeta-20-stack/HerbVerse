import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

   try {
    const res = await axiosInstance.post("/auth/login", formData);

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);

// ✅ store user object
localStorage.setItem(
  "user",
  JSON.stringify({
    id: res.data._id,
    name: res.data.name,
    email: res.data.email,
    role: res.data.role,
  })
);

if (res.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/plants");
}

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center relative font-inter">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/autumn-nature-landscape-colorful-forest-autumn-nature-landscape-colorful-forest-morning-sunlight-131400332.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[#0b1f1a]/70 z-0" />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-[#0b1f1a]/80 backdrop-blur-md rounded-3xl p-10 flex flex-col gap-6
                  shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(110,231,183,0.5)]"
      >
        <h2 className="text-3xl font-extrabold text-mintGreen text-center animate-fadeIn font-cinzel">
          Login to HerbVerse
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#081612]/80 border border-mintGreen text-softWhite focus:outline-none focus:ring-2 focus:ring-mintGreen transition-all"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#081612]/80 border border-mintGreen text-softWhite focus:outline-none focus:ring-2 focus:ring-mintGreen transition-all"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-mintGreen to-oliveAccent text-deepForest font-semibold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-mintGreen/40 transition-all duration-300"
        >
          {loading ? "Logging in..." : "Enter the Garden"}
        </button>

        <p className="text-softWhite text-center">
          Don’t have an account?{" "}
          <span
            className="text-mintGreen cursor-pointer hover:text-oliveAccent"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
