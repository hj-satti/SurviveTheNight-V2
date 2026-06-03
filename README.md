# 🦊 Survive the Night

A 2D fox platformer game where you guide a fox through four dangerous zones to survive the night. Built as a **Parallel and Distributed Computing Lab** project.

**Team Members:** Hifsa Jabeen Satti, Ayesha Khan, Aliza Ali

---

## About

Survive the Night is a side-scrolling platformer where a fox must travel through four unique zones — Enchanted Forest, Crystal Cave, Storm Peaks, and Shadow Realm — while avoiding hazards, defeating enemies, collecting power-ups, and ultimately facing the Shadow King boss. The game also includes a C++ multithreading simulation that demonstrates threading concepts from our lab course.

---

## Features

- **4 unique zones** with different visual themes, hazards, and enemies
- **Controlled movement** — press to move, release to stop
- **Duck mechanic** — dodge overhead obstacles by pressing down
- **Double jump** — jump again mid-air (yes it's floaty, that's intentional)
- **Attack system** — kill enemies with the attack key
- **Boss fight** — face the Shadow King at the end with a hot pink health bar
- **Power-ups** — Aliza's Shield (mint green protection), Hifsa's Speed Boost (very fast), berries, fireflies, and the rare potato
- **Sound effects** — generated with AudioContext oscillators, no audio files needed
- **Combo system** — chain enemy kills for colorful combo text
- **Secrets** — hidden items, a secret room, and initials carved in a tree

---

## How to Play

| Action | Keyboard | Mobile |
|--------|----------|--------|
| Move Left | ← or A | ← Button |
| Move Right | → or D | → Button |
| Jump / Double Jump | ↑ or W or Space | JUMP Button |
| Duck | ↓ or S | DUCK Button |
| Attack | X or J | ATK Button |

---

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, HTML5 Canvas, Tailwind CSS
- **Deployment:** Vercel
- **C++ Demo:** C++17 with std::thread, std::mutex, std::condition_variable, std::atomic

---

## Project Structure

```
SurviveTheNight/
├── web-game/                          # Next.js web application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   └── components/
│   │       └── game/
│   │           ├── SurviveTheNight.tsx  # Main game component
│   │           └── types.ts
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   ├── vercel.json
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── cpp_source/
│   └── main.cpp                        # C++ multithreading demo
├── docs/
│   └── ProjectReport.docx              # Lab project report
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Play Online

The game is deployed on Vercel. Check the link in the repo description.

### Run Locally

```bash
cd web-game
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### C++ Multithreading Demo

```bash
cd cpp_source
g++ -std=c++17 -pthread main.cpp -o survive_the_night
./survive_the_night
```

---

## C++ Threading Concepts

The `cpp_source/main.cpp` file demonstrates:

- **std::thread** — Multiple threads running enemies, collectibles, zone progression, fox actions, and game timer simultaneously
- **std::mutex** — Protecting shared game state from concurrent access
- **std::condition_variable** — Thread synchronization for game events
- **std::atomic** — Lock-free active thread counter
- **Deadlock demonstration** — Shows how circular wait causes deadlock and how `std::lock()` and consistent lock ordering prevent it

---

## Zones

| Zone | Theme | Hazards | Enemies | Overhead Obstacles |
|------|-------|---------|---------|-------------------|
| Enchanted Forest | Green, fireflies | Spikes (red, glowing) | Slime :P | Low branches |
| Crystal Cave | Pink & teal crystals | Crystal shards | Bat o.o | Stalactites |
| Storm Peaks | Dark clouds, rain | Lightning bolts | Golem >_< | Storm clouds |
| Shadow Realm | Purple darkness | Shadow blobs | Shadow X_X | Dark beams |

---

## Power-Ups

| Item | Effect | Description |
|------|--------|-------------|
| Berry | +10 points | Common red berry |
| Firefly | +25 points | Neon yellow glowing firefly |
| Potato | +100 points, +1 HP | Rare and mysterious potato |
| Aliza's Shield | Temporary shield | Mint green protection aura |
| Hifsa's Speed Boost | Temporary speed | Very fast movement |

---

## License

This project is for educational purposes as part of the Parallel and Distributed Computing Lab course.
