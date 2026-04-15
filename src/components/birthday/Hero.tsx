import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fireConfetti } from '@/lib/confetti';

export const Hero = ({ sisterName = "Tejal" }: { sisterName?: string }) => {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      fireConfetti();
    }
  }, [hasStarted]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-cream px-4 text-center">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 1, 1, 0],
              rotate: [0, 45, -45, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-rose-gold/30"
          >
            {Heart && <Heart size={20 + Math.random() * 40} fill="currentColor" />}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10"
      >
        <motion.h2 
          className="text-mauve text-xl md:text-2xl font-luxury tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Happy Birthday
        </motion.h2>
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-mauve-dark mb-8 leading-tight"
        >
          {sisterName.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-charcoal/70 font-luxury italic text-lg md:text-xl max-w-md">
            "A sister is a little bit of childhood that can never be lost."
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHasStarted(true)}
            className="bg-rose-gold text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-rose-gold-dark transition-colors flex items-center gap-2"
          >
            Start the Celebration {Heart && <Heart size={18} fill="currentColor" />}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-mauve/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xs uppercase tracking-widest mb-2">Scroll to explore</p>
        <div className="w-px h-12 bg-mauve/30 mx-auto" />
      </motion.div>
    </section>
  );
};
