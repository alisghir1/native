import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const languages = [
  { code: 'FR', name: 'Français', flag: 'https://flagcdn.com/fr.svg', video: '/français.mp4' },
  { code: 'EN', name: 'English', flag: 'https://flagcdn.com/us.svg', video: '/anglais.mp4' },
  { code: 'DE', name: 'Deutsch', flag: 'https://flagcdn.com/de.svg', video: 'https://cdn.pixabay.com/video/2020/04/23/37198-413155169_tiny.mp4' },
];

const Showcase = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = React.useRef(null);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlay = (e) => {
    // Prevent toggle if clicking on language selector
    if (e.target.closest('.lang-selector')) return;
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isShrunk = !isHovered;

  return (
    <section className="py-20 md:py-32 overflow-hidden px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          
          {/* Left Column: Interaction */}
          <div className="relative flex flex-col items-center order-2 lg:order-1">
            {/* Phone Mockup */}
            <div 
              className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[9/19] md:aspect-[9/19.5] mx-auto cursor-pointer group"
              onClick={togglePlay}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-white/20 shadow-2xl z-30 pointer-events-none bg-white/5" />
              
              {/* Video Container */}
              <div className="absolute inset-1.5 md:inset-2 rounded-[2.2rem] md:rounded-[2.5rem] overflow-hidden bg-black z-10">
                <AnimatePresence mode="wait">
                  <motion.video
                    ref={videoRef}
                    key={selectedLang.code}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={`${selectedLang.video}#t=0.001`} type="video/mp4" />
                  </motion.video>
                </AnimatePresence>

                {/* Play Button Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-25 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-md">
                        <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[14px] md:border-l-[18px] border-l-white border-b-[8px] md:border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 md:bottom-10 left-4 md:left-6 right-4 md:right-6 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={selectedLang.code + "-text"}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl"
                  >
                    <p className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      Live Transcreation
                    </p>
                    <p className="text-white/80 text-[11px] md:text-[12px] font-medium leading-tight">
                      {selectedLang.name} — Real-time Lip Sync active.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Internal Language Selector */}
              <motion.div 
                className="absolute left-3 md:left-4 right-3 md:right-4 z-40 lang-selector"
                initial={false}
                animate={{
                  top: isShrunk ? "1.5rem" : "2.5rem",
                  scale: isShrunk ? 0.85 : 1,
                  opacity: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex justify-center gap-1 p-1 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang)}
                      className={`flex flex-col items-center gap-1 flex-1 rounded-xl transition-all duration-300 ${
                        isShrunk ? 'py-1' : 'py-2'
                      } ${
                        selectedLang.code === lang.code
                          ? 'bg-white/20 text-white shadow-lg border border-white/20'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <div className="w-6 md:w-8 h-4 md:h-5 rounded-sm md:rounded-md overflow-hidden border border-white/10 shadow-inner">
                        <img 
                          src={lang.flag} 
                          alt={lang.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <AnimatePresence>
                        {!isShrunk && (
                          <motion.span 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[8px] md:text-[9px] font-black tracking-widest overflow-hidden"
                          >
                            {lang.code}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-10 md:-top-20 -left-10 md:-left-20 w-48 md:w-64 h-48 md:h-64 bg-taupe/20 rounded-full blur-[60px] md:blur-[80px]" />
              <div className="absolute -z-10 -bottom-10 md:-bottom-20 -right-10 md:-right-20 w-48 md:w-64 h-48 md:h-64 bg-chocolate/10 rounded-full blur-[60px] md:blur-[80px]" />
            </div>
          </div>

          {/* Right Column: Conversion */}
          <div className="flex flex-col justify-center text-studio-brown order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] mb-6 md:mb-8 italic">
                Recyclez vos meilleures publicités. <br />
                <span className="not-italic font-bold bg-gradient-to-r from-studio-brown via-taupe to-studio-brown bg-clip-text text-transparent">
                  Dominez le monde sans retourner une seule image.
                </span>
              </h2>
              
              <p className="text-base md:text-xl text-studio-brown/70 mb-8 md:mb-12 leading-relaxed font-medium max-w-xl">
                Transformez votre contenu le plus performant en une armada de publicités Virae pour TikTok, Meta et YouTube Ads. Sans jamais retourner une seule image.
              </p>
              
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToView', { detail: 'contact' });
                  window.dispatchEvent(event);
                }}
                className="w-full md:w-auto group relative bg-studio-brown text-white px-10 py-4 md:py-5 rounded-full text-[13px] md:text-[14px] font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-studio-brown/20 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Déployer votre Vision <ArrowRight size={20} />
                </span>
                <div className="absolute inset-0 bg-taupe translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 border-t border-studio-brown/10 pt-8 md:pt-10">
                {[
                  { label: 'Conversion', value: '+45%' },
                  { label: 'Reach Global', value: '180+' },
                  { label: 'ROI Pub', value: 'x3.2' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif italic mb-1">{stat.value}</span>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;
