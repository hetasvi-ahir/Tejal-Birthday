import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stamp } from 'lucide-react';
import { useState } from 'react';

const LETTERS = [
  {
    id: 1,
    name: "Jahanvi",
    content: "Happy Birthday teju didi 🎂💕\n\nHope Canada is treating you well! Sending you lots of love and come soon 🥹🫶🏻🤗✨",
    date: "April 15, 2026"
  },
  {
    id: 2,
    name: "Nisarg",
    content: "To big sis,\n\nGlad to have you in my life. You make things better by just being you! 🤪😊",
    date: "April 15, 2026"
  },
  {
    id: 3,
    name: "Krupal",
    content: "Dear Teju,\n\nOn this special day, I just want to say something I usually don’t.\n\nWe’ve known each other for over 14 years, and honestly, the journey has been incredible. So many ups and downs, yet here we are—with a strong, mature bond that I truly value (and I know you do too).\n\nNo matter how busy life gets, somehow we always show up for each other—and that means a lot. I’m really grateful to have someone like you in my life… someone I can laugh with, fight with, annoy, and still never let go.\n\nI could say much more, but I’ll keep it simple—\n\nHappy Birthday! 🎉🥳\n\nWishing you all the happiness, success, and everything your heart desires. Stay strong, stay happy, and remember—I’m always here for you.\n\nLastly, i miss your cold coffee though 🙈",
    signature: "Yours one & only, KK 🤘🏻",
    date: "April 15, 2026"
  },
  {
    id: 4,
    name: "A Friend",
    content: "Hi Tejlu !!!\n\nJust wanted to say you’re awesome and I’m lucky to have friend like you in my life. Thanks for always being there—through laughs, support, and unforgettable memories together.",
    date: "April 15, 2026"
  },
  {
    id: 5,
    name: "Kritika",
    content: "Aeyyy Tj Tejluuuuuu 😘\n\nHappy Birthday Ladkiiii!\n\nI hope you are enjoying your married life and irritating Hardik to the core.\n\nBut my heartiest wish is to see you doing something in art again. You have that artistic creativity embedded in you, never let that trait die. So just go dance, paint, make.. Do whatever fuck you want to do in this life.\n\nLove you Tejliiii. Hope to meet you soon. ❤️",
    signature: "Always your Fan Girl",
    date: "April 15, 2026"
  },
  {
    id: 6,
    name: "Aarti",
    content: "Distance makes it hard to give you a big hug so I am sending infinite ones with my wishes\n\nI must be insane because I don't know anyone else crazy enough to endure you 😜 Happiest birthday to the gorgeous friend\n\nYou make everything feels better",
    date: "April 15, 2026"
  },
  {
    id: 7,
    name: "Jadiya bhai",
    content: "Aalsi he sirf Creative kudi itna bola he",
    date: "April 15, 2026"
  },
  {
    id: 8,
    name: "Hetu",
    content: "It is all changed. They say it all gets better with the time but I can always feel that space /void whenever I do something,I go somewhere or I attend a function . I miss you .This means that you are important. You were and You will be always .\n\nLove you , Gandi Hetu",
    date: "April 15, 2026"
  },
  {
    id: 9,
    name: "Mahtab",
    content: "Happy Birthday! Even though we’re miles apart, you’re always so close to my heart, I miss you more than I say.\n\nWe may not be the typical long-distance best friends as we don’t call or text all the time(mostly because your husband takes up all your time😜), but your never ending memes and reels are hard to miss & with you, it’s always easy, always fun, and it somehow never feels like anything’s changed.\n\nI love seeing you so happy in this new phase of life, wishing you all the love, laughter, and little moments that make it so special 💫\n\nAnd hey… first birthday as a wife, hope he’s doing a great job, but don’t worry, I’m still your favorite 😉",
    date: "April 15, 2026"
  },
  {
    id: 10,
    name: "Nishabhabhi",
    content: "Teju Teju Teju.. Happy Birthday Girlie !! \n\nThank you for being born and spreading joy in people's life..\n\nJust a minute back you guys had come to my home for checking me out for Shaadi with Tikku Panda and now you yourself are hitched !\n\nTime just flew... Hardik is smiling brighter bcoz of you! Maami and Maama hide a tear while talking to you, Kehvin from \"Gando Kaka's Land\" would be missing you and nanhi se Hetu is now the commander in chief and is immersing herself in work so as to push aside the missingness !..\n\nAll of ya cousins and friends n family would be missing you.but happy that you have found your way. Everyone misses in their own unique way..look at the smiles and some scares you have brought to everyone 's face 😎..\n\nA day back or so I was having Mango Dolly and I remembered you but was too lazy to go upstairs to take a pic of the candy n send it to you!\n\nI am not hoping but I am 100 percent sure Hardik will leave no stone unturned to make this a memorable day for you!",
    date: "April 15, 2026"
  },
  {
    id: 11,
    name: "Keval",
    content: "Hello, Mummy 2.0!\n\nHappy birthday! 🎂\n\nFrom doing my assignments and diagrams to helping me get out of many trouble.\n\nThank you is a really short word. But abhi to paise nahi hai to ussi se chala lo.\n\nAnd stop being mummy 2.0, be cool like us.\n\nHappy birthday,\n-Keval",
    date: "April 15, 2026"
  },
  {
    id: 12,
    name: "Ishan",
    content: "Happy Birthday Tejal Sis! 🎉\n\nKem che Canada ni life? Lage che mast set thai gaya cho tya 😄 bas amne bhulta nai!\n\nBhale aapde vadhu vaat nathi karta, pan tame hamesha fun ane mast vibe vala cho. Wishing you loads of happiness, success ane full enjoy vala moments aagal na varsh ma.\n\nBday enjoy karo properly ane cake thodu vadhu khai lejo mari taraf thi! 🥳",
    date: "April 15, 2026"
  },
  {
    id: 13,
    name: "Dhwani",
    content: "Happy birthday to my partner in crime, my confidant, and my best friend! You’re more than just a friend; you’re a confidant, and a constant source of joy. Happiest birthday! 💕\n\nOn your special day, I want to thank you for being an amazing friend. Here’s to many more adventures together! 🎊\n\nHappy birthday to the friend who’s been putting up with me all these years! You’re another year older, but don’t worry, you’re still as young and crazy as ever! Birthdays are nature’s way of telling us to eat more cake, and I’m happy to oblige with you! Here’s to another year of chasing dreams, making memories, and living life to the fullest! 🎯\n\nKeep shining and making the world a better place.🎂🎉🎊🥰🌸",
    date: "April 15, 2026"
  }
];

