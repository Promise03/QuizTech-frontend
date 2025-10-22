import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden">
      {/* App name animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-5xl font-extrabold tracking-widest text-blue-500"
      >
        QuizTech
      </motion.h1>

      {/* Subtitle fade in */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-3 text-gray-300"
      >
        Empowering Minds Through Knowledge
      </motion.p>

      {/* Spinner animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="mt-10 w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingScreen;
