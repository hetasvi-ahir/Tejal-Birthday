import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog.tsx';

const PHOTOS = [
  { id: 1, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM.jpeg', caption: 'A beautiful start to our journey.', date: 'Memory 1' },
  { id: 2, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (1).jpeg', caption: 'Laughs and smiles all around.', date: 'Memory 2' },
  { id: 3, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (2).jpeg', caption: 'Captured a perfect moment.', date: 'Memory 3' },
  { id: 4, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (3).jpeg', caption: 'Adventure is out there!', date: 'Memory 4' },
  { id: 5, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (4).jpeg', caption: 'Cherishing every second.', date: 'Memory 5' },
  { id: 6, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (5).jpeg', caption: 'The best times are with you.', date: 'Memory 6' },
  { id: 7, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (6).jpeg', caption: 'Making memories together.', date: 'Memory 7' },
  { id: 8, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (7).jpeg', caption: 'A day to remember.', date: 'Memory 8' },
  { id: 9, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 12.32.09 AM (8).jpeg', caption: 'Pure joy in one frame.', date: 'Memory 9' },
  { id: 10, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 1.25.53 AM.jpeg', caption: 'Special moments, special you.', date: 'Memory 10' },
  { id: 11, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 1.25.54 AM.jpeg', caption: 'Our favorite little escape.', date: 'Memory 11' },
  { id: 12, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 1.25.55 AM.jpeg', caption: 'Smiling through it all.', date: 'Memory 12' },
  { id: 13, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 1.25.56 AM.jpeg', caption: 'Another chapter in our story.', date: 'Memory 13' },
  { id: 14, url: '/src/assets/images/WhatsApp Image 2026-04-15 at 1.25.56 AM (1).jpeg', caption: 'Forever and always.', date: 'Memory 14' },
];

export const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto % PHOTOS.length) + 1);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(((selectedPhoto - 2 + PHOTOS.length) % PHOTOS.length) + 1);
    }
  };

  const currentPhoto = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <section className="py-24 px-4 bg-blush/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-mauve-dark mb-4"
          >
            Memory Lane
          </motion.h2>
          <p className="text-mauve/70 font-luxury italic">A collection of our favorite moments captured in time.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ 
                opacity: 0, 
                y: 50,
                x: index % 2 === 0 ? -20 : 20,
                rotate: index % 2 === 0 ? -5 : 5 
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                x: 0,
                rotate: index % 2 === 0 ? -2 : 2 
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: (index % 4) * 0.1 
              }}
              onClick={() => setSelectedPhoto(photo.id)}
              className="cursor-pointer"
            >
              <div className="bg-white p-3 pb-12 shadow-xl border border-rose-gold/10 relative group">
                <div className="aspect-[4/5] overflow-hidden bg-cream relative flex items-center justify-center">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 z-10"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-mauve/20">
                    {Heart && <Heart size={48} strokeWidth={1} />}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="font-letter text-lg text-mauve-dark truncate">{photo.caption}</p>
                </div>
                <div className="absolute inset-0 bg-mauve/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white" size={32} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentPhoto && (
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white p-4 pb-16 shadow-2xl max-w-full max-h-[90vh] flex flex-col"
              >
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-6 right-6 z-50 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="overflow-hidden flex-1 relative flex items-center justify-center min-h-[300px]">
                  <img 
                    src={currentPhoto.url} 
                    alt={currentPhoto.caption} 
                    className="w-full h-full object-contain relative z-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-mauve/10">
                    {Heart && <Heart size={120} strokeWidth={1} />}
                  </div>
                </div>

                <div className="absolute bottom-4 left-0 right-0 text-center px-8">
                  <h3 className="font-letter text-3xl text-mauve-dark mb-1">{currentPhoto.caption}</h3>
                  <p className="text-xs uppercase tracking-widest text-mauve/50">{currentPhoto.date}</p>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};
