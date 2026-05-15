import React from 'react';
import { motion } from 'framer-motion';
import { Eye, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

const FadeInView = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const QualityCard = ({ icon: Icon, title, desc, delay, textColor, subTextColor, borderColor, cardBg, iconBg, iconColor }) => (
  <motion.div 
    style={{ backgroundColor: cardBg, borderColor }}
    className="group relative p-8 rounded-[2rem] border transition-shadow duration-700 shadow-sm hover:shadow-xl"
  >
    <motion.div 
      style={{ backgroundColor: iconBg, color: iconColor, borderColor: iconBg }}
      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border"
    >
      <Icon size={22} />
    </motion.div>
    <motion.h3 
      style={{ color: textColor }}
      className="text-xl font-serif mb-4 italic"
    >
      {title}
    </motion.h3>
    <motion.p 
      style={{ color: subTextColor }}
      className="text-sm leading-relaxed font-medium"
    >
      {desc}
    </motion.p>
    
    {/* Decorative corner accent */}
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <Sparkles size={14} className="text-gold" />
    </div>
  </motion.div>
);

const QualityControl = ({ textColor, subTextColor, borderColor, cardBg, iconBg, iconColor }) => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <FadeInView>
            <span className="text-taupe uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-6 block">The Human Touch</span>
            <motion.h2 
              style={{ color: textColor }}
              className="text-4xl md:text-7xl mb-8 leading-[1.05] italic font-serif"
            >
              L'IA crée, l'expert <br />
              <span className="not-italic font-bold text-gold">valide l'émotion.</span>
            </motion.h2>
            <motion.div 
              style={{ backgroundColor: borderColor }}
              className="h-px w-24 mx-auto mb-10" 
            />
            <motion.p 
              style={{ color: subTextColor }}
              className="text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Le High Ticket exige l'irréprochable. Là où les outils automatisés s'arrêtent, <span className="italic">notre regard commence.</span>
            </motion.p>
          </FadeInView>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <FadeInView delay={0.2}>
            <QualityCard 
              icon={Eye} 
              title="Vigilance Chirurgicale" 
              desc="Chaque micro-clignement, chaque souffle et chaque mouvement labial est scruté par nos monteurs experts pour garantir un rendu 100% organique." 
              textColor={textColor}
              subTextColor={subTextColor}
              borderColor={borderColor}
              cardBg={cardBg}
              iconBg={iconBg}
              iconColor={iconColor}
            />
          </FadeInView>
          
          <FadeInView delay={0.4}>
            <QualityCard 
              icon={UserCheck} 
              title="Validation Native" 
              desc="Pas de traduction littérale. Un expert de la langue cible valide les expressions idiomatiques et le ton culturel pour une crédibilité totale." 
              textColor={textColor}
              subTextColor={subTextColor}
              borderColor={borderColor}
              cardBg={cardBg}
              iconBg={iconBg}
              iconColor={iconColor}
            />
          </FadeInView>
          
          <FadeInView delay={0.6}>
            <QualityCard 
              icon={ShieldCheck} 
              title="Standard Excellence" 
              desc="Votre image de marque est sacrée. Nous appliquons un protocole de test sur 12 points de contrôle avant chaque livraison finale." 
              textColor={textColor}
              subTextColor={subTextColor}
              borderColor={borderColor}
              cardBg={cardBg}
              iconBg={iconBg}
              iconColor={iconColor}
            />
          </FadeInView>
        </div>

        {/* Bottom statement */}
        <FadeInView delay={0.8}>
          <motion.div 
            style={{ backgroundColor: cardBg, borderColor }}
            className="mt-16 md:mt-24 p-8 md:p-12 rounded-[3rem] border backdrop-blur-sm text-center max-w-5xl mx-auto shadow-sm"
          >
            <motion.p 
              style={{ color: subTextColor }}
              className="text-sm md:text-base font-serif italic mb-0"
            >
              "L'intelligence artificielle est notre moteur, l'instinct humain est notre boussole. <br className="hidden md:block" />
              C'est cette synergie qui transforme une simple vidéo en une <span className="text-gold">machine de conversion internationale.</span>"
            </motion.p>
          </motion.div>
        </FadeInView>
      </div>
    </section>
  );
};

export default QualityControl;
