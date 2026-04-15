import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Gift, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

export const InteractiveGames = () => {
  const [clickCount, setClickCount] = useState(0);
  const [loveValue, setLoveValue] = useState(50);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    setClickCount(prev => prev + 1);
    
    // Confetti burst at click position
    confetti({
      particleCount: 15,
      spread: 60,
      origin: { 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      },
      colors: ['#F4A6C1', '#E891B4', '#FFE4E1'],
      scalar: 0.7
    });

    if (clickCount + 1 >= 50 && !isUnlocked) {
      setIsUnlocked(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F4A6C1', '#E891B4', '#FFE4E1'],
      });
    }
  };

  return (
    <section className="py-24 px-4 bg-blush/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-mauve-dark mb-4"
          >
            Interactive Fun
          </motion.h2>
          <p className="text-mauve/70 font-luxury italic">A few little surprises just for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Confetti Clicker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full flex flex-col items-center justify-center text-center space-y-6 border-rose-gold/20 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-mauve-dark">The Heart Popper</h3>
                <p className="text-sm text-mauve/60">Click the heart to fill the room with love!</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleHeartClick}
                className="relative group"
              >
                {Heart && (
                  <Heart 
                    size={120} 
                    className={`transition-colors duration-300 ${clickCount > 0 ? 'text-rose-gold fill-rose-gold' : 'text-rose-gold/20'}`} 
                    strokeWidth={1}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white drop-shadow-md">
                    {clickCount}
                  </span>
                </div>
                {clickCount >= 50 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-4 -right-4 bg-mauve text-white p-2 rounded-full shadow-lg"
                  >
                    <Sparkles size={20} />
                  </motion.div>
                )}
              </motion.button>

              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-widest text-mauve/40">
                  <span>Progress to Secret</span>
                  <span>{Math.min(clickCount, 50)}/50</span>
                </div>
                <div className="h-2 w-full bg-blush/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((clickCount / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-gold/10 rounded-lg border border-rose-gold/20"
                >
                  <p className="font-letter text-xl text-mauve-dark">
                    "You're officially the most loved sister in the world! 💖"
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Love Meter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full flex flex-col items-center justify-center text-center space-y-8 border-rose-gold/20 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-mauve-dark">The Love Meter</h3>
                <p className="text-sm text-mauve/60">How much do you love your sibling today?</p>
              </div>

              <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-blush/30 fill-none"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-rose-gold fill-none"
                    strokeWidth="10"
                    strokeDasharray="100 100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 100 - loveValue }}
                    transition={{ type: "spring", stiffness: 50 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                  <motion.div
                    animate={{ scale: 1 + (loveValue / 100) * 0.5 }}
                  >
                    {Heart && (
                      <Heart 
                        size={60 + (loveValue / 100) * 40} 
                        className="text-rose-gold fill-rose-gold" 
                      />
                    )}
                  </motion.div>
                  <span className="text-4xl font-serif text-mauve-dark">{loveValue}%</span>
                </div>
              </div>

              <div className="w-full space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={loveValue}
                  onChange={(e) => setLoveValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-blush/30 rounded-lg appearance-none cursor-pointer accent-rose-gold"
                />
                <div className="flex justify-between text-xs uppercase tracking-widest text-mauve/40">
                  <span>A Little</span>
                  <span>To the Moon & Back</span>
                </div>
              </div>

              <p className="font-luxury italic text-mauve/70">
                {loveValue < 30 ? "Are you sure? Maybe another coffee will help! ☕" :
                 loveValue < 70 ? "That's a healthy amount of sibling love! 👍" :
                 "Aww, you're the best! I love you too! 🥺💖"}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
