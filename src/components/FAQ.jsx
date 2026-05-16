import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-chocolate/10 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-serif italic transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-chocolate group-hover:text-chocolate/70'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full border border-chocolate/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-chocolate text-cream border-chocolate rotate-180' : 'text-chocolate/40 group-hover:border-chocolate/30'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-sm md:text-base text-chocolate/60 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      q: "Qu'est-ce que VIRAE et en quoi vous différenciez-vous d'une agence de traduction classique ?",
      a: "VIRAE n'est pas une agence de traduction, c'est un studio de transcréation technologique. Nous utilisons des intelligences artificielles propriétaires de pointe pour cloner votre voix, synchroniser le mouvement de vos lèvres (lip-sync) et adapter vos vidéos dans plus de 30 langues. Là où la traduction classique livre un texte, VIRAE livre votre contenu original, avec votre voix et votre visage, parfaitement naturel pour un public étranger."
    },
    {
      q: "Est-ce que le rendu final a l'air \"artificiel\" ou robotique ?",
      a: "C'est notre combat quotidien. Notre direction artistique applique une couche de post-production humaine rigoureuse sur chaque frame et chaque milliseconde audio. Le clonage vocal conserve vos intonations, vos rires, votre accent et vos émotions. Le résultat est si fluide que vos spectateurs internationaux penseront que vous parlez couramment leur langue."
    },
    {
      q: "Quelles technologies utilisez-vous en coulisses ?",
      a: "Nous combinons et optimisons les meilleurs modèles de réseaux de neurones mondiaux (LLM textuels, modèles de clonage vocal génératifs et algorithmes de re-targeting vidéo haute définition). Nous n'utilisons pas d'outils grand public : nos architectures techniques sont configurées sur-mesure pour chaque client afin de garantir un traitement vidéo de qualité cinéma."
    },
    {
      q: "De quoi avez-vous besoin pour commencer à travailler ?",
      a: "De votre vidéo finale au format le plus brut possible (sans musique de fond trop forte si possible, pour un traitement audio optimal). Pour le premier projet, nous vous demanderons également un enregistrement audio de 5 minutes de votre voix pour créer votre matrice vocale unique. Une fois cette matrice créée, nous pouvons localiser toutes vos futures vidéos en quelques clics."
    },
    {
      q: "Quels sont vos délais de livraison ?",
      a: "Notre agilité technologique nous permet de livrer des formats courts (UGC, Reels, TikTok) en moins de 48 heures. Pour des productions plus denses (formations, webinaires, documentaires), les délais varient entre 3 et 7 jours ouvrés selon le niveau de vérification linguistique requis."
    },
    {
      q: "Dans quelles langues pouvez-vous adapter mes contenus ?",
      a: "Nous couvrons actuellement plus de 35 langues, incluant les marchés majeurs (Anglais américain/britannique, Espagnol LATAM/Espagne, Allemand, Mandarin, Japonais, Arabe, Portugais) ainsi que des dialectes régionaux spécifiques pour maximiser la rétention locale."
    },
    {
      q: "Qu'advient-il de ma voix et de mes données ? Sont-elles sécurisées ?",
      a: "C’est notre priorité absolue. Vos matrices vocales et vos données vidéos sont cryptées et stockées sur des serveurs sécurisés. VIRAE s'engage contractuellement à ne jamais revendre, louer ou utiliser votre voix en dehors des projets que vous nous confiez. Votre empreinte numérique reste votre propriété exclusive."
    },
    {
      q: "Que se passe-t-il au niveau des droits d'auteur à l'international ?",
      a: "Vous conservez 100 % de la propriété intellectuelle de vos vidéos localisées. VIRAE n'est qu'un facilitateur technique. Vous touchez l'intégralité des revenus de monétisation, de sponsoring ou de ventes générés sur vos nouveaux canaux internationaux."
    },
    {
      q: "Quel est le coût d'une collaboration avec VIRAE ?",
      a: "Nous ne travaillons pas au mot, mais au projet ou sous forme de forfait mensuel pour les créateurs réguliers. Nos tarifs reflètent la technologie de pointe utilisée et le travail de finition humaine. Chaque projet étant unique (durée, nombre de langues cibles, complexité visuelle), nous émettons des propositions sur-mesure après l'analyse de vos fichiers sources."
    },
    {
      q: "Quel retour sur investissement (ROI) puis-je attendre ?",
      a: "En ouvrant votre contenu à l'international, vous multipliez instantanément votre audience potentielle par 5 ou 10 pour un coût de production infime par rapport au tournage d'une nouvelle vidéo. Nos clients constatent généralement une hausse de leur CPM (coût pour mille vues) et l'accès à des partenariats de marques internationales impossibles à décrocher sur un seul marché linguistique."
    },
    {
      q: "Proposez-vous un test ou un échantillon gratuit ?",
      a: "Pour les marques et créateurs qui correspondent à nos critères d'éligibilité, nous proposons la réalisation d'un \"Test Pilote\" de 30 secondes sur l'une de vos vidéos existantes. Cela vous permet de juger de la perfection du clonage et du lip-sync avant de vous engager."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-40 px-6 relative overflow-hidden">
      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Header: Title & Intro centered above */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-6 block">Foire Aux Questions</span>
            <h2 className="text-4xl md:text-7xl text-chocolate mb-8 leading-[1.05] italic font-serif">
              Des réponses à vos <br />
              <span className="not-italic font-bold text-gold">ambitions mondiales.</span>
            </h2>
            <p className="text-chocolate/50 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Tout ce que vous devez savoir pour propulser votre image au-delà des frontières avec la technologie VIRAE.
            </p>
          </motion.div>
        </div>

        {/* Content: FAQ Accordions with sequential numbering */}
        <div className="flex flex-col">
          {faqData.map((item, idx) => {
            const number = (idx + 1).toString().padStart(2, '0');
            return (
              <FAQItem
                key={idx}
                question={`${number}. ${item.q}`}
                answer={item.a}
                isOpen={activeIndex === idx}
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              />
            );
          })}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sand-light/10 rounded-full blur-[150px] -z-10" />
    </section>
  );
};

export default FAQ;
