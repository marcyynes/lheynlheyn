"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { Button } from "~/components/ui/button";
import { Volume2, VolumeX, Shuffle } from "lucide-react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

// 💬 Emoji-to-voice mapping (filenames must match voices/*.mp3)
const memberEmojis = [
  { emoji: "🍒", voice: "scoops" },
  { emoji: "🐰", voice: "jeonghan" },
  { emoji: "🦌", voice: "joshua" },
  { emoji: "🐱", voice: "jun" },
  { emoji: "🎮", voice: "wonwoo" },
  { emoji: "🐯", voice: "hoshi" },
  { emoji: "🍚", voice: "woozi" },
  { emoji: "🐸", voice: "the8" },
  { emoji: "🐶", voice: "mingyu" },
  { emoji: "⚔️", voice: "dokyeom" },
  { emoji: "🐢", voice: "vernon" },
  { emoji: "🍊", voice: "seungkwan" },
  { emoji: "🦦", voice: "dino" },
];

type EmojiPos = { top: number; left: number; rotate: number; size: number };

export default function Page2() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgm, setBgm] = useState<Howl | null>(null);
  const [voice, setVoice] = useState<Howl | null>(null);
  const [positions, setPositions] = useState<EmojiPos[]>([]);

  // ✨ Initialize particles (Blue + Yellow magical sparkle)
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 280, density: { enable: true, area: 1000 } },
        color: {
          value: ["#60a5fa", "#93c5fd", "#fde68a", "#facc15", "#ffffff"],
        },
        shape: { type: "circle" },
        opacity: {
          value: 0.8,
          animation: { enable: true, speed: 1, minimumValue: 0.3 },
        },
        size: {
          value: { min: 2, max: 5 },
          animation: { enable: true, speed: 2, minimumValue: 1 },
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        twinkle: {
          particles: {
            enable: true,
            color: "#ffffff",
            frequency: 0.3,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // 🌀 Generate random emoji positions
  const generatePositions = useCallback((): EmojiPos[] => {
    const arr: EmojiPos[] = [];
    const forbidden = [
      { x: 30, y: 30, w: 40, h: 30 },
      { x: 78, y: 0, w: 22, h: 16 },
    ];

    const tooClose = (a: EmojiPos, b: EmojiPos) => {
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      return Math.sqrt(dx * dx + dy * dy) < 10;
    };

    const overlapsForbidden = (p: EmojiPos) =>
      forbidden.some(
        (f) =>
          p.left >= f.x &&
          p.left <= f.x + f.w &&
          p.top >= f.y &&
          p.top <= f.y + f.h
      );

    for (let i = 0; i < memberEmojis.length; i++) {
      let placed: EmojiPos | null = null;
      let tries = 0;
      while (!placed && tries < 500) {
        const p: EmojiPos = {
          top: 10 + Math.random() * 75,
          left: 5 + Math.random() * 85,
          rotate: Math.random() * 40 - 20,
          size: 28 + Math.floor(Math.random() * 28),
        };
        if (!overlapsForbidden(p) && !arr.some((q) => tooClose(p, q))) placed = p;
        tries++;
      }
      arr.push(placed || { top: 10 + i * 3, left: 10 + i * 3, rotate: 0, size: 32 });
    }
    return arr;
  }, []);

  const reshuffle = () => setPositions(generatePositions());

  // 🧩 Initial emoji placement
  useEffect(() => {
    setPositions(generatePositions());
  }, [generatePositions]);

  // 🎵 Background music
  useEffect(() => {
    const existing = (window as any).__page_bgm as Howl | undefined;
    if (existing) {
      setBgm(existing);
      setIsPlaying(existing.playing());
      return;
    }
    const newBgm = new Howl({
      src: ["/assets/audios/bgmusic/oh_my.mp3"],
      loop: true,
      volume: 0.7,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
    });
    newBgm.play();
    (window as any).__page_bgm = newBgm;
    setBgm(newBgm);
  }, []);

  const toggleBgm = () => {
    if (!bgm) return;
    if (bgm.playing()) {
      bgm.pause();
      setIsPlaying(false);
    } else {
      bgm.play();
      setIsPlaying(true);
    }
  };

  // 🗣️ Play voice lines
  const playVoice = (name: string) => {
    if (!bgm) return;
    if (bgm.playing()) bgm.pause();
    if (voice) voice.stop();

    const v = new Howl({
      src: [`/assets/audios/voices/${name}.mp3`],
      volume: 1.0,
      onend: () => {
        if (bgm && !bgm.playing()) bgm.play();
      },
    });
    setVoice(v);
    v.play();
  };

  // 🎉 Click title to go to Page3
  const goNext = () => {
  if (bgm) bgm.stop(); // ⛔ stop the song before moving
  setShowConfetti(true);
  setTimeout(() => {
    setShowConfetti(false);
    router.push("/page3");
  }, 1200);
};

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/openingpagebg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✨ Sparkles covering lower 70% of the screen (brighter version) */}
<div className="absolute bottom-0 left-0 right-0 h-[70%] z-[2] pointer-events-none">
  <Particles
    id="sparkles"
    init={particlesInit}
    options={{
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        number: { value: 320, density: { enable: true, area: 1000 } },
        color: {
          value: ["#ffffff", "#fef3c7", "#fde68a", "#facc15", "#bae6fd"],
        },
        shape: { type: "circle" },
        opacity: {
          value: 1,
          animation: { enable: true, speed: 1, minimumValue: 0.6 },
        },
        size: {
          value: { min: 2, max: 6 },
          animation: { enable: true, speed: 1.5, minimumValue: 1 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "top",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        twinkle: {
          particles: {
            enable: true,
            color: "#fff",
            frequency: 0.45,
            opacity: 1,
          },
        },
        glow: {
          enable: true,
          color: "#ffffff",
          blur: 12,
          strength: 3.5,
        },
      },
      detectRetina: true,
    }}
  />
</div>

{/* Slightly brighter overlay for clarity and glow balance */}
<div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] z-[3]" />


{/* Soft dim overlay to blend sparkle glow nicely */}
<div className="absolute inset-0 bg-black/35 z-[3]" />


      {showConfetti && <Confetti recycle={false} numberOfPieces={500} gravity={0.9} />}

      {/* 🔊 Controls */}
      <div className="absolute top-6 right-6 z-[10] flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleBgm}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={reshuffle}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full"
        >
          <Shuffle size={18} />
        </Button>
      </div>

      {/* 🐸 Emojis scattered around */}
      {positions.map((pos, idx) => (
        <motion.span
          key={idx}
          onClick={() => playVoice(memberEmojis[idx].voice)}
          className="absolute cursor-pointer select-none z-[8]"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            fontSize: `${pos.size}px`,
            transform: `rotate(${pos.rotate}deg)`,
          }}
          whileHover={{ scale: 1.25 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          {memberEmojis[idx].emoji}
        </motion.span>
      ))}

      {/* 🎂 Center Title */}
      <motion.h1
  whileHover={{ scale: 1.05 }}
  onClick={goNext}
  className="relative z-[9] text-5xl sm:text-6xl font-extrabold tracking-wide drop-shadow-[0_3px_10px_rgba(255,255,255,0.6)] select-none cursor-pointer leading-[1.4] py-4"
>
  Happy 21st Birthday!
</motion.h1>


      {/* 🌈 Soft glow bottom */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-400/30 via-yellow-300/20 to-transparent animate-pulse" />
      </div>
    </main>
  );
}
