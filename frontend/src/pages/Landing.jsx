import React from "react";
import Navbar from "../components/Navbar";
import PlantModel from "../components/PlantModel";
import FeaturesSection from "../components/FeaturesSection"; 
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#556B2F] font-inter relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-7">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight">
            <span className="inline-block animate-wordFade delay-0 text-[#556B2F] hover:text-[#A3C4A6] transition-colors">
              Explore
            </span>{" "}
            <span className="inline-block animate-wordFade delay-150 text-[#556B2F] hover:text-[#A3C4A6] transition-colors">
              Ancient
            </span>{" "}
            <span className="inline-block animate-wordFade delay-300 text-[#556B2F] hover:text-[#A3C4A6] transition-colors">
              Healing
            </span>
            <br />
            <span className="inline-block animate-wordFade delay-500 text-[#F5D547] hover:text-[#A3C4A6] transition-colors">
              Through
            </span>{" "}
            <span className="inline-block animate-wordFade delay-650 text-[#F5D547] hover:text-[#A3C4A6] transition-colors">
              Modern
            </span>{" "}
            <span className="inline-block animate-wordFade delay-800 text-[#F5D547] hover:text-[#A3C4A6] transition-colors">
              Technology
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-[#8B6D5C] max-w-xl leading-relaxed animate-fadeIn">
            A virtual herbal garden to discover medicinal plants, traditional
            wisdom, and their real-world healing applications — all in one
            immersive experience.
          </p>

          <div className="flex gap-4 pt-4 flex-wrap animate-fadeIn">
  {/* Primary Button */}
  <a
    href="/plants"
    className="px-6 py-3 bg-[#556B2F] text-[#F9F8F3] rounded-xl
    font-semibold hover:bg-[#F5D547] hover:text-[#556B2F] hover:scale-105
    transition-all duration-300 shadow-md"
  >
    Explore the Garden
  </a>

  {/* Secondary Button */}
  <Link
    to="/login"
    className="px-6 py-3 border-2 border-[#F5D547] text-[#556B2F]
     rounded-xl font-semibold
     hover:bg-[#F5D547] hover:text-[#556B2F] hover:scale-105
     transition-all duration-300 shadow-md"
  >
    Enter the Garden
  </Link>
</div>

        </div>

        {/* RIGHT 3D MODEL */}
        <div className="w-full h-full flex items-center justify-center">
          <PlantModel />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />

      {/* subtle background glow */}
      <div className="absolute top-36 right-24 w-64 h-64 bg-[#A3C4A6]/20 blur-3xl rounded-full -z-10" />

      {/* Animations */}
      <style>
        {`
          @keyframes wordFade {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-wordFade {
            animation: wordFade 0.6s ease-out forwards;
            opacity: 0;
          }

          .delay-0 { animation-delay: 0ms; }
          .delay-150 { animation-delay: 150ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-500 { animation-delay: 500ms; }
          .delay-650 { animation-delay: 650ms; }
          .delay-800 { animation-delay: 800ms; }
        `}
      </style>
    </div>
  );
};

export default Landing;
