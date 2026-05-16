import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const LegalNav = ({ current, setView }) => {
  const tabs = [
    { id: 'mentions', label: 'Mentions Légales' },
    { id: 'confidentialite', label: 'Confidentialité' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'tarifs_legaux', label: 'CGV' }
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-8 border-b border-chocolate/5 mb-12 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id)}
          className={`pb-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${
            current === tab.id ? 'text-chocolate' : 'text-chocolate/30 hover:text-chocolate/60'
          }`}
        >
          {tab.label}
          {current === tab.id && (
            <motion.div 
              layoutId="legal-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
            />
          )}
        </button>
      ))}
    </div>
  );
};

const LegalPage = ({ title, id, children, onBack, setView }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#F9F7F2] text-[#291C0E] py-24 md:py-32 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-taupe hover:text-chocolate font-bold uppercase tracking-widest text-[11px] mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </button>
        
        <LegalNav current={id} setView={setView} />
        
        <h1 className="text-4xl md:text-5xl font-serif italic mb-12 text-chocolate">{title}</h1>
        
        <div className="prose prose-stone max-w-none 
          prose-headings:font-serif prose-headings:italic prose-headings:text-chocolate prose-headings:mb-4 prose-headings:mt-8
          prose-p:text-chocolate/70 prose-p:leading-relaxed prose-p:mb-3
          prose-li:text-chocolate/70 prose-li:mb-1
          prose-strong:text-chocolate prose-strong:font-bold">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const MentionsLegales = ({ onBack, setView }) => (
  <LegalPage title="Mentions Légales" id="mentions" onBack={onBack} setView={setView}>
    <section>
      <h2>1. Éditeur du site</h2>
      <p>
        Le présent site, accessible à l'URL <strong>https://viraestudio.com</strong>, est édité par :<br />
        <strong>VIRAE STUDIO</strong>, [FORME JURIDIQUE] au capital de [MONTANT] euros, inscrite au R.C.S. de [VILLE] sous le numéro [SIREN], dont le siège social est situé au 80 Rue de Turenne, 75003 Paris, France.
      </p>
      <p>Directeur de la publication : Ali S.</p>
    </section>

    <section>
      <h2>2. Hébergement</h2>
      <p>
        Le Site est hébergé par Vercel, situé 340 S Lemon Ave #4133, Walnut, CA 91789.
      </p>
    </section>

    <section>
      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments constituant ce site relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, adaptation ou modification sans autorisation préalable est strictement interdite.
      </p>
    </section>
  </LegalPage>
);

export const Confidentialite = ({ onBack, setView }) => (
  <LegalPage title="Politique de Confidentialité" id="confidentialite" onBack={onBack} setView={setView}>
    <section>
      <h2>1. Collecte des données</h2>
      <p>
        Nous collectons les informations fournies via notre formulaire de contact : Prénom, Nom, Email, Type de projet et message.
      </p>
    </section>

    <section>
      <h2>2. Utilisation des données</h2>
      <p>Les données sont utilisées pour répondre à vos demandes et gérer la relation commerciale.</p>
    </section>

    <section>
      <h2>3. Conservation</h2>
      <p>VIRAE STUDIO conserve vos données pendant 3 ans à compter du dernier contact pour les prospects.</p>
    </section>

    <section>
      <h2>4. Vos droits (RGPD)</h2>
      <p>Vous disposez des droits d'accès, rectification et effacement. Contact : <strong>contact@viraestudio.com</strong>.</p>
    </section>
  </LegalPage>
);

export const Cookies = ({ onBack, setView }) => (
  <LegalPage title="Gestion des Cookies" id="cookies" onBack={onBack} setView={setView}>
    <section>
      <h2>Qu'est-ce qu'un cookie ?</h2>
      <p>Petit fichier texte déposé sur votre terminal lors de la visite d'un site pour mémoriser vos préférences.</p>
    </section>

    <section>
      <h2>Utilisation</h2>
      <p>Nous utilisons des cookies de performance pour analyser l'audience de façon anonyme.</p>
      <p>Vous pouvez configurer votre navigateur pour les refuser dans les paramètres de confidentialité.</p>
    </section>
  </LegalPage>
);

export const CGV = ({ onBack, setView }) => (
  <LegalPage title="Conditions Générales" id="tarifs_legaux" onBack={onBack} setView={setView}>
    <section>
      <h2>1. Objet</h2>
      <p>Définir les modalités de prestation de services de transcréation et de montage vidéo.</p>
    </section>

    <section>
      <h2>2. Commandes et Tarifs</h2>
      <p>Toute commande fait l'objet d'un devis. Tarifs exprimés en Euros Hors Taxes (HT).</p>
    </section>

    <section>
      <h2>3. Responsabilité</h2>
      <p>VIRAE STUDIO met en œuvre les moyens technologiques pour garantir un rendu naturel.</p>
    </section>
  </LegalPage>
);
