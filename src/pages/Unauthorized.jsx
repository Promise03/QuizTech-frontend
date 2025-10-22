import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lock className="mx-auto w-24 h-24 text-blue-400" />
        </motion.div>

        <h1 className="text-5xl font-bold">Unauthorized Access</h1>
        <p className="text-gray-300 text-lg">
          Sorry, you don’t have the required permissions to access this page.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-2xl text-white font-semibold shadow-lg"
          >
            Return to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
