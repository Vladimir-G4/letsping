"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { CheckCircle, Sparkles, Loader2, Share2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
//  Supabase setup
// ─────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API!
);

// ─────────────────────────────────────────────────────────────
//  Components
// ─────────────────────────────────────────────────────────────

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

export default function WaitlistPage() {
  /** Form state */
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  /** UX state */
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState<number | null>(null);

  // ── If returning user, pull their spot ─────────────────────
  useEffect(() => {
    const storedPhone = localStorage.getItem("ping_user_phone");
    if (!storedPhone) return;
    supabase
      .from("waitlist")
      .select("place")
      .eq("phone", storedPhone)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPlace(data.place);
          setSubmitted(true);
        }
      });
  }, []);

  // ── helper: get next place safely ──────────────────────────
  const getNextPlace = async () => {
    const { data, error } = await supabase
      .from("waitlist")
      .select("place")
      .order("place", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data?.place ?? 0) + 1;
  };

  // ── form submit ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (!firstName.trim()) return setError("First name is required.");
    if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, "")))
      return setError("Enter a valid 10‑digit phone number.");

    setSubmitting(true);

    // reject duplicate numbers
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("phone", phone.replace(/\D/g, ""))
      .maybeSingle();
    if (existing) {
      setError("You're already on the list!");
      setSubmitting(false);
      return;
    }

    // get next safe spot
    let nextPlace = await getNextPlace();
    let { error } = await supabase.from("waitlist").insert({
      first_name: firstName,
      phone: phone.replace(/\D/g, ""),
      place: nextPlace,
    });

    if (error?.code === "23505") {
      nextPlace = await getNextPlace();
      ({ error } = await supabase.from("waitlist").insert({
        first_name: firstName,
        phone: phone.replace(/\D/g, ""),
        place: nextPlace,
      }));
    }

    if (error) {
      console.error(error);
      setError("Something went wrong. Try again.");
      setSubmitting(false);
      return;
    }

    setPlace(nextPlace);
    setSubmitted(true);
    localStorage.setItem("ping_user_phone", phone.replace(/\D/g, ""));
    setSubmitting(false);
  };

  // ── motion presets ─────────────────────────────────────────
  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // radial gradient bg helper
  const Bg = () => (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,_rgba(14,165,233,0.15),_transparent_70%)]" />
  );

  // progress ring when place is known
  const Ring = () => (
    <div className="mx-auto w-24 h-24 relative">
      <svg className="absolute inset-0" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
        <motion.circle
          cx="18" cy="18" r="16" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="100 100" strokeDashoffset={100 - (place ? Math.min(100, place) : 0)}
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - (place ? Math.min(100, place) : 0) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-sky-600">
        {place}
      </span>
    </div>
  );

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-6 text-neutral-900 bg-[#faf9f7] overflow-hidden">
      <Bg />

      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md mx-auto space-y-10"
      >
        {/* Heading */}
        <motion.h1
            layoutId="ping-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-center"
            >
            No bios. No swipes.<br className="hidden sm:block" />
            <span className="text-sky-600">Just someone who gets it.</span>
        </motion.h1>

        <motion.p className="text-neutral-700 text-lg leading-relaxed">
          Voice first. No profiles. No swipes. Sign up in seconds and let Wing do the heavy lifting.
        </motion.p>

        {/* Conditional Card / Form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-6 bg-white/80 backdrop-blur-lg border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xl max-w-md mx-auto"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                    <Ring />
                    <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-500 drop-shadow" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900">You’re on the list.</h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                    Built for thoughtful people like you — those who show up with presence, not just profiles.
                </p>

                <div className="w-full rounded-xl bg-neutral-50 border border-neutral-100 p-4 text-sm text-neutral-700 shadow-inner">
                    Wing will text you when your voice call opens up. No pressure. Just connection, when it feels right.
                </div>

                {place && (
                    <div className="text-sm text-sky-600 font-mono tracking-widest mt-2">
                    # {String(place).padStart(4, "0")}
                    </div>
                )}

                <button
                    onClick={InviteButton}
                    className="mt-3 px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow transition"
                >
                    ✨ Share the vibe
                </button>
                </div>

                <p className="text-[10px] text-neutral-400 text-center italic">
                You're not just early. You're essential.
                </p>
            </motion.div>
            )
            : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-5"
            >
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-xl text-base"
                required
              />
              <Input
                type="tel"
                placeholder="(555) 123‑4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl text-base"
                required
              />
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <Button
                type="submit"
                disabled={submitting}
                className="relative overflow-hidden bg-sky-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-sky-700 transition"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get invited
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-6 text-center space-y-2 text-sm">
          <p className="italic text-neutral-500">No bios. No games. Just you -- heard.</p>
          <p className="text-xs text-neutral-400">Your data stays private. No spam. No selling.</p>
        </div>
      </motion.div>
    </section>
  );
}
