"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock, Heart, Users, XCircle, Volume2, VolumeX } from "lucide-react";
import { Great_Vibes, Allura } from "next/font/google";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const allura = Allura({ weight: "400", subsets: ["latin"] });

// ─── Throwback & Friends data ───────────────────────────────────────────────
const throwbackSlides = [
  { img: "/assets/images/throwback1.jpg", caption: "Yey three na siya" },
  { img: "/assets/images/throwback2.jpg", caption: "Wowowow grumaduate na kaso gutom na rin" },
  { img: "/assets/images/throwback3.jpg", caption: "hala sunog siya !!" },
  { img: "/assets/images/throwback4.jpg", caption: "kyot" },
  { img: "/assets/images/throwback5.jpg", caption: "itadakimasu !!" },
  { img: "/assets/images/throwback6.jpg", caption: "suspect suspect, nangunguha ng aso" },
  { img: "/assets/images/throwback7.jpg", caption: "bait ah" },
  { img: "/assets/images/throwback8.jpg", caption: "OMG SO PRETTYYYY" },
  { img: "/assets/images/throwback9.jpg", caption: "*wink*" },
  { img: "/assets/images/throwback10.jpg", caption: "Chili" },
  { img: "/assets/images/throwback11.jpg", caption: "RAWRRRRR" },
];

const friendsSlides = [
  { img: "/assets/images/friends/caye.jpg", name: "Caye", message:
      `happiest 21st birthday, my mazzterrr! Wishing you all the happiness and joy on ur special day (deserve mo yan! AHAHAH) hoping to see you again soon, contactsss! Halabyuuu!😘`,
 },
  { img: "/assets/images/friends/hazel.jpg", name: "Hazel", message: `To my lheyn, 
Eto siguro isa sa fav kong pic naten + yung sa debut mo at ko because it sums up our friendship nways!!! Happy Birthday bebe ko! I just wanna say na i appreciate our friendship and I appreciate you so much. I hope you enjoy your day today and i hope na makapag bonding na tayo soon. I miss our little chikas, our little svt bonding moments, our corridor pasahan ng sagot lalo pag exam. I just miss having you in the same school na kaya ko kulitin, kaya ko inisin, kaya ko ayain any time i want.  
Nways to my forever lover (sorry rence ako nauna sayo, and ako ang bebe nya forever) happy happy birthday im so grateful na i got to celebrate it with you since grade 7.
 
  I love you forever and always alaine ko always remember that. My always, in all ways.
`},
    // { img: "/assets/images/friends/hazel2.jpg", name: "Hazel", message: ``},
  { img: "/assets/images/friends/carylle.jpg", name: "Carylle", message: `happy birthday, my alaine! thank you for making my college life bearable and for being my best friend. I’m always here for you no matter what happen, you can always rant to me! Hope you enjoy your day, I love you! 😽🩵` },
  { img: "/assets/images/friends/ynah.jpg", name: "Ynah", message:
      "Apiiii Birthday, Alainee. Mabuhay ka hangga't gusto mo🥳 Thank you sa pagtuturo kapag may activities tayo. Godbless you😇🤙",
  },
  { img: "/assets/images/friends/group.jpg", name: "luci gang", message: "HAPPY BIRTHDAY LUBIN !!" },
  { img: "/assets/images/friends/mj.jpg", name: "MJ", message: `Alaine,

Happy 21st! Despite the very busy schedule, I hope you still get to enjoy your special day! I am forever grateful to have been blessed with a friend like you. Your constant love and support keeps me going and I hope that you receive just as much (if not more) than what you already give, not just today, but everyday.

Have the happiest of birthdays, Lubin. Wishing you nothing but the joyous of days. Rooting for you lagi.

I love you so muchie!

Love,
Marylei` },
  {
    img: "/assets/images/friends/micah.jpg",
    name: "Micah",
    message:
      "Happiest Birthday, bebu! I am forever grateful that God let us meet in this lifetime. You are my soulmate and I promise to find you in every possible universe there is. Enjoy your day, Doctora! I’m proud of you and I love you, lagi’t lagi!",
  },
  { img: "/assets/images/friends/kaye.jpg", name: "Ate Kaye", message: `Pagbati, Lubin! Maligayang kaarawan sa iyong munting eksistensiya! 

Nais ko lamang ipadala sa sulat na ito na kahit kanya-kanya na ang ating buhay, ang pagmamahal ko sa'yo ay hindi masusukat ng kahit ano—ito ay walang hanggan. I hope you live your everyday life peacefully and happily!

Happy 21st, mahal! Isa kang munting ilaw na nagbibigay ng liwanag sa buhay ng iba. 

Pagpupugay!` },
  { img: "/assets/images/friends/paolo.jpg", name: "Paolo", message: `HI ALAINE HAPPY 21st BIRTHDAY BOOGSH !! 🥳
I just want to wish a happy happy bidet and enjoy ur day, sorry sa pictures at di naman tayo nagkikita at allergic ako sa selfies 😔, alam ko talaga may pics tayo nung debut mo (?) or busy ako sa ex ko idk HAHAHABABABAB,basta next time may pics na must na un. ANW, tanda mo na, officially gurang ka na like me, eme, pero i know that you’ve truly grown and little by little becoming a full fledged adult na really mature and independent. Thank you for being a friend, companion, and someone I can look back and know na available anytime. I’m happy I am one of those people na kasama mo throughout the years and to many more years after, di na pwede mabawasan 😠, need na talaga natin magkita real na real. 
Hindi na me patumpiktumpik pa, i wanna make it short, sa personal nalang ang the rest, I wish you a happy birthday aleynn, may gbu and enjoy ur day today. PENGE KAMI SHANGHAI KIMI, LOVE LOTS !!😝🥳` },
  { img: "/assets/images/friends/joey.jpg", name: "Jowee", message: `Happy Birthday, Alaine! 💛

I just want to say how thankful I am for you. You’re genuine, warm, and always make people feel cared for. Thank you for the laughter, the support, and all the memories we’ve shared. Alam kong life isn’t always easy, but I hope you never forget how strong and deserving you are of all the good things coming your way. I’m always rooting for you. You’re loved, appreciated, and never alone. Enjoy your day, you deserve all the happiness in the world. 🤍` },
];

