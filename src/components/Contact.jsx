import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen text-[#291C0E] pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden px-6"
    >
      <div className="container relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-taupe uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-[11px] font-black mb-4 md:mb-6 block">Ready for expansion</span>
            <h1 className="text-4xl md:text-7xl font-serif italic leading-[1.1] mb-8 md:mb-10 text-chocolate">
              Parlons de votre <br />
              <span className="not-italic text-gold">prochaine frontière.</span>
            </h1>
            
            <p className="text-base md:text-lg text-chocolate/60 leading-relaxed font-medium max-w-lg mb-10 md:mb-12">
              Que vous soyez prêt à conquérir le marché US ou à vous implanter en Europe, Virae est votre partenaire de transcréation haute couture. 
            </p>

            <div className="space-y-8 md:space-y-10">
              <div className="flex gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-chocolate/5 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={16} md:size={18} className="text-chocolate" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-taupe mb-1">Email</p>
                  <a href="mailto:contact@virae.com" className="text-lg md:text-xl font-serif italic hover:text-gold transition-colors text-chocolate">contact@virae.com</a>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-chocolate/5 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin size={16} md:size={18} className="text-chocolate" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-taupe mb-1">Studio</p>
                  <p className="text-base md:text-lg font-medium text-chocolate/80">80 Rue de Turenne, 75003 Paris</p>
                </div>
              </div>

              <div className="pt-8 md:pt-10 border-t border-chocolate/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden grayscale">
                    <img src="https://i.pravatar.cc/100?img=68" alt="Founder" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-chocolate">Ali S.</p>
                    <p className="text-[9px] md:text-[10px] font-medium text-taupe tracking-wider uppercase">Fondateur & Directeur Créatif</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/40 backdrop-blur-xl border border-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl"
          >
            <div className="mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-serif italic mb-2 text-chocolate">Envoyez-nous un message</h3>
              <p className="text-xs md:text-sm text-chocolate/50 font-medium">Nous revenons vers vous avec une proposition stratégique sous 24h.</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <input type="text" placeholder="Prénom" className="w-full bg-white/50 border border-chocolate/5 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm focus:outline-none focus:border-gold transition-colors" />
                  <input type="text" placeholder="Nom" className="w-full bg-white/50 border border-chocolate/5 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <input type="email" placeholder="Email professionnel" className="w-full bg-white/50 border border-chocolate/5 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm focus:outline-none focus:border-gold transition-colors" />
                <select className="w-full bg-white/50 border border-chocolate/5 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option>Projet UGC / E-commerce</option>
                  <option>Production Corporate</option>
                  <option>Partenariat Agence</option>
                  <option>Autre</option>
                </select>
                <textarea rows="4" placeholder="Votre message..." className="w-full bg-white/50 border border-chocolate/5 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
              </div>

              <button className="w-full group relative bg-chocolate text-cream py-4 md:py-5 rounded-full text-[11px] md:text-[12px] font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Envoyer ma demande <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <p className="text-center text-[9px] md:text-[10px] text-chocolate/30 font-medium italic">
                Réponse garantie sous 12 heures ouvrées.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
