import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { 
  ArrowRight, 
  Mic, 
  Play, 
  Globe, 
  Sparkles, 
  Star, 
  Menu, 
  X 
} from 'lucide-react';
import Showcase from './components/Showcase.jsx';
import Contact from './components/Contact.jsx';

const Navbar = ({ onContactClick, activeNav, setActiveNav, currentView, setCurrentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('FR');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Accueil', 'Expertise', 'Tarifs', 'Contact'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item === 'Contact') {
      onContactClick();
    } else {
      if (currentView === 'contact') {
        setCurrentView('landing');
        setActiveNav(item.toLowerCase());
        // Petit délai pour laisser le temps au DOM de se charger avant le scroll
        setTimeout(() => {
          if (item === 'Accueil') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(item.toLowerCase());
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        setActiveNav(item.toLowerCase());
        if (item === 'Accueil') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(item.toLowerCase());
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 24 : 0, 
          opacity: 1,
          width: '100%',
          maxWidth: isScrolled ? '1200px' : '1400px',
          borderRadius: isScrolled ? (isMenuOpen ? 32 : 80) : 0,
          paddingLeft: isScrolled ? (isMenuOpen ? 24 : 40) : 48,
          paddingRight: isScrolled ? (isMenuOpen ? 24 : 40) : 48,
          paddingTop: isScrolled ? 14 : 20,
          paddingBottom: isScrolled ? 14 : 20,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: isScrolled ? 'blur(40px)' : 'blur(12px)',
          boxShadow: isScrolled ? '0 20px 50px -15px rgba(41,28,14,0.15)' : 'none',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
        transition={{ 
          type: 'spring',
          stiffness: 150,
          damping: 25,
          mass: 1
        }}
        className="pointer-events-auto flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <motion.a 
              href="#" 
              className="font-serif text-[22px] font-black tracking-tighter text-chocolate group relative" 
              onClick={(e) => { 
                e.preventDefault();
                setCurrentView('landing');
                setActiveNav('accueil'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
            >
              VIRAE<span className="text-taupe transition-colors duration-500">.</span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-chocolate transition-all duration-500 group-hover:w-full opacity-20" />
            </motion.a>
          </div>
          
          {/* Center: Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-center gap-10 flex-[2]">
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeNav === item.toLowerCase();
                return (
                  <button 
                    key={item} 
                    onClick={() => handleNavClick(item)}
                    className={`group relative text-[13px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                      isActive ? 'text-chocolate' : 'text-chocolate/40 hover:text-chocolate/70'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-taupe rounded-full"
                        layoutId="nav-dot"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="flex-1 hidden md:flex justify-end">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
                className="text-[11px] font-black tracking-widest text-chocolate/40 hover:text-chocolate transition-colors"
              >
                {lang}
              </button>
              <button 
                onClick={onContactClick}
                className="relative group overflow-hidden bg-chocolate text-cream px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-500 shadow-lg hover:shadow-chocolate/20 hover:-translate-y-0.5 active:scale-95"
              >
                <span className="relative z-10">Démarrer</span>
                <div className="absolute inset-0 bg-taupe translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <button 
                onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
                className="text-[11px] font-black tracking-widest text-chocolate/40"
              >
                {lang}
              </button>
            <button 
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-chocolate text-cream active:scale-90 transition-transform shadow-md"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="w-full overflow-hidden md:hidden"
            >
              <div className="flex flex-col items-center gap-6 pt-10 pb-6">
                {navItems.map((item, idx) => (
                  <motion.button
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`text-[16px] uppercase tracking-[0.4em] font-black ${
                      activeNav === item.toLowerCase() ? 'text-chocolate' : 'text-chocolate/50'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={onContactClick}
                  className="mt-4 bg-chocolate text-cream px-10 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-xl"
                >
                  Démarrer
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

const FadeInView = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const useScrollYTransform = (range, output) => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, range, output);
};

const ProcessStep = ({ number, title, desc, delay }) => (
  <FadeInView delay={delay}>
    <div className="relative pl-12 md:pl-16 pb-12 md:pb-16 border-l border-white/10 last:pb-0">
      <div className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-cream text-chocolate flex items-center justify-center text-xs font-bold z-20 border-4 border-chocolate">
        {number}
      </div>
      <h4 className="text-lg md:text-xl font-serif mb-3 md:mb-4 italic text-cream">{title}</h4>
      <p className="text-sm md:text-base text-cream/60 leading-relaxed max-w-sm font-medium">{desc}</p>
    </div>
  </FadeInView>
);

const LuxuryCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 1, 0.36, 1] }}
  >
    <div className="group relative p-8 md:p-10 rounded-[2rem] bg-white/30 border border-white/50 hover:bg-white/50 transition-all duration-700">
      <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-6 border border-sand-light">
        <Icon size={20} className="text-chocolate" />
      </div>
      <h3 className="text-xl font-serif mb-4 italic">{title}</h3>
      <p className="text-sm text-chocolate/50 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

const PhoneMockup = ({ videoUrl, langList, initialLang }) => {
  const [selectedLang, setSelectedLang] = useState(initialLang || langList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = React.useRef(null);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const togglePlay = (e) => {
    if (e.target.closest('.lang-selector')) return;
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const isShrunk = !isHovered;

  return (
    <div 
      className="relative w-[260px] md:w-[300px] aspect-[9/16] cursor-pointer group shrink-0"
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-[3rem] border-[8px] border-white/20 shadow-2xl z-30 pointer-events-none bg-white/5" />
      <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-black z-10">
        <AnimatePresence mode="wait">
          <motion.video
            ref={videoRef}
            key={selectedLang.code}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            loop
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={selectedLang.video || videoUrl} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {!isPlaying && (
          <motion.div className="absolute inset-0 z-25 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-md">
              <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[14px] md:border-l-[18px] border-l-white border-b-[8px] md:border-b-[10px] border-b-transparent ml-1" />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="absolute left-4 right-4 z-40 lang-selector"
        animate={{ top: isShrunk ? "1.5rem" : "2.5rem", scale: isShrunk ? 0.8 : 0.95 }}
      >
        <div className="flex justify-center gap-1 p-1 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
          {langList.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLangChange(lang)}
              className={`flex flex-col items-center gap-1 flex-1 rounded-xl transition-all duration-300 ${isShrunk ? 'py-1' : 'py-1.5'} ${selectedLang.code === lang.code ? 'bg-white/20 text-white' : 'text-white/40'}`}
            >
              <div className="w-5 h-3 md:w-6 md:h-4 rounded-sm md:rounded-md overflow-hidden border border-white/10">
                <img src={lang.flag} className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [showDef, setShowDef] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [activeNav, setActiveNav] = useState('accueil');
  const [videoCount, setVideoCount] = useState(5);

  useEffect(() => {
    const handleCount = (e) => setVideoCount(e.detail);
    window.addEventListener('videoCountChange', handleCount);
    return () => window.removeEventListener('videoCountChange', handleCount);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const heroOpacity = useScrollYTransform([0, 0.3], [1, 0]);
  const heroScale = useScrollYTransform([0, 0.3], [1, 0.95]);

  return (
    <div className="min-h-screen selection:bg-chocolate selection:text-cream text-[#291C0E] bg-[#F9F7F2] relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sand-light/30 rounded-full blur-[80px] md:blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-taupe/20 rounded-full blur-[70px] md:blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative z-10">
        <Navbar 
          onContactClick={() => { setCurrentView('contact'); setActiveNav('contact'); }} 
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <motion.section 
                id="accueil"
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative pt-40 pb-20 md:pt-32 md:pb-12 overflow-hidden min-h-[90vh] md:min-h-[80vh] flex items-center justify-center px-4"
              >
                <div className="container relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
                      <div className="flex -space-x-3 md:-space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-cream bg-sand-light overflow-hidden shadow-xl">
                            <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-cream bg-chocolate flex items-center justify-center text-[9px] md:text-[10px] font-bold text-cream">
                          +120
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5 items-center">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={10} className="text-[#FFB800] fill-[#FFB800]" />
                          ))}
                        </div>
                        <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.15em] text-chocolate/60">
                          Standard Excellence <span className="text-chocolate">120+ marques</span>
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 md:gap-3 text-[10px] md:text-[13px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-taupe mb-6 relative">
                      <div className="w-6 md:w-10 h-[1px] bg-taupe/30" />
                      <span className="hover:text-chocolate transition-colors duration-300">
                        <span 
                          className="relative font-bold underline decoration-taupe/30 underline-offset-4 cursor-pointer"
                          onMouseEnter={() => setShowDef(true)}
                          onMouseLeave={() => setShowDef(false)}
                          onClick={(e) => { e.stopPropagation(); setShowDef(!showDef); }}
                        >
                          Transcréation
                          <AnimatePresence>
                            {showDef && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                exit={{ opacity: 0, y: -10, scale: 0.95, x: "-50%" }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                style={{ left: "50%" }}
                                className="absolute top-full mt-4 w-64 md:w-72 p-5 bg-white border border-chocolate/10 rounded-2xl shadow-2xl z-50 pointer-events-auto"
                              >
                                <div className="text-[10px] md:text-[11px] leading-relaxed text-chocolate/80 normal-case tracking-normal font-medium text-left">
                                  <p className="font-bold mb-2 text-chocolate uppercase tracking-widest text-[9px] md:text-[10px]">Définition</p>
                                  Plus qu'une traduction, la transcréation adapte votre message aux codes culturels locaux tout en préservant votre identité vocale et visuelle grâce à notre technologie d'IA.
                                </div>
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-chocolate/10 rotate-45" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </span>{" "}
                        de haute facture.
                      </span>
                      <div className="w-6 md:w-10 h-[1px] bg-taupe/30" />
                    </span>
                    
                    <h1 className="text-4xl md:text-7xl lg:text-[85px] font-serif leading-[1.1] md:leading-[0.95] tracking-tighter mb-8 md:mb-10 text-chocolate max-w-5xl italic">
                      Parlez au monde entier <br />
                      <span className="not-italic opacity-90 text-gold relative">
                        sans retourner une image.
                      </span>
                    </h1>
                    
                    <p className="text-sm md:text-xl text-chocolate/60 max-w-2xl md:max-w-3xl mb-10 md:mb-12 leading-relaxed font-medium px-4">
                      Propulsez vos publicités UGC sur de nouveaux marchés en 24h. Notre IA synchronise votre voix et vos lèvres avec un réalisme chirurgical, un rendu organique indétectable pour une conversion locale maximale.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full px-6 md:px-0">
                      <button 
                        onClick={() => setCurrentView('contact')}
                        className="w-full md:w-auto group relative bg-chocolate text-cream px-10 py-4 rounded-full text-[12px] md:text-[13px] font-bold uppercase tracking-widest overflow-hidden transition-all duration-700 shadow-xl"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Lancer mon expansion <ArrowRight size={18} />
                        </span>
                        <div className="absolute inset-0 bg-brown-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      </button>
                      <button 
                        onClick={() => {
                          const el = document.getElementById('showcase');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group flex items-center gap-3 text-chocolate font-bold uppercase tracking-widest text-[11px] md:text-[12px] hover:text-taupe transition-colors"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-chocolate/20 flex items-center justify-center group-hover:bg-chocolate group-hover:text-cream transition-all duration-500">
                          <Play size={14} md:size={16} fill="currentColor" />
                        </div>
                        <span>Voir le Showreel</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Logo Bar - Scrolling Marquee */}
              <section className="py-6 md:py-8 border-y border-sand-light/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="flex whitespace-nowrap">
                  <div className="flex animate-marquee gap-16 md:gap-24 items-center px-12 opacity-15 grayscale">
                    {['L\'OREAL', 'GYMSHARK', 'HELLOFRESH', 'SAMSUNG', 'SHOPIFY', 'NIKE', 'ADIDAS', 'PRADA', 'GUCCI'].map((logo, idx) => (
                      <span key={idx} className="font-serif text-base md:text-xl font-black tracking-tighter text-chocolate">{logo}</span>
                    ))}
                  </div>
                  <div className="flex animate-marquee gap-16 md:gap-24 items-center px-12 opacity-15 grayscale" aria-hidden="true">
                    {['L\'OREAL', 'GYMSHARK', 'HELLOFRESH', 'SAMSUNG', 'SHOPIFY', 'NIKE', 'ADIDAS', 'PRADA', 'GUCCI'].map((logo, idx) => (
                      <span key={`dup-${idx}`} className="font-serif text-base md:text-xl font-black tracking-tighter text-chocolate">{logo}</span>
                    ))}
                  </div>
                </div>
              </section>

              <Showcase />

              {/* Workflow Section */}
              <section className="bg-chocolate text-cream py-20 md:py-32 relative overflow-hidden px-6">
                <div className="container relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
                    <div className="lg:col-span-1">
                      <FadeInView>
                        <span className="text-taupe uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm font-bold mb-6 block">The Methodology</span>
                        <h2 className="text-3xl md:text-6xl text-cream mb-8 md:mb-10 leading-[1.1] italic">Le Protocole <br /><span className="not-italic text-gold opacity-100">Natif.</span></h2>
                        <p className="text-cream/50 text-base md:text-lg mb-10 md:mb-12 leading-relaxed">
                          Une technologie de pointe supervisée par l'œil humain. Pour un résultat indétectable, en un temps record.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-white/10">
                          {[
                            { label: "Délai moyen", value: "24h" },
                            { label: "Précision Lip-Sync", value: "99.9%" },
                            { label: "Coût vs Tournage", value: "-85%" }
                          ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                              <span className="text-2xl md:text-3xl font-serif italic text-gold mb-1">{stat.value}</span>
                              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-cream/40">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </FadeInView>
                    </div>
                    <div className="lg:col-span-1 mt-10 lg:mt-0">
                      <div className="space-y-4">
                        <ProcessStep 
                          number="01" 
                          title="Adaptation Culturelle" 
                          desc="On ne traduit pas, on adapte. Nous réécrivons votre script avec les expressions locales pour que votre message sonne vrai." 
                          delay={0.2} 
                        />
                        <ProcessStep 
                          number="02" 
                          title="Clonage Vocal" 
                          desc="Nous capturons l'essence de votre voix. Le résultat : Vous parlez une nouvelle langue en gardant votre propre timbre." 
                          delay={0.4} 
                        />
                        <ProcessStep 
                          number="03" 
                          title="Synchro Labiale" 
                          desc="Nous réalignons le mouvement de vos lèvres. Pour que la vidéo paraisse 100% organique, jamais artificielle." 
                          delay={0.6} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Expertise Section */}
              <section id="expertise" className="py-20 md:pt-28 md:pb-10 relative overflow-hidden px-6">
                <div className="container">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 leading-[1.1] italic text-chocolate">Une présence <span className="not-italic font-bold text-gold">indiscernable.</span></h2>
                      <div className="space-y-4 md:space-y-6 text-sm md:text-base text-chocolate/60 mb-10 leading-relaxed font-medium max-w-lg">
                        <p>
                          Là où la technologie traditionnelle se heurte à la "vallée de l'étrange", Virae franchit la frontière de l'invisible. Notre processus est une restitution fidèle de l'essence de votre message.
                        </p>
                        <p>
                          Chaque micro-expression et chaque respiration sont réanalysées pour s'adapter organiquement à la nouvelle langue. Le résultat est une nouvelle version originale de vous-même.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-[4/5] md:aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50"
                    >
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="Studio Virae" />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Creations Marquee Section */}
              <section className="py-20 md:pt-10 md:pb-28 overflow-hidden w-full">
                <div className="w-full mb-8 md:mb-12 text-center px-6">
                  <FadeInView>
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-4 md:mb-6 text-chocolate">Quelques unes de nos créations.</h2>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold text-taupe opacity-60">Virae Selection</p>
                  </FadeInView>
                </div>
                
                <div className="relative flex w-full overflow-hidden group">
                  <div className="flex gap-4 md:gap-6 animate-marquee py-6 md:py-10 pr-4 md:pr-6 shrink-0">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <PhoneMockup 
                        key={i}
                        langList={[
                          { code: 'FR', flag: 'https://flagcdn.com/fr.svg', video: '/français.mp4' },
                          { code: 'EN', flag: 'https://flagcdn.com/us.svg', video: '/anglais.mp4' },
                          { code: 'DE', flag: 'https://flagcdn.com/de.svg', video: 'https://cdn.pixabay.com/video/2020/04/23/37198-413155169_tiny.mp4' }
                        ]}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4 md:gap-6 animate-marquee py-6 md:py-10 pr-4 md:pr-6 shrink-0" aria-hidden="true">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <PhoneMockup 
                        key={`dup-${i}`}
                        langList={[
                          { code: 'FR', flag: 'https://flagcdn.com/fr.svg', video: '/français.mp4' },
                          { code: 'EN', flag: 'https://flagcdn.com/us.svg', video: '/anglais.mp4' },
                          { code: 'DE', flag: 'https://flagcdn.com/de.svg', video: 'https://cdn.pixabay.com/video/2020/04/23/37198-413155169_tiny.mp4' }
                        ]}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section className="py-16 md:py-28 px-6">
                <div className="container">
                  <div className="text-center mb-12 md:mb-16">
                    <FadeInView>
                      <h2 className="text-3xl md:text-4xl mb-3 md:mb-4 font-light italic text-chocolate">Artisanat Digital.</h2>
                      <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-taupe">Elite Services</p>
                    </FadeInView>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <LuxuryCard icon={Mic} title="Clonage Vocal" desc="Réplication parfaite du timbre." delay={0.1} />
                    <LuxuryCard icon={Globe} title="Transcréation" desc="Adaptation culturelle profonde." delay={0.2} />
                    <LuxuryCard icon={Sparkles} title="Lip-Sync Pro" desc="Synchronisation labiale au pixel près." delay={0.3} />
                  </div>
                </div>
              </section>

              {/* Pricing Section */}
              <section id="tarifs" className="py-20 md:py-32 bg-white/20 px-6">
                <div className="container">
                  <div className="text-center mb-16 md:mb-20">
                    <FadeInView>
                      <h2 className="text-3xl md:text-6xl font-serif italic mb-4 md:mb-6 text-chocolate">Investissez dans votre <span className="not-italic text-gold">omniprésence.</span></h2>
                      <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-black text-taupe">Plans & Tarifs</p>
                    </FadeInView>
                  </div>

                  {/* Dynamic Pricing Selector */}
                  <div className="mb-20">
                    <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/50 shadow-2xl">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                        <div className="text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-serif italic text-chocolate mb-2">Configurez votre expansion.</h3>
                          <p className="text-sm text-chocolate/50 font-medium">Choisissez le volume de vidéos transcréées dont vous avez besoin.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-chocolate/5 px-6 py-3 rounded-2xl border border-chocolate/5">
                          <span className="text-3xl md:text-4xl font-bold text-chocolate tabular-nums">
                            {videoCount}
                          </span>
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-taupe leading-tight">
                            Vidéos<br />Transcréées
                          </span>
                        </div>
                      </div>

                      <div className="relative h-12 flex items-center mb-16">
                        {/* Custom Slider Styling */}
                        <style>{`
                          .pricing-slider {
                            -webkit-appearance: none;
                            width: 100%;
                            height: 6px;
                            background: rgba(41, 28, 14, 0.1);
                            border-radius: 10px;
                            outline: none;
                            cursor: pointer;
                          }
                          .pricing-slider::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            width: 28px;
                            height: 28px;
                            background: #291C0E;
                            border: 4px solid #F9F7F2;
                            border-radius: 50%;
                            box-shadow: 0 10px 20px rgba(41,28,14,0.2);
                            transition: all 0.3s ease;
                          }
                          .pricing-slider::-webkit-slider-thumb:hover {
                            transform: scale(1.1);
                            box-shadow: 0 15px 30px rgba(41,28,14,0.3);
                          }
                        `}</style>
                        <input 
                          type="range" 
                          min="1" 
                          max="20" 
                          defaultValue="5"
                          className="pricing-slider"
                          id="video-range"
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const event = new CustomEvent('videoCountChange', { detail: val });
                            window.dispatchEvent(event);
                          }}
                        />
                        <div className="absolute top-10 left-0 right-0 h-6">
                          {[1, 5, 10, 15, 20].map(val => {
                            const percent = (val - 1) / 19;
                            return (
                              <span 
                                key={val} 
                                className="absolute text-[10px] font-black text-chocolate/30 -translate-x-1/2"
                                style={{ 
                                  left: `calc(${percent * 100}% + ${(14 - percent * 28)}px)` 
                                }}
                              >
                                {val}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {(() => {
                          // Pricing: 85/vid + 95 setup for Scale, 95/vid (all-in) for Blitz
                          const scalePrice = (videoCount * 85) + 95;
                          const blitzPrice = videoCount * 95;
                          const isBlitzAvailable = videoCount >= 5;

                          // Realistic Non-linear Delivery Logic
                          // Scale: Standard queue
                          const getScaleDelivery = (count) => {
                            if (count === 1) return "24h";
                            if (count === 2) return "48h";
                            if (count <= 4) return "72h";
                            return `${Math.floor(count * 0.8)} jours`;
                          };

                          // Blitz: Priority queue - Faster than scale for same volume
                          const getBlitzDelivery = (count) => {
                            if (count <= 6) return "48h"; 
                            if (count <= 12) return "72h";
                            return "4 jours";
                          };

                          return (
                            <>
                              {/* Scale Express Card */}
                              <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/60 border border-chocolate/5 flex flex-col transition-all duration-500 hover:shadow-xl">
                                <div className="mb-8">
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl md:text-2xl font-serif italic text-chocolate">Scale Express</h3>
                                    <span className="text-[10px] font-black text-taupe bg-taupe/10 px-2 py-1 rounded-md">Standard</span>
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-4xl font-bold tracking-tighter tabular-nums">€{scalePrice}</span>
                                  </div>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-chocolate/40 mt-1">
                                    95€ Empreinte IA + {videoCount * 85}€ vidéos
                                  </p>
                                </div>
                                <ul className="space-y-3 mb-10 flex-grow">
                                  {[
                                    `${videoCount} Vidéo${videoCount > 1 ? 's' : ''} (jusqu'à 60s)`,
                                    `Livraison : ${getScaleDelivery(videoCount)}`,
                                    "Création Empreinte Vocale (95€)",
                                    "Précision Lip-Sync Standard",
                                    "Support par Email"
                                  ].map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[12px] font-medium text-chocolate/70">
                                      <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-orange-400' : 'bg-chocolate/20'}`} />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                                <button 
                                  onClick={() => { setCurrentView('contact'); setActiveNav('contact'); }}
                                  className="w-full py-4 rounded-full text-[11px] font-bold uppercase tracking-widest bg-chocolate text-cream hover:bg-taupe transition-all duration-500"
                                >
                                  Lancer Scale
                                </button>
                              </div>

                              {/* Global Blitz Card */}
                              <div className={`p-8 md:p-10 rounded-[2.5rem] flex flex-col transition-all duration-700 ${
                                isBlitzAvailable 
                                  ? 'bg-chocolate text-cream shadow-2xl scale-105 z-10 border border-gold/30' 
                                  : 'bg-white/20 opacity-40 grayscale pointer-events-none'
                              }`}>
                                {isBlitzAvailable && (
                                  <div className="flex justify-between items-center mb-6">
                                    <span className="bg-gold text-chocolate text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-fit">
                                      Plus Populaire
                                    </span>
                                    <span className="text-[10px] font-black text-gold">Haute Précision</span>
                                  </div>
                                )}
                                <div className="mb-8">
                                  <h3 className={`text-xl md:text-2xl font-serif italic mb-2 ${isBlitzAvailable ? 'text-gold' : 'text-chocolate'}`}>Global Blitz</h3>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-4xl font-bold tracking-tighter tabular-nums">€{blitzPrice}</span>
                                  </div>
                                  <p className={`text-[10px] font-black uppercase tracking-widest ${isBlitzAvailable ? 'opacity-40' : 'opacity-30'}`}>
                                    {isBlitzAvailable ? "0€ Empreinte — Qualité Studio +" : "Disponible dès 5 vidéos"}
                                  </p>
                                </div>
                                <ul className="space-y-3 mb-10 flex-grow">
                                  {[
                                    `${videoCount} Vidéos Transcréées (jusqu'à 60s)`,
                                    `Livraison Prioritaire : ${getBlitzDelivery(videoCount)}`,
                                    "1 Hook Alternatif OFFERT / vidéo",
                                    "Adaptation Culturelle du Script",
                                    "Empreinte Vocale OFFERTE"
                                  ].map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[12px] font-medium">
                                      <div className={`w-1.5 h-1.5 rounded-full ${isBlitzAvailable ? (i === 1 ? 'bg-gold animate-pulse' : 'bg-gold') : 'bg-chocolate/20'}`} />
                                      <span className={isBlitzAvailable ? 'opacity-90' : 'opacity-70'}>{f}</span>
                                    </li>
                                  ))}
                                </ul>
                                <button 
                                  onClick={() => { if (isBlitzAvailable) { setCurrentView('contact'); setActiveNav('contact'); } }}
                                  className={`w-full py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                                  isBlitzAvailable ? 'bg-gold text-chocolate hover:bg-white' : 'bg-white/10 text-white/30'
                                }`}>
                                  Lancer Blitz
                                </button>
                              </div>

                              {/* Empire Growth Card */}
                              <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/40 border border-white/50 flex flex-col">
                                <div className="mb-8">
                                  <h3 className="text-xl md:text-2xl font-serif italic mb-2 text-chocolate">Empire Growth</h3>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-4xl font-bold tracking-tighter">€2 490</span>
                                    <span className="text-xs ml-1 opacity-40">/mois</span>
                                  </div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-chocolate/30">Volume Illimité</p>
                                </div>
                                <ul className="space-y-3 mb-10 flex-grow">
                                  {[
                                    "30 Vidéos / mois (jusqu'à 60s)",
                                    "A/B Testing Hook Illimité",
                                    "Expertise Scripting Local",
                                    "Chef de Projet Dédié",
                                    "Creative Strategy"
                                  ].map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[12px] font-medium text-chocolate/70">
                                      <div className="w-1.5 h-1.5 rounded-full bg-chocolate/20" />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                                <button 
                                  onClick={() => { setCurrentView('contact'); setActiveNav('contact'); }}
                                  className="w-full py-4 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white border border-chocolate/10 text-chocolate hover:bg-chocolate hover:text-cream transition-all duration-500"
                                >
                                  Contacter
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      {/* Risk Reversal Guarantee */}
                      <div className="max-w-2xl mx-auto mt-12 bg-white/30 border border-chocolate/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <p className="text-[11px] md:text-xs font-bold text-chocolate uppercase tracking-widest mb-1">Garantie Indétectable</p>
                          <p className="text-[10px] md:text-[11px] text-chocolate/70 font-medium leading-relaxed">
                            Si la synchronisation labiale n'est pas 100% naturelle et bluffante, nous régénérons votre vidéo gratuitement jusqu'à perfection absolue. Vous ne prenez aucun risque.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* Quote Section */}
              <section className="py-20 md:py-32 bg-white/30 backdrop-blur-sm px-6">
                <div className="container text-center">
                  <FadeInView>
                    <h2 className="text-2xl md:text-6xl font-serif italic max-w-5xl mx-auto mb-10 md:mb-16 text-chocolate leading-snug">
                      "Virae est une <span className="text-gold not-italic">révolution culturelle</span> pour notre distribution globale."
                    </h2>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-chocolate">Marc-Antoine D.</span>
                      <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-taupe mt-1">Global Creative Director, L'Oréal Paris</span>
                    </div>
                  </FadeInView>
                </div>
              </section>

              {/* Footer */}
              <footer className="pt-20 md:pt-32 pb-12 bg-chocolate text-cream rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden px-6">
                <div className="container relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 md:gap-8">
                      <a href="#" className="font-serif text-[24px] md:text-[28px] font-black tracking-tighter text-cream group relative w-fit">
                        VIRAE<span className="text-gold">.</span>
                      </a>
                      <p className="text-cream/50 text-sm leading-relaxed max-w-[240px] font-medium">
                        L'intelligence artificielle au service de l'émotion humaine. Exportez votre vision sans limites.
                      </p>
                      <div className="flex gap-4">
                        {['Instagram', 'LinkedIn', 'X'].map((social) => (
                          <a key={social} href={`https://${social.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-gold hover:border-gold hover:text-chocolate transition-all duration-500">
                            {social[0]}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 lg:col-span-2 lg:grid-cols-2">
                      <div>
                        <h4 className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] font-black mb-6 md:mb-8">Navigation</h4>
                        <ul className="space-y-3 md:space-y-4">
                          {['Accueil', 'Expertise', 'Tarifs', 'Contact'].map((item) => (
                            <li key={item}>
                              <button 
                                onClick={() => {
                                  if (item === 'Contact') {
                                    setCurrentView('contact');
                                    setActiveNav('contact');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  } else {
                                    setCurrentView('landing');
                                    setActiveNav(item.toLowerCase());
                                    setTimeout(() => {
                                      if (item === 'Accueil') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      } else {
                                        const el = document.getElementById(item.toLowerCase());
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                      }
                                    }, 100);
                                  }
                                }}
                                className="text-cream/60 hover:text-gold text-sm font-medium transition-colors duration-300 text-left"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] font-black mb-6 md:mb-8">Expertises</h4>
                        <ul className="space-y-3 md:space-y-4">
                          {['Clonage Vocal', 'Synchro Labiale', 'Transcréation UGC', 'Production Native'].map((item) => (
                            <li key={item}>
                              <a href="#" className="text-cream/60 hover:text-gold text-sm font-medium transition-colors duration-300">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                      <h4 className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] font-black mb-6 md:mb-8">Contact</h4>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-cream/30 mb-1">Collaboration</p>
                          <a href="mailto:hello@virae.ai" className="text-base md:text-lg font-serif italic hover:text-gold transition-colors">hello@virae.ai</a>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-cream/30 mb-1">Bureaux</p>
                          <p className="text-cream/60 text-sm leading-relaxed">
                            80 Rue de Turenne,<br />75003 Paris, France
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <div className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-30 text-center md:text-left">
                      © 2026 VIRAE INTELLIGENCE. TOUS DROITS RÉSERVÉS.
                    </div>
                    <div className="flex gap-6 md:gap-8">
                      {['Mentions Légales', 'Confidentialité', 'Cookies'].map((item) => (
                        <button 
                          key={item} 
                          onClick={() => alert(`Page "${item}" en cours de rédaction.`)}
                          className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 hover:opacity-100 transition-opacity"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-gold/5 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute -top-24 -left-24 w-48 md:w-72 h-48 md:h-72 bg-gold/5 rounded-full blur-[60px] md:blur-[80px]" />
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
