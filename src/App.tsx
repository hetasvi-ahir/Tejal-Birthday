/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/birthday/Hero';
import { Letters } from './components/birthday/Letters';
import { Gallery } from './components/birthday/Gallery';
import { InteractiveGames } from './components/birthday/InteractiveGames';
import { GiftSlotMachine } from './components/birthday/GiftSlotMachine';
import { FinalMessage } from './components/birthday/FinalMessage';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sisterName = "Tejal"; // This could be dynamic

  return (
    <main className="relative min-h-screen bg-cream selection:bg-rose-gold selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-rose-gold origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <Hero sisterName={sisterName} />

      {/* Content Sections */}
      <div className="relative z-10">
        <Letters />
        <Gallery />
        <InteractiveGames />
        <GiftSlotMachine />
        <FinalMessage sisterName={sisterName} />
      </div>

      {/* Global Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-rose-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-mauve/10 rounded-full blur-3xl" />
      </div>

      {/* Footer Info */}
      <footer className="py-8 text-center bg-cream text-mauve/40 text-xs uppercase tracking-widest">
        <p>© 2026 Love Memories • For the best sister in the world</p>
      </footer>
    </main>
  );
}
