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
        
        <div className="text-chocolate/70 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const fullLegalContent = `Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (L.C.E.N.), il est porté à la connaissance des utilisateurs et visiteurs du site viraestudio.com les présentes mentions légales.

Le site viraestudio.com est accessible à l’adresse suivante : https://viraestudio.com/ (ci-après "le Site"). L’accès et l’utilisation du Site sont soumis aux présentes "Mentions légales" détaillées ci-après ainsi qu’aux lois et/ou règlements applicables.  

La connexion, l’utilisation et l’accès à ce Site impliquent l’acceptation intégrale et sans réserve de l’internaute de toutes les dispositions des présentes Mentions Légales.  

ARTICLE 1 : INFORMATIONS LÉGALES
En vertu de l’Article 6 de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, il est précisé dans cet article l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.  

A. Éditeur du site
Le site viraestudio.com est édité par :
Nom / Raison Sociale : VIRAE STUDIO
Statut juridique : [Entrepreneur Individuel / SAS / EURL / etc.]
Siège social : 28 Rue Maurice Ravel, 92230 Gennevilliers, France
Numéro d'immatriculation : SIRET [Ton numéro SIRET] au R.C.S. de [Ta Ville]
Adresse e-mail : contact@viraestudio.com
Directeur de la publication : Ali S. (en qualité de Fondateur / Président)

B. Hébergeur du site
Le site viraestudio.com est hébergé par :
Nom de l'hébergeur : Vercel Inc.
Adresse de l'hébergeur : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
Contact : https://vercel.com

C. Utilisateurs
Sont considérés comme utilisateurs (ci-après "les Utilisateurs") tous les internautes qui naviguent, lisent, visionnent et utilisent le site viraestudio.com.

ARTICLE 2 : ACCESSIBILITÉ
Le Site est par principe accessible aux Utilisateurs 24/24h et 7/7j, sauf interruption, programmée ou non, pour des besoins de maintenance ou en cas de force majeure.  
En cas d’impossibilité d’accès au Site, celui-ci s’engage à faire son maximum afin d’en rétablir l’accès. Le Site ne saurait être tenu pour responsable de tout dommage, quelle qu’en soit la nature, résultant de son indisponibilité.  

ARTICLE 3 : PROPRIÉTÉ INTELLECTUELLE
L’ensemble de ce site (structure, design, charte graphique, textes, logos, boutons glassmorphic, images, animations 3D, vidéos et échantillons de clones vocaux démos) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l’Éditeur.  
Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.  

ARTICLE 4 : POLITIQUE DE CONFIDENTIALITÉ & DONNÉES PERSONNELLES (RGPD)
L'Éditeur s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site viraestudio.com, soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
Responsable du traitement : Ali S.
Données collectées : Via le formulaire de contact / de demande de "Test Pilote" (Nom, Prénom, Email, Lien vers les réseaux sociaux, fichiers audio/vidéo sources).
Finalité : Ces données sont uniquement utilisées pour qualifier les demandes d'expansion, générer les échantillons de démonstration vocale/visuelle personnalisés, et recontacter les prospects.
Durée de conservation : Les données des prospects sont conservées pour une durée maximale de 3 ans après le dernier contact commercial. Les fichiers sources (audio/vidéo de test) sont supprimés immédiatement après livraison du test pilote si aucune collaboration n'est initiée.
Sécurité des clones vocaux : VIRAE garantit que les données biométriques vocales et faciales soumises pour test ou projet ne sont ni vendues, ni partagées, ni utilisées à d'autres fins que l'exécution stricte du mandat de transcréation.
Vos droits : Conformément à la réglementation, vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition aux données vous concernant. Pour exercer ce droit, contactez-nous à : contact@viraestudio.com.

