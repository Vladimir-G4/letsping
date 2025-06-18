"use client";

import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { ArrowRight, BarChart2, Users, Heart } from "lucide-react";

export default function InvestorPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="flex flex-col items-center pt-2 pb-32 px-6 space-y-24 text-neutral-900">

      {/* ── HERO ───────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-4xl text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          LetsPing <span className="text-violet-600">Investor One‑Pager</span>
        </h1>
        <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
          Voice‑first social infrastructure redefining connection for the <strong>loneliest generation</strong>. Our AI platform delivers <strong>10× higher‑quality conversations</strong> through a single, low‑friction call—built for <em>interns, transplants, founders, and modern nomads</em>.
        </p>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-center text-neutral-600 text-sm sm:text-base italic max-w-xl mx-auto"
        >
          We're building the voice-based social layer Gen Z actually trusts—human-first, AI-augmented, and designed for depth.
        </motion.div>
      </motion.div>

      {/* ── PROBLEM & SOLUTION ─────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="grid md:grid-cols-2 gap-8 w-full max-w-5xl"
      >
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Problem
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-700">
            <li><strong>Swipe fatigue:</strong> Dating and friend apps are transactional and exhausting.</li>
            <li><strong>Loneliness crisis:</strong> 39% of Gen Z feel chronically alone (CDC 2023).</li>
            <li><strong>No easy on‑ramps:</strong> New grads & relocators struggle to form real‑world bonds.</li>
          </ul>
        </div>
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" /> Our Solution
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-700">
            <li><strong>AI voice onboarding</strong> unlocks personality in 15 min—no bios, no swipes.</li>
            <li><strong>Wing concierge</strong> connects, schedules, and nudges—turning chats into IRL meets.</li>
            <li><strong>Max 5 convos</strong> keeps focus, reduces ghosting, builds intention.</li>
          </ul>
        </div>
      </motion.div>

      {/* ── MARKET ─────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="w-full max-w-4xl text-center space-y-6"
      >
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <BarChart2 className="w-6 h-6 text-emerald-600" /> Market Opportunity
        </h2>
        <p className="text-neutral-600 text-base sm:text-lg">
          LetsPing sits at the intersection of <strong>$11B social discovery</strong> and <strong>$18B digital wellness</strong>. Initial wedge: <em>4.5 M interns, remote workers, and urban newcomers</em> in major U.S. metros (SF & NYC beachhead).
        </p>
      </motion.div>

      {/* ── WHY NOW ────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeUp}
        className="w-full max-w-4xl text-center space-y-4"
      >
        <h2 className="text-2xl font-semibold">Why Now</h2>
        <p className="text-neutral-700 text-base">
          Gen Z is the <strong>loneliest generation on record</strong>, yet they’re the <strong>most fluent in voice tech</strong> (TikTok, AirPods, Discord). 
          With the rise of <strong>AI-driven agents</strong> and declining trust in swipe-based apps, the time is right to reshape how people meet.
        </p>
      </motion.div>

      {/* ── ROADMAP ────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={7}
        variants={fadeUp}
        className="w-full max-w-4xl text-center space-y-4"
      >
        <h2 className="text-2xl font-semibold">Roadmap Highlights</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-left text-neutral-700 text-sm list-disc list-inside">
          <li><strong>Q3 2025:</strong> Closed beta launch (invite-only) in SF & NYC</li>
          <li><strong>Q4 2025:</strong> Wing Pro, AI call scheduling, curated IRL events</li>
          <li><strong>Q1 2026:</strong> Android release + strategic B2B integrations</li>
          <li><strong>Q2 2026:</strong> National rollout and campus ambassador program</li>
        </ul>
      </motion.div>

      {/* ── TRACTION ───────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="grid sm:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {[
          { label: "Waitlist sign‑ups", value: "2,300+" },
          { label: "Avg. call completion", value: "92%" },
          { label: "Convo acceptance", value: "74%" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm text-center hover:shadow-md transition">
            <p className="text-3xl font-bold text-violet-600 leading-none tracking-tight">{value}</p>
            <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── BUSINESS MODEL ─────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeUp}
        className="w-full max-w-4xl text-center space-y-4"
      >
        <h2 className="text-2xl font-semibold">Monetization</h2>
        <p className="text-neutral-700 text-base">
          Freemium onboarding • Boosted calls • Wing Pro (unlimited concierge) • Curated city events • B2B AI APIs for community platforms.
        </p>
      </motion.div>

      {/* ── TEAM ───────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeUp}
        className="w-full max-w-5xl space-y-6"
        >
        <h2 className="text-2xl font-semibold text-center">Founding Team</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
            {[
                {
                name: "Vladimir Gutierrez",
                role: "Full‑stack Engineer / Product",
                blurb: (
                    <>
                    CS @ <strong>NJIT</strong><br />Space Systems Eng @ <strong>Planet Labs</strong><br />
                    Previously @ <strong>PwC, Disney, Prudential</strong>
                    </>
                ),
                },
                {
                name: "Shreelekha Revankar",
                role: "AI / ML Researcher",
                blurb: (
                    <>
                    BS/MS in CS @ <strong>UMD</strong> • PhD @ <strong>Cornell</strong><br />
                    Researcher @ <strong>Planet Labs</strong>
                    </>
                ),
                },
                {
                name: "Sarah Jeong",
                role: "Design & Social UX",
                blurb: (
                    <>
                    Philosophy & CS @ <strong>U. Rochester</strong><br />
                    Flight Software @ <strong>Planet Labs</strong>
                    </>
                ),
                },
            ].map(({ name, role, blurb }) => (
                <div
                key={name}
                className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition text-left"
                >
                <p className="font-semibold text-neutral-900 text-base">{name}</p>
                <p className="text-violet-600 text-xs font-medium mt-1 uppercase tracking-wide">{role}</p>
                <div className="mt-3 text-neutral-600 text-sm leading-relaxed">{blurb}</div>
                </div>
            ))}
            </div>

        </motion.div>


      {/* ── CTA ───────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeUp}
        className="w-full max-w-5xl text-center space-y-6 bg-gradient-to-r from-violet-50 to-violet-100 border border-violet-200 rounded-3xl p-10 shadow-md"
      >
        <h3 className="text-2xl font-semibold">We’re raising pre‑seed</h3>
        <p className="text-neutral-700 text-base">
          If redefining how humans meet excites you, let’s talk. We’re seeking strategic angels and funds who believe voice is the next frontier of social tech.
        </p>
        <Link
          href="mailto:founders@letsping.co?subject=Investing%20in%20LetsPing"
          className={buttonStyles({ color: "primary", radius: "full", size: "lg", variant: "shadow" })}
        >
          Contact the founders
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
