import React from "react";
import { FaLeaf, FaSearch, FaVideo, FaBookmark, FaMapMarkedAlt, FaRegLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLeaf className="w-8 h-8 text-[#3a7d44]" />,
    title: "Interactive 3D Plants",
    description: "Rotate, zoom, and explore realistic 3D models of medicinal plants."
  },
  {
    icon: <FaSearch className="w-8 h-8 text-[#2e7d32]" />,
    title: "Advanced Search & Filters",
    description: "Find plants by medicinal uses, region, or type easily."
  },
  {
    icon: <FaVideo className="w-8 h-8 text-[#1b5e20]" />,
    title: "Multimedia Integration",
    description: "High-quality images, videos, and audio descriptions for each plant."
  },
  {
    icon: <FaMapMarkedAlt className="w-8 h-8 text-[#2e7d32]" />,
    title: "Guided Virtual Tours",
    description: "Explore themed tours like immunity, digestion, or skincare plants."
  },
  {
    icon: <FaBookmark className="w-8 h-8 text-[#3a7d44]" />,
    title: "User Interaction",
    description: "Bookmark favorites, take notes, and share plant info on social media."
  },
  {
    icon: <FaRegLightbulb className="w-8 h-8 text-[#2e7d32]" />,
    title: "Plant Care Tips",
    description: "Learn practical tips to grow and maintain your medicinal plants."
  }
];

const FeaturesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Heading with cream-gradient and animation */}
      <motion.h2
        className="text-3xl md:text-5xl font-playfair font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#fcefcf] via-[#fff3e0] to-[#fef1d1] drop-shadow-xl"
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
              scale: 1.07,
              y: -6,
              boxShadow: "0px 30px 60px rgba(0,0,0,0.25), 0px 15px 30px rgba(250, 215, 160, 0.35)"
            }}
            className="bg-[#fff8e7] backdrop-blur-sm rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2 }}
              className="p-4 bg-[#f4e7c5]/70 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#3a7d44]">{feature.title}</h3>
            <p className="text-[#4f6f50] text-sm md:text-base leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;