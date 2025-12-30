import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/plants"); // redirect after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          Register to HerbVerse
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#081612]/80 border border-mintGreen text-softWhite focus:outline-none focus:ring-2 focus:ring-mintGreen transition-all"
          required
        />

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

        {/* Role Selector */}
        <div className="relative w-full">
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="appearance-none w-full p-3 rounded-xl bg-[#081612]/80 border border-mintGreen text-softWhite 
               focus:outline-none focus:ring-2 focus:ring-mintGreen transition-all 
               cursor-pointer pr-10"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
  {/* Custom dropdown arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg
      className="w-5 h-5 text-mintGreen"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-mintGreen to-oliveAccent text-deepForest font-semibold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-mintGreen/40 transition-all duration-300"
        >
          {loading ? "Registering..." : "Enter the Garden"}
        </button>

        <p className="text-softWhite text-center">
          Already have an account?{" "}
          <span
            className="text-mintGreen cursor-pointer hover:text-oliveAccent"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