// ─── Button data ─────────────────────────────────────────────────────────────
const buttons = [
  {
    label: "Memories",
    icon: <Clock size={48} />,
    color: "from-pink-400/30 to-purple-400/30",
    desc: "A quick look in the past",
    action: "throwback",
  },
  {
    label: "Message",
    icon: <Heart size={48} />,
    color: "from-red-400/30 to-pink-400/30",
    desc: "Something to remember me by",
    action: "message",
  },
  {
    label: "Friends",
    icon: <Users size={48} />,
    color: "from-sky-400/30 to-indigo-400/30",
    desc: "A message from your dear close friends",
    action: "friends",
  },
  {
    label: "Close",
    icon: <XCircle size={48} />,
    color: "from-gray-300/30 to-gray-500/30",
    desc: "That’s all !!",
    action: "close",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Page3() {
  const router = useRouter();

  const [showThrowback, setShowThrowback] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [slide, setSlide] = useState(0);
  const [bgm, setBgm] = useState<Howl | null>(null);
  const [voice, setVoice] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // BGM setup
  useEffect(() => {
    const existing = (window as any).__page3_bgm as Howl | undefined;
    if (existing) {
      setBgm(existing);
      setIsPlaying(existing.playing());
      return;
    }
    const newBgm = new Howl({
      src: ["/assets/audios/bgmusic/campfire.mp3"],
      loop: true,
      volume: 0.7,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });
    (window as any).__page3_bgm = newBgm;
    setBgm(newBgm);
  }, []);

  const toggleBgm = () => {
    if (!bgm) return;
    bgm.playing() ? bgm.pause() : bgm.play();
  };

  // Modal music controls
  const playModalMusic = useCallback(
    (file: string) => {
      if (voice) {
        voice.stop();
        setVoice(null);
      }
      if (bgm?.playing()) bgm.pause();

      const modalTrack = new Howl({
        src: [`/assets/audios/bgmusic/${file}`],
        loop: true,
        volume: 1.0,
      });
      modalTrack.play();
      setVoice(modalTrack);
    },
    [bgm, voice]
  );

  const closeModalMusic = useCallback(() => {
    if (voice) voice.stop();
    if (bgm && !bgm.playing()) bgm.play();
  }, [bgm, voice]);

  const nextSlide = (setFunc: any, slides: any[]) => setFunc((s: number) => (s + 1) % slides.length);
  const prevSlide = (setFunc: any, slides: any[]) =>
    setFunc((s: number) => (s - 1 + slides.length) % slides.length)// 🎹 Keyboard navigation for modals (Arrow + Esc)
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    // --- Memories modal ---
    if (showThrowback) {
      if (e.key === "ArrowRight") nextSlide(setSlide, throwbackSlides);
      if (e.key === "ArrowLeft") prevSlide(setSlide, throwbackSlides);
      if (e.key === "Escape") {
        setShowThrowback(false);
        closeModalMusic();
      }
    }

    // --- Friends modal ---
    if (showFriends) {
      if (e.key === "ArrowRight") nextSlide(setSlide, friendsSlides);
      if (e.key === "ArrowLeft") prevSlide(setSlide, friendsSlides);
      if (e.key === "Escape") {
        setShowFriends(false);
        closeModalMusic();
      }
    }

    // --- Message modal ---
    if (showMessage && e.key === "Escape") {
      setShowMessage(false);
      closeModalMusic();
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [showThrowback, showFriends, showMessage]);


  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/upperhalfbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />

      {/* Speaker */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={toggleBgm}
          variant="outline"
          size="icon"
          className={`bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full transition-all ${
            isPlaying ? "animate-pulse shadow-[0_0_10px_#fcd34d]" : ""
          }`}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </Button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[8%] text-center z-10"
      >
        <h1 className={`text-9xl mb-2 ${greatVibes.className}`}>Two Decades and One</h1>
        <p className={`text-5xl text-white/90 ${allura.className}`}>All About Her ✨</p>
      </motion.div>

      {/* Buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-20 mt-96 mb-0">
        {buttons.map((btn, i) => (
          <motion.div
            key={btn.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.08, y: -8 }}
            onClick={() => {
              if (btn.action === "throwback") {
                setShowThrowback(true);
                setSlide(0);
                playModalMusic("cheerstoyouth.mp3");
              } else if (btn.action === "message") {
                setShowMessage(true);
                playModalMusic("kidult.mp3");
              } else if (btn.action === "friends") {
                setShowFriends(true);
                setSlide(0);
                playModalMusic("circles.mp3");
              } else if (btn.action === "close") {
                bgm?.stop();
                voice?.stop();
                router.push("/page5");
              }
            }}
            className={`relative w-56 h-64 bg-gradient-to-br ${btn.color} border border-white/30 rounded-2xl 
              backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
              transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer`}
          >
            <div className="text-white/90 mb-3">{btn.icon}</div>
            <h2 className={`text-3xl mb-2 ${greatVibes.className}`}>{btn.label}</h2>
            <p className={`text-lg text-white/80 px-3 ${allura.className}`}>{btn.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ─── Modals ───────────────────────────────────────────── */}

      {/* Memories Modal */}
      <AnimatePresence>
        {showThrowback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-30 text-center p-6"
          >
            <div className="relative w-full max-w-md">
              <Image
                src={throwbackSlides[slide]?.img ?? ""}
                alt={throwbackSlides[slide]?.caption ?? "Throwback image"}

                width={520}
                height={520}
                className="rounded-2xl shadow-lg mx-auto object-cover"
              />
              <p className="mt-4 text-lg text-white font-[Dancing_Script]">
                {throwbackSlides[slide]?.caption}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={() => prevSlide(setSlide, throwbackSlides)}>Previous</Button>
                <Button onClick={() => { setShowThrowback(false); closeModalMusic(); }}>Close</Button>
                <Button onClick={() => nextSlide(setSlide, throwbackSlides)}>Next</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-30 text-center p-6"
          >
            <div className="max-w-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg">
              <Image
                src="/assets/images/messagepic.jpg"
                alt="Message"
                width={480}
                height={300}
                className="rounded-2xl mx-auto mb-5 object-cover"
              />
              <h2 className="text-3xl font-[Dancing_Script] mb-4">From: Rence</h2>
              <p className="text-white/90 leading-relaxed text-lg font-[Dancing_Script]">
                Happy Birthday lheyn!!!
              </p>
              <Button onClick={() => { setShowMessage(false); closeModalMusic(); }} className="mt-6">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Friends Modal */}
      <AnimatePresence>
        {showFriends && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-30 p-6"
          >
            <div className="relative w-full max-w-3xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
              <Image
                src={friendsSlides[slide]?.img ?? ""}
                alt={friendsSlides[slide]?.name ?? "Friend"}

                width={300}
                height={300}
                className="rounded-2xl object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="text-3xl text-white font-[Dancing_Script] mb-3">
                  From: {friendsSlides[slide]?.name}
                </h3>
                <pre className="whitespace-pre-wrap text-white/90 text-lg leading-relaxed font-[Dancing_Script]">
                  {friendsSlides[slide]?.message}
                </pre>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-5">
              <Button onClick={() => prevSlide(setSlide, friendsSlides)}>Previous</Button>
              <Button onClick={() => { setShowFriends(false); closeModalMusic(); }}>Close</Button>
              <Button onClick={() => nextSlide(setSlide, friendsSlides)}>Next</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