ARTICLE 5 : POLITIQUE DE COOKIES
Le site viraestudio.com peut avoir recours à l’utilisation de "cookies" pour traiter des statistiques et des informations sur le trafic, faciliter la navigation et améliorer le service pour le confort de l’Utilisateur.
Conformément aux directives de la CNIL, l’Utilisateur est libre d’accepter ou de refuser les cookies de mesure d'audience ou de traçabilité via le bandeau apparaissant lors de sa première visite.

ARTICLE 6 : LOI APPLICABLE ET JURIDICTION
Les présentes Mentions Légales sont régies par la loi française. En cas de différend et à défaut d’accord amiable, le litige sera porté devant les tribunaux compétents de Paris, conformément aux règles de compétence territoriales applicables.

ARTICLE 7 : CONTACT
Pour tout signalement de contenus ou d’activités illicites, ou pour toute question relative aux services de VIRAE, l’Utilisateur peut contacter l’Éditeur par courrier recommandé avec accusé de réception adressé à l’adresse spécifiée à l’ARTICLE 1, ou par e-mail à : contact@viraestudio.com.

Ces mentions légales ont été mises à jour le 16 mai 2026.`;

export const MentionsLegales = ({ onBack, setView }) => (
  <LegalPage title="Mentions Légales" id="mentions" onBack={onBack} setView={setView}>
    {fullLegalContent}
  </LegalPage>
);

export const Confidentialite = ({ onBack, setView }) => {
  const confidentialiteContent = `POLITIQUE DE CONFIDENTIALITÉ
Dernière mise à jour : 16 mai 2026

