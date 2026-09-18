import { LandProcedure, Professional, TrackingDossier } from '../types';

/**
 * PROCÉDURES FONCIÈRES AU CAMEROUN (MINDCAF)
 */
export const LAND_PROCEDURES: LandProcedure[] = [
  {
    id: 'immatriculation-directe',
    name: 'Immatriculation Directe (Domaine National)',
    shortDescription: 'Pour transformer une terre coutumière ou occupée de longue date en Titre Foncier inattaquable.',
    legalReference: 'Décret n° 2005/481 du 16 décembre 2005 modifiant le décret 76-165',
    averageTotalTime: '6 à 18 mois (selon localité et réactivité)',
    steps: [
      {
        number: 1,
        title: 'Dépôt de la demande à la Sous-Préfecture',
        institution: 'Sous-Préfecture du lieu de situation de l\'immeuble',
        actor: 'Demandeur & Sous-Préfet',
        duration: '1 à 3 semaines',
        description: 'Constitution du dossier de demande en 4 exemplaires timbrés, avec plan de situation approximatif, copie CNI et déclaration sur l\'honneur d\'occupation coutumière effective.',
        requiredDocuments: [
          'Demande timbrée au tarif fiscal légal (1 500 FCFA)',
          'Photocopie certifiée conforme de la CNI',
          'Plan de situation sommaire de la parcelle',
          'Attestation de notoriété ou d\'abandon coutumier (facultatif mais recommandé)'
        ],
        officialCostInfo: 'Frais de timbre fiscal + quittance de dépôt administrative (tarifs légaux).',
        vigilanceAdvice: 'Exigez impérativement un récépissé de dépôt daté et paraphé avec le numéro d\'enregistrement officiel.',
        isCrucial: false
      },
      {
        number: 2,
        title: 'Arrêté de convocation de la Commission Consultative',
        institution: 'Sous-Préfecture & Délégation Départementale MINDCAF',
        actor: 'Sous-Préfet (Président de commission)',
        duration: '30 jours environ',
        description: 'Le Sous-Préfet fixe la date de descente sur le terrain par arrêté public, affiché à la sous-préfecture et à la chefferie traditionnelle concernée.',
        requiredDocuments: [
          'Avis au public signé du Sous-Préfet',
          'Lettres de convocation aux 4 propriétaires limitrophes'
        ],
        officialCostInfo: 'Gratuit (affichage public légal).',
        vigilanceAdvice: 'Vérifiez vous-même que les voisins limitrophes ont bien reçu leur convocation au moins 15 jours à l\'avance pour éviter toute contestation ultérieure.',
        isCrucial: false
      },
      {
        number: 3,
        title: 'Descente sur le terrain & Bornage contradictoire',
        institution: 'Sur la parcelle (Commission Consultative)',
        actor: 'Sous-Préfet, Géomètre du Cadastre, Chef de village & Notables, Voisins',
        duration: '1 journée (visite de terrain)',
        description: 'La commission vérifie la mise en valeur effective (arbres fruitiers, cultures, constructions, tombes) et procède à l\'implantation physique des bornes en béton marquées MINDCAF.',
        requiredDocuments: [
          'Bornes homologuées en béton',
          'Procès-verbal de bornage contradictoire dressé séance tenante'
        ],
        officialCostInfo: 'Frais forfaitaires de transport et de bornage fixés par barème MINDCAF.',
        vigilanceAdvice: 'ÉTAPE LA PLUS SENSIBLE : Si un voisin refuse de signer le PV de bornage, l\'opposition doit être consignée séance tenante sur le procès-verbal pour être arbitrée.',
        isCrucial: true
      },
      {
        number: 4,
        title: 'Élaboration du Plan de Bornage définitif',
        institution: 'Service Départemental du Cadastre (MINDCAF)',
        actor: 'Chef de Brigade du Cadastre / Géomètre assermenté',
        duration: '30 à 45 jours',
        description: 'Traitement des données topographiques GPS, calcul des coordonnées polygonales, vérification de non-chevauchement avec les titres fonciers existants.',
        requiredDocuments: [
          'Carnet de terrain du géomètre',
          'Plan de bornage régulier coté à l\'échelle'
        ],
        officialCostInfo: 'Redevance cadastrale réglementaire.',
        vigilanceAdvice: 'Assurez-vous que le plan porte la signature du Chef de Service Départemental du Cadastre et son cachet nominatif.',
        isCrucial: false
      },
      {
        number: 5,
        title: 'Publication au Bulletin des Avis Domaniaux et Fonciers (BADF)',
        institution: 'Délégation Régionale du MINDCAF',
        actor: 'Délégué Régional du MINDCAF',
        duration: '30 jours (délai légal de purge des oppositions)',
        description: 'Publication de l\'avis de clôture de bornage dans le BADF officiel afin de permettre à tout tiers de faire valoir ses droits ou oppositions.',
        requiredDocuments: [
          'Numéro de parution du BADF affiché',
          'Certificat d\'affichage public'
        ],
        officialCostInfo: 'Frais d\'insertion légale au bulletin officiel.',
        vigilanceAdvice: 'Passé le délai de 30 jours sans opposition recevable formulée par exploit d\'huissier ou lettre au Préfet, le dossier est réputé purgé de tout recours.',
        isCrucial: true
      },
      {
        number: 6,
        title: 'Transmission au Préfet & Arrêté d\'Immatriculation',
        institution: 'Préfecture du Département',
        actor: 'Préfet du Département',
        duration: '30 à 60 jours',
        description: 'Examen de conformité juridique du dossier complet par les services préfectoraux et signature de l\'arrêté préfectoral portant immatriculation.',
        requiredDocuments: [
          'Dossier technique complet visé par la délégation régionale',
          'Certificat de non-opposition délivré par le MINDCAF'
        ],
        officialCostInfo: 'Aucun frais supplémentaire hors droits d\'enregistrement.',
        vigilanceAdvice: 'Notez bien le numéro d\'enregistrement du bordereau d\'envoi entre la préfecture et le livre foncier.',
        isCrucial: false
      },
      {
        number: 7,
        title: 'Confection du Titre Foncier & Remise du Duplicata',
        institution: 'Conservation Foncière Départementale (MINDCAF)',
        actor: 'Conservateur de la Propriété Foncière',
        duration: '30 jours',
        description: 'Inscription définitive au Grand Livre foncier, attribution du numéro unique de Titre Foncier, confection du duplicata cartonné officiel remis au propriétaire.',
        requiredDocuments: [
          'Arrêté préfectoral original',
          'Quittance de paiement des redevances foncières au Trésor Public'
        ],
        officialCostInfo: 'Droits d\'immatriculation au Trésor (environ 2% de la valeur mercuriale légale).',
        vigilanceAdvice: 'Vérifiez minutieusement l\'orthographe exacte de vos nom et prénoms, la date de naissance, et le numéro de CNI sur le titre final.',
        isCrucial: true
      }
    ]
  },
  {
    id: 'mutation-vente-titre',
    name: 'Achat d\'un terrain déjà titré (Mutation Notariée)',
    shortDescription: 'Pour acquérir une parcelle déjà couverte par un Titre Foncier existant auprès d\'un propriétaire régulier.',
    legalReference: 'Article 8 du Décret n° 76-165 et Code Général des Impôts camerounais',
    averageTotalTime: '2 à 4 mois',
    steps: [
      {
        number: 1,
        title: 'Réquisition du Certificat de Propriété récent',
        institution: 'Conservation Foncière (MINDCAF)',
        actor: 'Notaire ou Acquéreur diligent',
        duration: '3 à 10 jours',
        description: 'Retrait du certificat de propriété datant de moins de 3 mois pour vérifier que le vendeur est bien l\'unique propriétaire et qu\'aucune hypothèque ou prénotation n\'existe.',
        requiredDocuments: ['Demande timbrée', 'Copie du numéro de titre foncier'],
        officialCostInfo: 'Timbre fiscal (1 500 FCFA) + redevance de conservation.',
        vigilanceAdvice: 'N\'acceptez JAMAIS un certificat de propriété fourni par le vendeur sans confirmation directe auprès de la conservation.',
        isCrucial: true
      },
      {
        number: 2,
        title: 'Dossier Technique de Morcellement (si achat partiel)',
        institution: 'Service du Cadastre & Géomètre assermenté OGC',
        actor: 'Géomètre-Expert inscrit à l\'OGC',
        duration: '2 à 4 semaines',
        description: 'Si vous n\'achetez qu\'une fraction du terrain (ex: 500 m² sur 2 000 m²), le géomètre doit établir un dossier technique de morcellement visé par le Cadastre.',
        requiredDocuments: ['Plan de morcellement', 'Procès-verbal de délimitation'],
        officialCostInfo: 'Honoraires du géomètre selon barème OGC + visa cadastral.',
        vigilanceAdvice: 'Exigez le visa de la délégation départementale du cadastre sur le plan de lotissement / morcellement.',
        isCrucial: true
      },
      {
        number: 3,
        title: 'Signature de l\'Acte de Vente Authentique',
        institution: 'Étude Notariale',
        actor: 'Notaire titulaire de charge, Vendeur (et conjoint si marié), Acquéreur',
        duration: '1 à 2 semaines',
        description: 'Rédaction et signature de l\'acte authentique de vente. Les fonds sont déposés sur le compte séquestre du notaire, qui assure les déclarations fiscales.',
        requiredDocuments: [
          'CNI de l\'acheteur et du vendeur',
          'Acte de mariage ou célibat du vendeur',
          'Certificat de propriété récent',
          'Duplicata original du titre foncier'
        ],
        officialCostInfo: 'Droits d\'enregistrement fiscal (5%) + honoraires notariés réglementés.',
        vigilanceAdvice: 'Toute vente de terrain titré passée sous seing privé (hors notaire) est NULLE de plein droit selon la loi camerounaise.',
        isCrucial: true
      },
      {
        number: 4,
        title: 'Dépôt à la Conservation Foncière & Mutation',
        institution: 'Conservation Foncière (MINDCAF)',
        actor: 'Notaire & Conservateur foncier',
        duration: '30 à 60 jours',
        description: 'Le notaire transmet l\'acte enregistré au conservateur pour radiation du vendeur et inscription de l\'acquéreur, ou création d\'un nouveau titre dérivé.',
        requiredDocuments: ['Grosse notariée enregistrée', 'Bordereau fiscal', 'Ancien titre foncier'],
        officialCostInfo: 'Droits de mutation foncière au Trésor Public.',
        vigilanceAdvice: 'Suivez le numéro de réquisition notariée jusqu\'à la remise physique de votre propre duplicata de titre foncier.',
        isCrucial: false
      }
    ]
  }
];

