import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const GIFT_ITEMS = [
  { emoji: "🍫", text: "A half-eaten chocolate bar" },
  { emoji: "✋", text: "A high-five" },
  { emoji: "🧦", text: "My old socks" },
  { emoji: "🪨", text: "A pet rock named Tejal" },
  { emoji: "👍", text: "Thenga" },
  { emoji: "❤️", text: "Hamara Pyaaaar" },
];

export const GiftSlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const [reelItems, setReelItems] = useState<number[]>([]);

  const spin = () => {
    if (isSpinning) return;

    setResultIndex(null);
    
    // Create a long list of items for the reel effect
    const totalSpins = 30 + Math.floor(Math.random() * 10);
    const newReelItems = Array.from({ length: totalSpins }, (_, i) => {
      if (i === totalSpins - 1) {
        return spinCount >= 2 
          ? Math.floor(Math.random() * GIFT_ITEMS.length)
          : Math.floor(Math.random() * (GIFT_ITEMS.length - 1));
      }
      return Math.floor(Math.random() * (GIFT_ITEMS.length - 1));
    });

    setReelItems(newReelItems);
    setIsSpinning(true);

    // Animation duration
    const duration = 3000;
    
    setTimeout(() => {
      const finalIndex = newReelItems[newReelItems.length - 1];
      setResultIndex(finalIndex);
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);

      if (finalIndex === GIFT_ITEMS.length - 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F4A6C1', '#E891B4', '#FFE4E1'],
        });
      }
    }, duration);
  };

  return (
    <section className="py-24 px-4 bg-cream overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-mauve-dark mb-4"
          >
            The Gift Hint Slot Machine
          </motion.h2>
          <p className="text-mauve/70 font-luxury italic">Spin to see what your "amazing" gift might be!</p>
        </div>

        <Card className="p-8 border-4 border-rose-gold bg-white shadow-2xl relative">
          {/* Slot Machine Top Decor */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-gold text-white px-6 py-1 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg">
            Lucky Sister Slots
          </div>

          <div className="bg-charcoal/5 rounded-xl p-8 mb-8 border-2 border-charcoal/10 relative overflow-hidden h-64 flex items-center justify-center">
            {/* Reel Background Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="h-full w-full flex justify-around">
                <div className="w-px h-full bg-charcoal" />
                <div className="w-px h-full bg-charcoal" />
              </div>
            </div>

            <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ y: 0 }}
                    animate={{ y: -(reelItems.length - 1) * 200 }}
                    transition={{ 
                      duration: 3, 
                      ease: [0.45, 0.05, 0.55, 0.95] 
                    }}
                    className="flex flex-col items-center"
                    style={{ filter: 'blur(4px)' }}
                  >
                    {reelItems.map((itemIdx, i) => (
                      <div key={i} className="h-[200px] flex flex-col items-center justify-center shrink-0">
                        <div className="text-8xl mb-2 drop-shadow-2xl">
                          {GIFT_ITEMS[itemIdx].emoji}
                        </div>
                        <h3 className="text-xl font-serif text-mauve-dark/30 font-bold">
                          {GIFT_ITEMS[itemIdx].text}
                        </h3>
                      </div>
                    ))}
                  </motion.div>
                ) : resultIndex !== null ? (
                  <motion.div
                    key="result"
                    initial={{ scale: 0.5, opacity: 0, y: 100, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20 
                    }}
                    className="text-center space-y-4 z-10"
                  >
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-8xl mb-4 drop-shadow-2xl"
                    >
                      {GIFT_ITEMS[resultIndex].emoji}
                    </motion.div>
                    {resultIndex === GIFT_ITEMS.length - 1 && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="flex justify-center"
                      >
                        {Heart && <Heart className="text-rose-gold fill-rose-gold" size={48} />}
                      </motion.div>
                    )}
                    <h3 className="text-3xl font-serif text-mauve-dark font-bold tracking-tight">
                      {GIFT_ITEMS[resultIndex].text}
                    </h3>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center space-y-4"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Gift size={100} className="text-rose-gold/20 mx-auto" />
                    </motion.div>
                    <p className="text-mauve/40 font-luxury italic text-lg">Ready to spin for a hint?</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glass Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={spin}
              disabled={isSpinning}
              className={`w-full py-8 text-2xl font-bold rounded-2xl shadow-xl transition-all active:scale-95 ${
                isSpinning ? 'bg-mauve/50' : 'bg-rose-gold hover:bg-rose-gold-dark'
              } text-white`}
            >
              {isSpinning ? (
                <RefreshCw className="animate-spin mr-3" size={28} />
              ) : (
                <Sparkles className="mr-3" size={28} />
              )}
              {isSpinning ? "SPINNING..." : "SPIN FOR A HINT!"}
            </Button>
            
            <p className="text-xs text-mauve/40 uppercase tracking-widest">
              {spinCount === 0 ? "You have 1 free spin!" : `Spins taken: ${spinCount}`}
            </p>
          </div>

          {/* Side Handle (Visual Only) */}
          <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-32 bg-rose-gold/20 rounded-r-xl border-y-2 border-r-2 border-rose-gold/30">
            <motion.div 
              animate={{ y: isSpinning ? [0, 60, 0] : 0 }}
              className="w-12 h-12 bg-rose-gold rounded-full -right-6 absolute top-0 shadow-lg border-4 border-white"
            />
          </div>
        </Card>

        {spinCount > 0 && !isSpinning && resultIndex !== GIFT_ITEMS.length - 1 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-mauve font-luxury italic"
          >
            "Hmm, maybe the next spin will be better? Try again!"
          </motion.p>
        )}
      </div>
    </section>
  );
};