const LetterCard = ({ letter, index }: { letter: any, index: number, key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -200 : 200, rotate: isEven ? -10 : 10, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="w-full perspective-1000"
    >
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative transition-all duration-700 cursor-pointer group h-64"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope Front (Flap) */}
        <motion.div
          animate={{ 
            rotateX: isOpen ? -160 : 0,
            zIndex: isOpen ? 0 : 20 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-blush border-2 border-rose-gold/30 rounded-t-lg origin-top flex items-center justify-center shadow-lg"
        >
          <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center shadow-inner border-2 border-white/20">
            {Heart && <Heart className="text-white fill-white" size={16} />}
          </div>
        </motion.div>

        {/* Envelope Back/Body */}
        <div className="relative w-full h-full bg-blush/80 border-2 border-rose-gold/30 rounded-lg shadow-xl flex flex-col items-center justify-end pb-12 z-10">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-mauve/40 mb-1">Message from</p>
            <h3 className="font-letter text-4xl text-mauve-dark leading-none">{letter.name}</h3>
          </div>
          <div className="absolute bottom-3 right-3 opacity-20">
            <Stamp size={32} className="text-mauve" />
          </div>
        </div>

        {/* The Actual Letter (Slides out) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.9 }}
              animate={{ y: -240, opacity: 1, scale: 1 }}
              exit={{ y: 0, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", damping: 20 }}
              className="absolute top-2 left-2 right-2 bg-[#fffcf5] p-6 shadow-2xl border border-rose-gold/10 z-30 min-h-[400px] flex flex-col"
              style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-mauve/40 font-mono">{letter.date}</span>
                {Heart && <Heart className="text-rose-gold/20" size={14} />}
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="font-letter text-xl text-charcoal leading-relaxed whitespace-pre-line">
                  {letter.content}
                </p>
              </div>

              <div className="mt-4 text-right">
                <p className="font-letter text-xl text-mauve-dark">
                  {letter.signature || `Love, ${letter.name}`}
                </p>
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const Letters = () => {
  return (
    <section className="py-32 px-4 bg-cream overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-serif text-mauve-dark mb-6"
        >
          Heartfelt Messages
        </motion.h2>
        <div className="w-24 h-1 bg-rose-gold mx-auto mb-6" />
        <p className="text-mauve/70 font-luxury italic text-xl">Some words from the heart, just for you.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-64 pb-64">
        {LETTERS.map((letter, index) => (
          <LetterCard key={letter.id} letter={letter} index={index} />
        ))}
      </div>
    </section>
  );
};