/**
 * PROFESSIONNELS AGRÉÉS (ANNUAIRE FICTIF ET CRÉDIBLE)
 */
export const PROFESSIONALS_DIRECTORY: Professional[] = [
  {
    id: 'pro-1',
    name: 'Cabinet Notarial Me Atangana & Associés',
    role: 'Notaire',
    city: 'Yaoundé',
    region: 'Centre',
    orderNumber: 'CNNC-YDE-042',
    isCertified: true,
    rating: 4.9,
    reviewCount: 38,
    phone: '+237 677 45 12 80',
    email: 'contact@etude-atangana.cm',
    address: 'Avenue Kennedy, Immeuble Horizon, 3e étage, Yaoundé',
    experienceYears: 18,
    specialities: ['Vente immobilière', 'Mutation de titre', 'Successions foncières', 'Séquestre']
  },
  {
    id: 'pro-2',
    name: 'Ing. Tchamda Fopa Narcisse',
    role: 'Géomètre-Expert',
    city: 'Douala',
    region: 'Littoral',
    orderNumber: 'OGC-DLA-118',
    isCertified: true,
    rating: 4.8,
    reviewCount: 45,
    phone: '+237 699 30 77 15',
    email: 'cabinet.tchamda.topo@gmail.com',
    address: 'Boulevard de la Liberté, Akwa (face Direction Régionale Cadastre), Douala',
    experienceYears: 14,
    specialities: ['Bornage contradictoire', 'Dossier technique de morcellement', 'Récolement GPS', 'Levé topographique']
  },
  {
    id: 'pro-3',
    name: 'Maître Bikélé Marie-Noëlle',
    role: 'Avocat Foncier',
    city: 'Douala',
    region: 'Littoral',
    orderNumber: 'BARREAU-CMR-842',
    isCertified: true,
    rating: 4.7,
    reviewCount: 29,
    phone: '+237 675 88 90 23',
    email: 'm.bikele.avocat@justice.cm',
    address: 'Rue Pau, Bonanjo, Douala',
    experienceYears: 12,
    specialities: ['Contentieux des doubles ventes', 'Annulation de faux titres', 'Opposition préfectorale', 'Purge de litiges']
  },
  {
    id: 'pro-4',
    name: 'Cabinet de Géométrie & Expertise Urbaine (Kribi)',
    role: 'Géomètre-Expert',
    city: 'Kribi',
    region: 'Sud',
    orderNumber: 'OGC-SUD-074',
    isCertified: true,
    rating: 4.9,
    reviewCount: 22,
    phone: '+237 694 21 09 63',
    email: 'kribi.topo.expert@cmr.cm',
    address: 'Carrefour Kingué, Kribi Ville',
    experienceYears: 16,
    specialities: ['Terrains littoraux', 'Vérification servitude maritime', 'Délimitation domaine national']
  },
  {
    id: 'pro-5',
    name: 'Étude Notariale Me Kouam Simo Victor',
    role: 'Notaire',
    city: 'Bafoussam',
    region: 'Ouest',
    orderNumber: 'CNNC-BAF-019',
    isCertified: true,
    rating: 4.8,
    reviewCount: 31,
    phone: '+237 674 15 44 90',
    email: 'etude.kouam.bafoussam@notaires.cm',
    address: 'Quartier Administratif, près du Tribunal de Première Instance, Bafoussam',
    experienceYears: 20,
    specialities: ['Transactions agricoles', 'Immatriculations coutumières', 'Actes de vente authentiques']
  },
  {
    id: 'pro-6',
    name: 'Me Ndifor Emmanuel Tita',
    role: 'Avocat Foncier',
    city: 'Bamenda / Buea',
    region: 'Nord-Ouest / Sud-Ouest',
    orderNumber: 'BARREAU-CMR-633',
    isCertified: true,
    rating: 4.6,
    reviewCount: 19,
    phone: '+237 671 90 32 11',
    email: 'ndifor.chambers@law.cm',
    address: 'Commercial Avenue, Bamenda / Agency Buea Station',
    experienceYears: 11,
    specialities: ['Common Law land registry', 'Certificate of Occupancy', 'Boundary disputes']
  },
  {
    id: 'pro-7',
    name: 'Cabinet Topo-Cadastre du Nord (Garoua)',
    role: 'Géomètre-Expert',
    city: 'Garoua',
    region: 'Nord',
    orderNumber: 'OGC-NORD-031',
    isCertified: true,
    rating: 4.7,
    reviewCount: 17,
    phone: '+237 696 44 81 22',
    email: 'topo.garoua.expert@cadastre.cm',
    address: 'Avenue des Banques, Centre-ville, Garoua',
    experienceYears: 15,
    specialities: ['Bornage périmètre pastoral', 'Lotissements communaux', 'Dossiers MINDCAF Nord']
  }
];

