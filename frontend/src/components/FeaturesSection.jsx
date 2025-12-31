import React from "react";
import { FaLeaf, FaSearch, FaVideo, FaBookmark, FaMapMarkedAlt, FaRegLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLeaf className="w-8 h-8 text-[#556B2F]" />,
    title: "Interactive 3D Plants",
    description: "Rotate, zoom, and explore realistic 3D models of medicinal plants."
  },
  {
    icon: <FaSearch className="w-8 h-8 text-[#A3C4A6]" />,
    title: "Advanced Search & Filters",
    description: "Find plants by medicinal uses, region, or type easily."
  },
  {
    icon: <FaVideo className="w-8 h-8 text-[#8B6D5C]" />,
    title: "Multimedia Integration",
    description: "High-quality images, videos, and audio descriptions for each plant."
  },
  {
    icon: <FaMapMarkedAlt className="w-8 h-8 text-[#A3C4A6]" />,
    title: "Guided Virtual Tours",
    description: "Explore themed tours like immunity, digestion, or skincare plants."
  },
  {
    icon: <FaBookmark className="w-8 h-8 text-[#556B2F]" />,
    title: "User Interaction",
    description: "Bookmark favorites, take notes, and share plant info on social media."
  },
  {
    icon: <FaRegLightbulb className="w-8 h-8 text-[#A3C4A6]" />,
    title: "Plant Care Tips",
    description: "Learn practical tips to grow and maintain your medicinal plants."
  }
];

const FeaturesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-[#F9F8F3]">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-5xl font-playfair font-extrabold text-center mb-16 text-[#556B2F]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover the Power of Medicinal Plants
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 130 }}
            whileHover={{
              scale: 1.06,
              y: -4,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.15), 0px 10px 20px rgba(245,213,71,0.25)"
            }}
            className="bg-[#F9F8F3] rounded-2xl p-6 flex flex-col items-start gap-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#8B6D5C]/20"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.15 }}
              className="p-4 bg-[#A3C4A6]/40 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#556B2F]">{feature.title}</h3>
            <p className="text-[#8B6D5C] text-sm md:text-base leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
