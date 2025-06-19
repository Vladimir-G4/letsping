"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { ArrowRight, CheckCircle, PhoneCall, Share2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import clsx from "clsx";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API!
);

export function InviteButton() {
  const [copied, setCopied] = useState(false);
  const sharePayload = {
    title: "Ping — voice-first connections",
    text: "I just joined the waitlist for Ping. Save your spot 👇",
    url: "https://letsping.co",
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
      } else {
        await navigator.clipboard.writeText(sharePayload.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error("Sharing failed", e);
    }
  };

  return (
    <motion.button
      onClick={share}
      whileTap={{ scale: 0.96 }}
      className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 text-sky-700 font-semibold shadow-sm hover:bg-sky-50 hover:border-sky-300 transition duration-200"
    >
      <Share2 className="w-4 h-4" />
      {copied ? "Link copied" : "✨ Invite a friend"}
      <AnimatePresence>
        {copied && (
          <motion.span
            key="copied-toast"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -top-6 text-xs text-emerald-600 font-medium"
          >
            Copied to clipboard!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Home() {
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [earlyCount, setEarlyCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
  
      if (!error && count !== null) {
        setEarlyCount(count);
      }
    };
  
    fetchCount();
  }, []);

  useEffect(() => {
    const storedPhone = localStorage.getItem("ping_user_phone");
    if (storedPhone) {
      supabase
        .from("waitlist")
        .select("place")
        .eq("phone", storedPhone)
        .order("id", { ascending: true })
        .then(({ data }) => {
          if (data?.length) {
            setAlreadyJoined(true);
            setPosition(data[0].place);
          }
        });
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as any).standalone);

    if (isMobile && !isInStandaloneMode) {
      setTimeout(() => setShowPwaPrompt(true), 2000);
    }

    setPulse(true);
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "pointer-events-none fixed inset-0 overflow-hidden z-[999]";
    document.body.appendChild(confettiContainer);
    [...Array(12)].forEach(() => {
      const piece = document.createElement("span");
      piece.style.cssText =
        "position:absolute;width:8px;height:8px;background:#0ea5e9;border-radius:1px;left:" +
        Math.random() * 100 +
        "vw;animation:confetti 1.4s ease-out forwards";
      confettiContainer.appendChild(piece);
    });
    setTimeout(() => confettiContainer.remove(), 1500);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="flex flex-col items-center pt-12 pb-32 px-6 space-y-16 text-neutral-900">
      {/* 🌟 Animated PWA Prompt */}
      {showPwaPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 inset-x-4 z-50 bg-white border border-neutral-200 shadow-2xl rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6"
        >
          <Image
            src="/share-add-home.png"
            alt="Install Ping"
            width={120}
            height={120}
            className="rounded-lg border border-neutral-100 shadow-sm"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-base sm:text-lg text-neutral-900 mb-2">
              🚀 Unlock the full Ping experience
            </p>
            <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
              Get <strong>real-time pings</strong>, <strong>faster access</strong>, and native feel. 
              <br className="hidden sm:inline" />
              <br />
              Just tap <span className="inline-block bg-neutral-100 px-1.5 py-0.5 rounded-md">Share</span> → <span className="inline-block bg-neutral-100 px-1.5 py-0.5 rounded-md">Add to Home Screen</span> <br /> you're 5 seconds away from better vibes.
            </p>
          </div>
        </motion.div>
      )}


      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center space-y-8"
      >
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-neutral-900">
            Speak your story.
          </h1>
          <p className="mt-4 text-sky-600 text-2xl sm:text-3xl font-semibold">
            Wing hears you.
          </p>
          <p className="mt-3 text-sky-600 text-lg sm:text-xl font-medium">
            And introduces voices that actually get it.
          </p>
        </div>


        <p className="text-neutral-700 text-lg sm:text-xl">
          Ping is your voice-first gateway to deeper, real-world connection. Whether you're <strong>new in town</strong>, expanding your circle, or simply craving more intentional conversations, Wing helps turn your words into meaningful connections.
        </p>

        {alreadyJoined ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative mx-auto max-w-md w-full"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-200/50 to-white/0 pointer-events-none" />
            <div className="relative bg-white/80 backdrop-blur-[6px] border border-neutral-200 rounded-3xl shadow-xl px-7 py-7 sm:px-9 sm:py-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className={clsx("inline-flex items-center justify-center rounded-full bg-sky-50 p-1.5", pulse && "animate-pingOnce")}> <CheckCircle className="w-6 h-6 text-sky-600" /></span>
                <h3 className="text-lg font-semibold text-neutral-900">You're officially in</h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Thanks for stepping up early. Wing will reach out as soon as slots open.
              </p>
              <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 shadow-inner">
                <span className="text-neutral-600 text-sm">
                  #0000{position ? position.toLocaleString() : "—"}
                </span>
                <InviteButton />
              </div>
              <p className="text-[10px] text-neutral-400 text-right">Early voices shape what comes next. We're grateful.</p>
            </div>
            <style jsx>{`
              @keyframes pingOnce {
                0% { transform: scale(1); opacity: 0.8 }
                60% { transform: scale(1.35); opacity: 0 }
                100% { transform: scale(1.35); opacity: 0 }
              }
              .animate-pingOnce {
                animation: pingOnce 1.2s cubic-bezier(0, 0, 0.2, 1);
              }
            `}</style>
          </motion.div>
        ) : (
          <Link
            href="/waitlist"
            className={buttonStyles({
              color: "primary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })}
          >
            Join the waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}

        <p className="text-xs text-neutral-400">
          <PhoneCall className="inline-block w-4 h-4 mr-1" />
          Takes less than 30 seconds. Wing handles the rest.
        </p>
      </motion.div>

      {/* How it works */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {[
          {
            icon: <PhoneCall className="w-6 h-6 text-sky-600" />,
            title: "1. You speak, not swipe",
            copy: "Answer a short, guided voice call. Your energy, tone, and truth come through — not a static profile.",
          },
          {
            icon: <CheckCircle className="w-6 h-6 text-sky-600" />,
            title: "2. Wing listens",
            copy: "Our AI concierge distills what matters and offers intros that align with how you show up in the world.",
          },
          {
            icon: <ArrowRight className="w-6 h-6 text-sky-600" />,
            title: "3. Thoughtful connections",
            copy: "You're introduced to a few good people. That's it. No stress, no pressure — just real talk.",
          },
        ].map(({ icon, title, copy }, i) => (
          <motion.div
            key={title}
            custom={i + 1}
            variants={fadeUp}
            className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              {icon}
              <h3 className="font-semibold text-neutral-900 text-lg">{title}</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{copy}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-neutral-900">
          A better way to meet, wherever you are in life
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-left mt-4">
        {[
          "Interns and transplants making new circles in new cities",
          "New grads figuring out friendships post-college",
          "Founders and creatives carving out time to connect, not network",
          "People looking for something deeper than DMs and endless scrolling",
          "Those who want to meet others through presence, not performance",
          "Anyone who values voice, story, and a little serendipity"
        ].map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 bg-white border border-neutral-200 p-4 rounded-xl shadow-sm"
          >
            <CheckCircle className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 text-sm leading-snug">{point}</span>
          </li>
        ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div className="text-center max-w-3xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          This isn't a dating app. It's a connection protocol.
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base">
          Ping helps people connect through their voice, because who you are comes through in how you speak, not how you swipe. <br />
          <br />
          Wing isn't here to judge, just to help the right people hear you.
        </p>
        <p className="text-neutral-400 text-xs">
          Thoughtfully engineered to help people meet, not perform.
        </p>
      </motion.div>
    </section>
  );
}