/**
 * DOSSIERS EXEMPLES POUR LE TABLEAU DE BORD
 */
export const SAMPLE_DOSSIER: TrackingDossier = {
  id: 'dossier-001',
  code: 'MINDCAF-YDE-2024-0892',
  title: 'Demande de Titre Foncier — Parcelle Olembé',
  applicantName: 'M. Jean-Baptiste Njoya',
  locality: 'Olembé Nord (Secteur Stade)',
  region: 'Centre',
  department: 'Mfoundi',
  targetArea: '750 m²',
  startDate: '14 Mars 2024',
  procedureType: 'Immatriculation directe (Domaine National de 1ère catégorie)',
  currentStepIndex: 3,
  steps: [
    {
      id: 'step-1',
      name: 'Dépôt du dossier timbré à la Sous-Préfecture',
      authority: 'Sous-Préfecture de Yaoundé 1er',
      isCompleted: true,
      isCurrent: false,
      completionDate: '20 Mars 2024',
      targetDuration: '15 jours',
      notes: 'Récépissé N° 142/SP-YDE1 dûment visé et archivé.'
    },
    {
      id: 'step-2',
      name: 'Publication de l\'arrêté de convocation de la commission',
      authority: 'Sous-Préfecture & Chefferie d\'Olembé',
      isCompleted: true,
      isCurrent: false,
      completionDate: '28 Avril 2024',
      targetDuration: '30 jours',
      notes: 'Affichage public constaté par huissier de justice.'
    },
    {
      id: 'step-3',
      name: 'Descente sur les lieux & Bornage contradictoire',
      authority: 'Commission Consultative & Cadastre',
      isCompleted: true,
      isCurrent: false,
      completionDate: '15 Juin 2024',
      targetDuration: '1 jour',
      notes: 'Procès-verbal de bornage signé sans opposition par les 4 voisins limitrophes.'
    },
    {
      id: 'step-4',
      name: 'Dossier Technique & Visa du Service du Cadastre',
      authority: 'Délégation Départementale du Cadastre du Mfoundi',
      isCompleted: false,
      isCurrent: true,
      targetDuration: '45 jours',
      notes: 'En cours de calcul au bureau des calculs topographiques. Rendez-vous de suivi prévu vendredi.'
    },
    {
      id: 'step-5',
      name: 'Publication de l\'avis au Bulletin des Avis Domaniaux (BADF)',
      authority: 'Délégation Régionale MINDCAF du Centre',
      isCompleted: false,
      isCurrent: false,
      targetDuration: '30 jours',
      notes: 'En attente de transmission après visa du plan.'
    },
    {
      id: 'step-6',
      name: 'Signature de l\'Arrêté Préfectoral d\'immatriculation',
      authority: 'Préfecture du Département du Mfoundi',
      isCompleted: false,
      isCurrent: false,
      targetDuration: '45 jours',
      notes: 'Examen de la conformité juridique.'
    },
    {
      id: 'step-7',
      name: 'Délivrance du Duplicata cartonné du Titre Foncier',
      authority: 'Conservation Foncière du Mfoundi',
      isCompleted: false,
      isCurrent: false,
      targetDuration: '30 jours',
      notes: 'Paiement de la redevance au Trésor et remise en mains propres.'
    }
  ],
  attachedDocs: [
    { name: 'Copie certifiée conforme CNI (valide jusqu\'en 2028)', status: 'valid' },
    { name: 'Récépissé de dépôt sous-préfecture N° 142', status: 'valid' },
    { name: 'Procès-verbal de bornage contradictoire paraphé', status: 'valid' },
    { name: 'Plan cadastral côté provisoire', status: 'valid' },
    { name: 'Quittance de paiement des frais de bornage MINDCAF', status: 'valid' },
    { name: 'Avis d\'insertion au BADF (en attente)', status: 'pending' }
  ],
  alerts: [
    'Rappel : Le dossier est à l\'étape cadastrale depuis 28 jours. Prévoyez une relance auprès de la brigade topographique pour éviter les lenteurs administratives.',
    'Assurez-vous de conserver précieusement l\'original du récépissé de dépôt sous-préfectoral dans un classeur étanche.'
  ]
};

