"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Howl } from "howler";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    // play gose intro
    const sound = new Howl({
      src: ["/assets/audios/bgmusic/gose.mp3"],
      volume: 0.8,
      html5: true,
    });
    sound.play();

    // trigger fade out animation
    setFadeOut(true);

    // navigate after short delay (to let fade play)
    setTimeout(() => {
      router.push("/page2");
    }, 1200); // 1.2s fade duration
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden text-white">
      <AnimatePresence>
        {!fadeOut && (
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-6xl sm:text-7xl font-[cursive] font-bold mb-10 select-none"
            >
              HEPHEP?!?!?!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Button
                onClick={handleClick}
                className="rounded-full px-10 py-5 text-2xl font-[cursive] bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                HOORAY
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Black overlay fade-out layer */}
      {fadeOut && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </main>
  );
}
