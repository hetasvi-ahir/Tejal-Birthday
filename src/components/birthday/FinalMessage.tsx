import { motion } from 'motion/react';
import { Heart, PartyPopper, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fireConfetti } from '@/lib/confetti';

export const FinalMessage = ({ sisterName = "Sarah" }: { sisterName?: string }) => {
  return (
    <section className="py-24 px-4 bg-mauve text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 rotate-12"><Star size={100} fill="currentColor" /></div>
        <div className="absolute bottom-10 right-10 -rotate-12">{Heart && <Heart size={150} fill="currentColor" />}</div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2"><PartyPopper size={120} /></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm mb-8"
        >
          {Heart && <Heart size={48} className="text-rose-gold fill-rose-gold" />}
        </motion.div>

        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif leading-tight"
          >
            Happy Birthday, <br />
            <span className="text-rose-gold">{sisterName}!</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-luxury italic leading-relaxed opacity-90">
              "I hope your day is filled with as much joy, laughter, and love as you've brought into my life. You're not just my sister, you're my best friend, my confidant, and my inspiration. I can't wait to celebrate many more milestones with you."
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex gap-4">
            <Button 
              onClick={fireConfetti}
              className="bg-rose-gold hover:bg-rose-gold-dark text-white px-8 py-6 text-xl rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Celebrate More! <PartyPopper className="ml-2" />
            </Button>
          </div>

          <div className="pt-12 border-t border-white/10 w-full">
            <p className="text-sm uppercase tracking-[0.3em] opacity-50 mb-4">Made with love by</p>
            <h3 className="font-letter text-4xl text-rose-gold">Your Favorite Sibling</h3>
          </div>
        </motion.div>
      </div>

      {/* Floating Sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </section>
  );
};