/**
 * LES 4 PRINCIPALES FRAUDES FONCIÈRES AU CAMEROUN
 */
export const COMMON_FRAUDS = [
  {
    id: 'f1',
    title: 'La double vente par photocopie de titre',
    tag: 'Arnaque la plus répandue',
    summary: 'Le vendeur présente la copie d\'un titre foncier authentique mais qu\'il a déjà vendu à un tiers, morcelé ou mis en hypothèque.',
    defense: 'Ne signez jamais sans un Certificat de Propriété de moins de 3 mois retiré directement à la conservation foncière par votre notaire.'
  },
  {
    id: 'f2',
    title: 'La vente d\'un "abandon coutumier" sans titre',
    tag: 'Illégalité juridique',
    summary: 'Vente d\'une parcelle sur le Domaine National avec un simple reçu de chefferie. L\'acheteur pense être propriétaire alors que la terre appartient à l\'État.',
    defense: 'Comprenez que seul le Titre Foncier délivré par le MINDCAF confère la propriété. Le papier coutumier n\'est qu\'une étape de départ.'
  },
  {
    id: 'f3',
    title: 'Le faux géomètre non inscrit à l\'OGC',
    tag: 'Fraude technique',
    summary: 'Des individus se font passer pour des géomètres, posent de fausses bornes en ciment qui ne correspondent à aucun plan officiel cadastral.',
    defense: 'Exigez toujours le numéro d\'inscription à l\'Ordre des Géomètres du Cameroun (OGC) et vérifiez le visa de la délégation du cadastre.'
  },
  {
    id: 'f4',
    title: 'La vente d\'un terrain successoral litigieux',
    tag: 'Litige familial',
    summary: 'Un des enfants vend le terrain familial sans le consentement des cohéritiers ou sans jugement d\'hérédité définitif.',
    defense: 'Exigez l\'ordonnance d\'ouverture de succession, le jugement d\'hérédité et la signature conjointe de tous les héritiers chez le notaire.'
  }
];