La présente Politique de Confidentialité a pour but d'informer les utilisateurs et clients (ci-après « vous » ou « l'Utilisateur ») du site viraestudio.com (ci-après « le Site ») et des services de VIRAE (ci-après « nous » ou « l'Éditeur ») sur la manière dont leurs données à caractère personnel sont collectées, traitées, sécurisées et conservées.

VIRAE s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

1. LE RESPONSABLE DU TRAITEMENT DES DONNÉES
Le responsable du traitement des données à caractère personnel est :

Nom / Raison Sociale : VIRAE STUDIO

Adresse e-mail : contact@viraestudio.com

2. LES DONNÉES QUE NOUS COLLECTONS
Nous collectons uniquement les données nécessaires à la réalisation de nos services de transcréation, de clonage vocal et de synchronisation labiale (lip-sync).

Données de contact et d'identification : Nom, prénom, adresse e-mail, numéro de téléphone, liens vers vos réseaux sociaux ou chaînes de contenu (YouTube, TikTok, Instagram...).

Données multimédias (Fichiers sources) : Les fichiers vidéo et audio originaux que vous nous transmettez afin d'être traduits et modifiés.

Données biométriques et vocales (Le "Modèle Vocal") : Les échantillons audio spécifiques (généralement un enregistrement de 5 minutes) transmis volontairement pour concevoir l'empreinte ou la matrice vocale nécessaire au clonage par Intelligence Artificielle.

Données techniques : Données de navigation sur le Site (adresse IP, type de navigateur, cookies de performance).

3. FINALITÉS ET BASES LÉGALES DU TRAITEMENT
Vos données sont traitées pour des objectifs précis, sur les bases légales suivantes :

Exécution d'un contrat ou de mesures précontractuelles (Base légale : Art. 6.1.b du RGPD) :
Évaluer votre éligibilité et traiter vos demandes de « Test Pilote » gratuit ou payant.
Réaliser les prestations de clonage vocal, traduction, lip-sync et édition vidéo.
Gérer la relation client, la facturation et le support technique.

Consentement explicite (Base légale : Art. 6.1.a et Art. 9.2.a du RGPD for les données biométriques) :
En nous soumettant vos fichiers audio pour créer un modèle de voix synthétique, vous consentez de manière claire et explicite à ce que VIRAE traite cette empreinte vocale dans le but strict de localiser vos contenus.

Intérêt légitime (Base légale : Art. 6.1.f du RGPD) :
Améliorer l'expérience utilisateur sur notre Site et sécuriser nos infrastructures contre la fraude.

4. CLAUSE STRICTE DE SÉCURITÉ ET DE PROTECTION DES VOIX (ÉTHIQUE IA)
En raison de la nature sensible des technologies d'Intelligence Artificielle générative, VIRAE applique une politique de tolérance zéro concernant l'usage abusif des données vocales et faciales :

Non-divulgation : Votre matrice vocale et votre visage cloné restent votre propriété exclusive. Ils ne seront jamais vendus, loués, partagés ou transférés à des tiers à des fins publicitaires, commerciales ou d'entraînement de modèles d'IA publics.

Usage restreint : Votre voix synthétique est uniquement déclenchée pour les scripts et les projets que vous avez explicitement validés par contrat. Aucun "Deepfake" ou contenu non autorisé ne peut être généré par notre studio.

5. DURÉE DE CONSERVATION DES DONNÉES
Nous conservons vos données uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :

Données des prospects (demandes de contact/tests sans suite) : Supprimées ou anonymisées dans un délai maximal de 12 mois après le dernier contact.

Fichiers vidéos et audios bruts (projets clients) : Conservés pendant la durée de la prestation, puis archivés de manière sécurisée pendant 90 jours après la livraison finale pour permettre d'éventuelles modifications, avant suppression définitive.

Matrices et modèles vocaux IA (clients actifs) : Conservés pendant toute la durée de notre relation contractuelle afin de faciliter vos futures productions. Ils sont définitivement détruits sur simple demande écrite ou en cas de résiliation du contrat.

6. DESTINATAIRES DES DONNÉES
Les données collectées sont destinées à l'usage exclusif de VIRAE. Elles ne sont transmises qu'aux sous-traitants techniques auxquels nous faisons appel pour l'exécution de nos services (hébergement du site, outils de traitement cloud sécurisés et conformes au RGPD).

Dans le cas où certains de nos partenaires techniques (comme les infrastructures de serveurs d'IA) seraient situés hors de l'Union Européenne, VIRAE s'assure que ces transferts sont encadrés par des Clauses Contractuelles Types (CCT) de la Commission Européenne afin de garantir un niveau de sécurité équivalent.

7. VOS DROITS EN TANT QU'UTILISATEUR
Conformément au RGPD, vous disposez de droits étendus sur vos données personnelles :

Droit d'accès et de rectification : Vous pouvez nous demander quelles données nous détenons sur vous et les corriger.

Droit à l'effacement (Droit à l'oubli) : Vous pouvez exiger la destruction immédiate et totale de vos fichiers vidéos ainsi que de vos modèles vocaux IA.

Droit au retrait du consentement : Vous pouvez retirer votre consentement pour l'usage de votre voix clonée à tout moment (ce qui mettra fin aux prestations en cours).

Droit à la portabilité : Vous pouvez demander à récupérer vos données dans un format structuré.

Pour exercer l’un de ces droits, il vous suffit d'envoyer un e-mail clair à : contact@viraestudio.com.

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous avez le droit d’introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) sur leur site cnil.fr.

8. MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ
VIRAE se réserve le droit de modifier la présente Politique de Confidentialité à tout moment, notamment pour se conformer aux évolutions légales et technologiques de l'écosystème de l'Intelligence Artificielle. Nous vous invitons à consulter cette page régulièrement.`;

  return (
    <LegalPage title="Politique de Confidentialité" id="confidentialite" onBack={onBack} setView={setView}>
      {confidentialiteContent}
    </LegalPage>
  );
};

export const Cookies = ({ onBack, setView }) => {
  const cookiesContent = `POLITIQUE DE COOKIES
Dernière mise à jour : 16 mai 2026

Lors de votre consultation du site viraestudio.com (ci-après « le Site »), des cookies et autres traceurs peuvent être déposés sur votre terminal (ordinateur, mobile, tablette).

La présente Politique de Cookies vous permet de comprendre pourquoi nous les utilisons et comment vous pouvez configurer vos choix à tout moment via notre bandeau de consentement.

