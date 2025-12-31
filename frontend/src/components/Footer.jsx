import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } };

  return (
    <footer className="bg-[#D9E6D3] text-[#556B2F] py-12 relative overflow-hidden">
      {/* Subtle glowing circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#A3C4A6]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#A3C4A6]/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
        {/* About / Logo */}
        <motion.div {...fadeUp} className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#556B2F] hover:text-[#3a5a2c] transition-colors duration-300 cursor-default">
            HerbVerse
          </h2>
          <p className="text-[#8B6D5C] text-sm md:text-base leading-relaxed animate-fadeIn">
            Explore and discover the power of medicinal plants with an immersive virtual experience.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div {...fadeUp} className="space-y-2">
          <h3 className="text-lg font-semibold text-[#556B2F] hover:text-[#3a5a2c] transition-colors duration-300 cursor-default">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 text-[#8B6D5C]">
            {["Home", "Plants", "About", "Contact"].map((link, i) => (
              <li key={i} className="cursor-pointer relative group">
                <span className="transition-colors duration-300 hover:text-[#3a5a2c]">{link}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#3a5a2c] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div {...fadeUp} className="space-y-4 text-center">
          <h3 className="text-lg font-semibold text-[#556B2F] hover:text-[#3a5a2c] transition-colors duration-300 cursor-default">
            Follow Us
          </h3>
          <div className="flex gap-4 text-[#8B6D5C] justify-center">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{
                  scale: 1.2,
                  color: "#3a5a2c",
                  textShadow: "0 0 8px #3a5a2c"
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="text-xl"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#A3C4A6]/40 mt-10"></div>

      {/* Copyright */}
      <motion.p
        className="text-center text-sm text-[#8B6D5C] mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} HerbVerse. All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;
