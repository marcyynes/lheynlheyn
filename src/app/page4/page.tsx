"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export default function Page4() {
  const router = useRouter();
  const [bgm, setBgm] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎵 Initialize music
  useEffect(() => {
    const track = new Howl({
      src: ["/assets/audios/bgmusic/gol.mp3"],
      loop: true,
      volume: 0.7,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });
    setBgm(track);
    (window as any).__page4_bgm = track;

    return () => track.unload();
  }, []);

  const toggleMusic = useCallback(() => {
    if (!bgm) return;
    if (bgm.playing()) bgm.pause();
    else bgm.play();
  }, [bgm]);

  const handleClose = () => {
    if (bgm) bgm.stop();
    router.push("/page5");
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/loveletterbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🌫️ Soft vignette overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

      {/* 🔊 Speaker button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className={`bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full transition-all ${
            isPlaying ? "animate-pulse shadow-[0_0_10px_#fcd34d]" : ""
          }`}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </Button>
      </div>

      {/* 💌 Letter container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-10 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md 
          rounded-3xl p-10 max-w-3xl mx-6 text-center shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
      >
        <h1 className="text-5xl font-[Dancing_Script] mb-6 text-pink-200 drop-shadow-[0_0_10px_rgba(255,180,200,0.7)]">
          My Dearest,
        </h1>

        <p className="text-[1.25rem] text-white/90 leading-relaxed font-[Dancing_Script] tracking-wide">
          Hi bebi, syempre kahit ako may pa message sayo. Nways, thank you for being the woman you are. 
          The woman who always supports, cares, and loves for me. Someone who will do what she can and 
          will prioritize me when I am in need. You're amazing, my love. I can never thank you enough for 
          how much you’ve influenced me for the better. The past few months together have been amazing; 
          through ups and downs, we came back stronger. Little did I know you’re the longest relationship 
          I have. I just realized it now in October hehe. Also, I lied from our last deep talk. I don’t want 
          it to end. I don’t want us to separate from a fight — it may sound like an easy suggestion from me 
          from that moment but it’s not. It’s the most realistic, but if I’m speaking from heart and not logic… 
          I don’t want to lose you.
          <br />
          <br />
          Cheers to the months we've spent, cheers to the next to come. Until then, I’m proud to say as your 
          future-Bf that — I love you, and I will always support and be by your side.
        </p>

        <p className="mt-8 text-3xl font-[Dancing_Script] text-pink-300 drop-shadow-[0_0_8px_rgba(255,160,200,0.6)]">
          — xoxo, rence 💖
        </p>

        <Button
          onClick={handleClose}
          className="mt-10 bg-gradient-to-r from-pink-400/30 to-purple-400/30 hover:from-pink-400/50 hover:to-purple-400/50 
            text-white rounded-full px-10 py-3 text-lg font-[Dancing_Script] transition-all"
        >
          Close
        </Button>
      </motion.div>
    </main>
  );
}
