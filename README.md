# NYX OS // Harsh Jha Portfolio

An ultra-premium, interactive cyberpunk portfolio built using Next.js 16 (Turbopack), Tailwind CSS, Framer Motion, Three.js, and GSAP. 

Designed to mimic a futuristic hacker workstation and artificial intelligence terminal, it delivers an immersive AAA boot-up experience while remaining fully accessible and performant for recruiters.

---

## 🌌 Core Features

### 1. AAA Cinematic Boot Sequence
- **Startup sequence**: Custom GSAP timeline that triggers a realistic system initialization with staggered terminal-style boot logs.
- **Audio synthesis**: Incorporates a self-contained Web Audio API synthesizer that generates retro-futuristic mechanical sound effects, clicks, and a digital riser tone synced directly to loading benchmarks.
- **Dissolve transition**: Smooth camera-zoom and blur-dissolve exit transition into the main interface.

### 2. Interactive Retro Terminal
- Fully functional command-line dashboard that supports automated operator typing sequences on boot.
- Supports inputting custom commands:
  - `help` — Lists available operations.
  - `whoami` — Prints Personnel File for Harsh Jha.
  - `skills` — Displays technical stack breakdown.
  - `projects` — Shows highlight reel of shipped projects.
  - `clear` — Wipes terminal scrollback.

### 3. Recruiter Mode (HR Optimization Bypass)
- Features a global bypass toggle (**ENTER RECRUITER MODE**) that instantly disables heavy 3D elements, hides complex particle structures, overrides motion-damping, and swaps styling to a simplified, highly scannable UI designed for rapid vetting.
- Built-in `@media print` layout overrides on the `/resume` route so recruiters can print or save a clean, professional white-background CV in one click.

### 4. Atmospheric 3D Graphics & Parallax
- **Cyber Planet**: Slow-rotating central planet featuring procedural atmosphere glows, spinning solid energy rings, orbiting satellites, and interactive particle trails.
- **Global Nebula**: High-fidelity Three.js background scene containing floating holographic particles and reactive dust.
- **Mouse Parallax**: Smooth spring-based coordinate translation that offsets text, character images, and background glows based on mouse movement.

### 5. Personnel Files & Dossiers
- Interactive custom dossier popups utilizing a styled cyber-dossier folder layout (`MISSION FILE` format with classification status tags).
- One-click plain text copyable resume buffer alongside high-fidelity visual cards.

### 6. Secrets & Easter Eggs
- Keyboard locking trigger: Typing **`nyx`** anywhere on the keyboard prompts an `ACCESS GRANTED` console override, unveiling a hidden system diagnostic and control matrix.

### 7. Performance & FPS Protection
- Active frame monitor evaluates performance. If client frames drop below **40 FPS**, the system automatically toggles into eco-mode—reducing canvas pixel ratios, removing floating nebula sparks, disabling shadows, and optimizing draw cycles.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Sound**: Web Audio API (Synthesized oscillators)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cto-semiquantum/harsh-portfolio.git
   cd harsh-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

*Handcrafted by Harsh Jha // CTO SemiQuantum Technologies*
