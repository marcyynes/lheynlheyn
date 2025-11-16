"use client";

import { motion } from "framer-motion";

export default function Page5() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
      style={{
        backgroundImage: "url('/assets/images/thankyoubg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 💖 Fade-in Credit Text */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5 }}
  className="p-8 max-w-2xl mx-6 text-center shadow-lg"
  style={{
    position: "absolute",
    top: "66%", // move down or up
    left: "28%",
    transform: "translate(-50%, -50%)",
  }}
>

        <h1 className="text-5xl font-[Dancing_Script] mb-4 text-white-200">
          That’s All 
        </h1>

        <p className="text-xl text-white/90 leading-relaxed font-[Dancing_Script]">
          Shoutout to your friends who took the time in contributing on the friends section.
        </p>

      </motion.div>
    </main>
  );
}