1. QU'EST-CE QU'UN COOKIE ?
Un cookie est un petit fichier texte ou un traceur déposé et stocké sur votre appareil lors de la visite d'un site internet. Il permet au Site de reconnaître votre terminal, de mémoriser certaines de vos préférences (comme la langue) ou de suivre vos interactions pour améliorer votre expérience utilisateur.

2. QUELS COOKIES UTILISONS-NOUS ET POURQUOI ?
VIRAE limite l'usage des cookies au strict minimum pour préserver la légèreté du Site et la confidentialité de vos données. Nous classons nos cookies en trois catégories :

A. Les Cookies Strictement Nécessaires (Obligatoires)
Ces cookies sont indispensables au fonctionnement technique du Site. Ils vous permettent de naviguer de manière fluide et de sécuriser le Site. Le Site ne peut pas fonctionner correctement sans eux.

Exemples : Mémorisation de vos choix en matière de cookies (pour ne pas vous reposer la question à chaque page), sécurisation des formulaires de demande de test pilote.

Base légale : Exemption de consentement de la CNIL (nécessité technique).

B. Les Cookies de Mesure d'Audience (Analytiques)
Ces cookies nous permettent de comprendre comment les visiteurs arrivent sur le Site et comment ils interagissent avec les différentes sections (temps passé sur la Hero section, taux de défilement). Cela nous aide à optimiser l'ergonomie et le design de VIRAE.

Exemples : Outils d'analyse anonymisés (comme Fathom Analytics, Plausible ou Google Analytics configuré en mode RGPD).

Consentement : Soumis à votre accord préalable via le bandeau cookies.

C. Les Cookies de Fonctionnalités Tierces
Notre Site intègre des services gérés par des tiers pour enrichir l'expérience utilisateur (intégration de vidéos de démonstration de clones vocaux ou modules de prise de rendez-vous). Ces plateformes peuvent déposer des traceurs pour analyser votre lecture ou votre navigation.

