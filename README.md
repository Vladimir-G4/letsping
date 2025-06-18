# Ping

A voice-first PWA for human connection — built with Next.js 14, HeroUI, Tailwind, and Supabase.  
This repo contains the frontend for waitlist collection, onboarding via voice call, and agentic AI concierge (Wing) orchestration.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **UI:** HeroUI v2, Tailwind CSS, Framer Motion
- **Backend:** Supabase (DB, Auth, Edge Functions)
- **PWA:** `next-pwa`, manifest.json, service worker
- **Other:** ESLint, Prettier, Husky, Tailwind Variants

## Features

- Voice-first user onboarding
- Waitlist with real-time position tracking
- Device-aware install nudges for mobile PWA
- Wing (AI scheduling assistant)
- Minimalist, responsive UI with theme consistency
- One-click deploy to Vercel

## Getting Started

```bash
npx create-next-app -e https://github.com/letsping/ping
cd ping
cp .env.example .env.local
# Add Supabase env keys
npm install
npm run dev
