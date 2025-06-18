"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { ArrowRight, CheckCircle, PhoneCall } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API!
);

export default function Home() {
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);

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
    if (isMobile && !isInStandaloneMode) setShowPwaPrompt(true);
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
    <section className="flex flex-col items-center pt-24 pb-32 px-6 space-y-24 text-neutral-900">
      {/* PWA Prompt */}
      {showPwaPrompt && (
        <div className="fixed bottom-4 inset-x-4 bg-white border border-neutral-200 p-4 rounded-xl shadow-xl z-50 text-sm text-neutral-800 flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="mb-2 sm:mb-0">
            🚀 Add Ping to your Home Screen for the best experience.
          </p>
          <p className="text-xs text-neutral-500">
            Tap <span className="inline-block px-2 py-1 bg-neutral-100 rounded-md mx-1">Share</span>
            then <span className="inline-block px-2 py-1 bg-neutral-100 rounded-md mx-1">Add to Home Screen</span>
          </p>
        </div>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center space-y-8"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Start with your voice.<br />
          <span className="text-violet-600">Let Wing take it from there.</span>
        </h1>

        <p className="text-neutral-600 text-lg sm:text-xl">
          Ping is a voice-first connection app designed for people in transition — <strong>interns in new cities</strong>, couples seeking community, and anyone tired of shallow swiping. You speak. Wing, your AI concierge, listens and helps you find people worth meeting.
        </p>

        {alreadyJoined ? (
          <div className="bg-white text-violet-800 px-6 py-4 rounded-xl inline-block border border-violet-200 shadow">
            <p className="text-sm font-medium">You're already on the waitlist!</p>
            {position && (
              <p className="text-xs text-neutral-500 mt-1">
                Your position: <span className="font-semibold">#{position}</span>
              </p>
            )}
          </div>
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

        <p className="text-xs text-neutral-500">
          <PhoneCall className="inline-block w-4 h-4 mr-1" />
          It’s free, private, and takes less than 30 seconds.
        </p>
      </motion.div>


      {/* How it works */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {[{
          icon: <PhoneCall className="w-6 h-6 text-violet-600" />, title: "1. You speak, not swipe", copy: "Users answer a 15-minute AI voice call. No scripts, no screens, just your natural self.",
        }, {
          icon: <CheckCircle className="w-6 h-6 text-violet-600" />, title: "2. We listen and understand", copy: "Our AI gently learns from your story and context to suggest meaningful introductions, not matches."
        }, {
          icon: <ArrowRight className="w-6 h-6 text-violet-600" />, title: "3. You meet one of five", copy: "You’ll have space for up to five ongoing conversations — all thoughtful, all intentional."
        }].map(({ icon, title, copy }, i) => (
          <motion.div
            key={title}
            custom={i + 1}
            variants={fadeUp}
            className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">{icon}<h3 className="font-semibold text-neutral-900 text-lg">{title}</h3></div>
            <p className="text-sm text-neutral-600 leading-relaxed">{copy}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Why Ping */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-neutral-900">Who Ping is built for</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-left mt-4">
          {["Interns spending a summer in a new city","Couples looking for likeminded friends","New grads moving away from home","Creators, founders & builders seeking connection offline","High-agency people tired of ghosting, swiping, and small talk","Anyone who values presence over profile pics"].map((point) => (
            <li key={point} className="flex items-center gap-2 bg-white border border-neutral-200 p-3 rounded-xl shadow-sm">
              <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span className="text-neutral-700 text-sm leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div className="text-center max-w-3xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          This isn’t a dating app. It’s a connection protocol.
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base">
          Ping helps people connect through their voice — because who you are comes through in how you speak, not how you swipe. <br />
          Our voice-first, agentic AI system surfaces better-fit conversations by giving every user a moment to just be heard.
        </p>
        <p className="text-neutral-400 text-xs">
          Built for human-first connection. Backed by scalable AI. Designed for real life.
        </p>
      </motion.div>
    </section>
  );
}