Exemples : Calendly (pour la planification de ton appel de 15 minutes), Vimeo ou YouTube (pour l'affichage en haute définition de nos études de cas vidéo).

Consentement : Soumis à votre accord préalable. Si vous les refusez, les vidéos ou le module Calendly pourraient ne pas s'afficher correctement.

3. DURÉE DE CONSERVATION
Les cookies déposés sur votre terminal ont une durée de vie limitée.

Les cookies de session disparaissent dès que vous fermez votre navigateur.

Les cookies persistants (comme votre choix de consentement) ont une durée de vie qui ne peut excéder 13 mois, conformément aux directives de la CNIL. À l’issue de cette période, votre consentement vous sera de nouveau demandé.

4. COMMENT GÉRER ET CONFIGURER VOS COOKIES ?
Vous disposez de plusieurs moyens pour contrôler l’usage des cookies sur votre appareil :

A. Via le bandeau de cookies de VIRAE
Lors de votre première visite sur viraestudio.com, un bandeau d’information apparaît en bas de l'écran. Il vous permet de cliquer sur « Tout Accepter », « Tout Refuser » ou de personnaliser vos choix par catégorie de cookies. Vous pouvez modifier vos préférences à tout moment en cliquant sur le petit widget de gestion des cookies généralement situé en bas à gauche de notre Site.

B. Via la configuration de votre navigateur
Vous pouvez également configurer votre navigateur internet pour qu'il bloque systématiquement le dépôt de cookies ou qu'il vous avertisse avant chaque dépôt :

Chrome : Paramètres > Confidentialité et sécurité > Cookies et autres données des sites.

Safari : Références > Confidentialité > Bloquer tous les cookies.

Firefox : Options > Vie privée et sécurité > Cookies et données de sites.

5. QUESTIONS ET CONTACT
Pour toute question relative à notre utilisation des cookies ou pour exercer vos droits liés au RGPD, vous pouvez nous contacter directement par e-mail à : contact@viraestudio.com.`;

  return (
    <LegalPage title="Gestion des Cookies" id="cookies" onBack={onBack} setView={setView}>
      {cookiesContent}
    </LegalPage>
  );
};

export const CGV = ({ onBack, setView }) => {
  const cgvContent = `CONDITIONS GÉNÉRALES DE VENTE (CGV)
Dernière mise à jour : 16 mai 2026

ARTICLE 1 : CHAMP D’APPLICATION
Les présentes Conditions Générales de Vente (ci-après "CGV") s'appliquent, sans restriction ni réserve, à l'ensemble des services de transcréation vidéo, doublage par Intelligence Artificielle, clonage vocal, synchronisation labiale (lip-sync) et édition de contenu (ci-après "les Services") proposés par VIRAE (ci-après "le Prestataire" ou "VIRAE") auprès des clients professionnels, créateurs de contenu indépendants, entreprises ou marques (ci-après "le Client").

Toute commande de Services implique l'acceptation pleine et entière par le Client des présentes CGV, qui prévalent sur tout autre document ou condition générale d'achat du Client.

ARTICLE 2 : COMMANDES ET PROCESSUS
2.1 Éligibilité et Demande de Test Pilote
VIRAE se réserve le droit de refus les projets qui ne correspondent pas à ses critères d'éligibilité ou dont le contenu enfreint les lois en vigueur (propos haineux, diffamatoires, contrefaçons, etc.). Un « Test Pilote » de courte durée peut être réalisé avant toute commande ferme, selon les modalités définies sur le Site ou par échange direct.

2.2 Formation du Contrat
La commande devient définitive et le contrat de prestation est formé dès la signature électronique par le Client du devis ou de la proposition commerciale émise par VIRAE (faisant office de bon de commande), accompagnée, le cas échéant, du versement de l'acompte prévu.

ARTICLE 3 : TARIFS, FACTURATION ET MODALITÉS DE PAIEMENT
3.1 Tarifs
Les Services sont fournis aux tarifs en vigueur indiqués sur la proposition commerciale ou le devis accepté par le Client. Les prix sont exprimés en Euros (€) et s'entendent Hors Taxes (HT). Ils seront majorés de la TVA au taux en vigueur au jour de la facturation, si applicable.

3.2 Modalités de paiement
Sauf accord écrit contraire mentionné sur le devis, les modalités de paiement pour un projet ponctuel sont les suivantes :
50 % d'acompte exigible à la signature du devis pour lancer la production.
50 % de solde exigible à la livraison finale des fichiers localisés.

Pour les contrats récurrents (forfaits ou abonnements mensuels), le paiement s'effectue à terme échoir au début de chaque mois de prestation par prélèvement ou virement bancaire.

3.3 Retards de paiement
Tout retard de paiement entraînera l'application de plein droit de pénalités de retard égales au taux d'intérêt appliqué par la Banque Centrale Européenne (BCE) majoré de 10 points, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 € (Article L.441-10 du Code de commerce). VIRAE se réserve le droit de suspendre l'exécution des prestations en cours en cas de défaut de paiement.

ARTICLE 4 : OBLIGATIONS DU CLIENT ET DONNÉES BIOMÉTRIQUES
4.1 Fourniture des éléments sources
Le Client s'engage à fournir à VIRAE des fichiers vidéo et audio sources de qualité technique suffisante pour permettre le traitement par l'Intelligence Artificielle. Tout retard dans la livraison des éléments sources décharge VIRAE de ses engagements de délais de livraison.

4.2 Consentement au traitement de la voix et du visage
Le Client garantit qu'il dispose de l'intégralité des droits d'exploitation et des consentements explicites nécessaires concernant l'image, le visage et la voix des personnes physiques apparaissant dans les vidéos transmises. Le Client décharge VIRAE de toute responsabilité en cas de réclamation d'un tiers liée à l'utilisation non autorisée de sa voix ou de son image.

ARTICLE 5 : DÉLAIS, LIVRAISON ET RÉVISIONS
5.1 Délais d'exécution
Les délais de livraison sont fournis à titre indicatif sur le devis et dépendent de la complexité du projet et de la réactivité du Client. VIRAE s'efforce de respecter ses délais (ex: 48h pour les formats courts), mais un retard raisonnable ne peut donner lieu à l'annulation de la commande ou à l'octroi de dommages et intérêts.

5.2 Processus de révision
À la livraison de la vidéo localisée, le Client dispose d'un délai de 5 jours ouvrés pour demander des ajustements ou révisions mineures (correction d'une mauvaise prononciation de l'IA, ajustement du mixage audio, décalage léger du lip-sync). Passé ce délai, et sans retour écrit du Client, la prestation est considérée comme définitivement validée et la facture de solde est émise.

ARTICLE 6 : PROPRIÉTÉ INTELLECTUELLE ET DROITS
6.1 Propriété du Client
Le Client conserve la propriété exclusive de ses vidéos sources, de ses scripts et des droits d'auteur liés à ses contenus. Une fois le paiement intégral du solde effectué, le Client devient propriétaire exclusif des droits d'exploitation des fichiers livrés par VIRAE à l'international.

6.2 Propriété de VIRAE (Droit d'usage de la voix clonée)
Le modèle ou matrice vocale synthétique créé par VIRAE pour les besoins du Client reste stocké de manière sécurisée par VIRAE. VIRAE s'interdit d'utiliser, de vendre ou de transférer ce modèle de voix à des tiers. VIRAE détient la propriété de ses méthodes, algorithmes, flux de production (workflows) et savoir-faire développés ou configurés pour l'exécution des services.

6.3 Référence commerciale
Sauf refus exprès notifié par écrit par le Client, VIRAE se réserve le droit de mentionner le nom ou la marque du Client, ainsi que d'utiliser de courts extraits des vidéos réalisées (avant/après) à titre de référence commerciale et de démonstration sur son site internet ou ses réseaux professionnels.

ARTICLE 7 : RESPONSABILITÉ ET LIMITATIONS
7.1 Obligations de moyens
Compte tenu de la nature technologique et évolutive des outils d'Intelligence Artificielle générative, VIRAE est soumis à une obligation de moyens et non de résultat. VIRAE déploie ses meilleurs efforts pour atteindre une qualité visuelle et sonore optimale, mais ne peut garantir une perfection absolue ou une indétectabilité totale de l'usage de technologies de synthèse.

7.2 Limitation de responsabilité
La responsabilité totale de VIRAE pour tout dommage direct lié à l'exécution d'une commande est strictement limitée au montant total HT effectivement payé par le Client pour la commande en question. VIRAE ne pourra en aucun cas être tenu responsable des dommages indirects subis par le Client (perte de chance, baisse d'audience, démonétisation par une plateforme tierce comme YouTube ou TikTok, ou perte de chiffre d'affaires).

ARTICLE 8 : ABSENCE DE DROIT DE RÉTRACTATION (B2B)
Conformément au Code de commerce et s'agissant de contrats conclus exclusivement entre professionnels, le Client ne bénéficie d'aucun droit de rétractation. De surcroît, s'agissant de la fourniture de contenus numériques hautement personnalisés et confectionnés selon les spécifications strictes du Client, aucun droit de rétractation ne s'applique.

ARTICLE 9 : DROIT APPLICABLE ET ATTRIBUTION DE JURIDICTION
Les présentes CGV et les opérations qui en découlent sont régies par le droit français.
En cas de litige relatif à la validité, l'interprétation ou l'exécution des présentes conditions, et à défaut d'accord amiable entre les parties, le Tribunal de Commerce de Paris sera seul compétent, nonobstant pluralité de défendeurs ou appel en garantie.`;

  return (
    <LegalPage title="Conditions Générales" id="tarifs_legaux" onBack={onBack} setView={setView}>
      {cgvContent}
    </LegalPage>
  );
};
