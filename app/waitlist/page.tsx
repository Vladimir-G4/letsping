"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { CheckCircle, Sparkles } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API!
);

export default function WaitlistPage() {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState<number | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("ping_user_phone");
    if (storedPhone) {
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
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) return setError("First name is required.");
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) return setError("Enter a valid 10-digit phone number.");

    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("phone", phone.replace(/\D/g, ""))
      .maybeSingle();

    if (existing) return setError("You’re already on the list!");

    const { data: countData } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true });

    const position = (countData as any)?.count || 0;

    const { error } = await supabase.from("waitlist").insert({
      first_name: firstName,
      phone: phone.replace(/\D/g, ""),
      place: position + 1,
    });

    if (error) {
      console.error(error);
      return setError("Something went wrong. Please try again.");
    }

    setPlace(position + 1);
    setSubmitted(true);
    localStorage.setItem("ping_user_phone", phone.replace(/\D/g, ""));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
    }),
  };


  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 py-24 bg-[#faf9f7] text-neutral-900">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-xl text-center space-y-10 bg-white rounded-3xl p-10 border border-neutral-200 shadow-[rgba(0,0,0,0.05)_0px_4px_20px]"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight font-sans"
        >
          Find your people <span className="text-violet-600">with no pressure</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-neutral-600 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed"
        >
          A human-first way to meet someone new. Voice, not profiles. Conversations, not swipes. For humans who value time, depth, and real connection.
        </motion.p>

        {submitted ? (
          <motion.div
            variants={fadeUp}
            className="bg-green-50 border border-green-200 rounded-xl px-6 py-10 space-y-4 shadow-md"
          >
            <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold text-green-700">
              You’re on the list 🌴
            </h2>
            <p className="text-sm text-neutral-600">
              Wing, our AI concierge, will be in touch soon. First calls start in SF this summer.
            </p>
            {place && (
              <p className="text-sm text-neutral-500">
                Your position in line: <strong>#{place}</strong>
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center"
          >
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full max-w-sm rounded-xl text-base"
              required
            />
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full max-w-sm rounded-xl text-base"
              required
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <Button
              type="submit"
              className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition shadow-md"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Get Invited
            </Button>
          </motion.form>
        )}

        <motion.div variants={fadeUp} className="pt-10 space-y-2 text-sm text-neutral-500">
          <p className="italic">No bios. No games. Just you—heard.</p>
          <p className="text-xs text-neutral-400">Your data stays private. No spam. No selling.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
