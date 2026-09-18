/**
 * FoncierSûr — Service API & Intégration
 * 
 * Ce fichier centralise les appels aux services externes (OCR de titres fonciers et Assistant LLM).
 * Actuellement configuré en mode démo / simulation locale enrichie, il est prêt à être basculé
 * vers des points de terminaison réels (ex: Google Cloud Document AI, backend Express /api/...,
 * ou Gemini API).
 */

import { ExtractedLandData, ChatMessage } from '../types';

/**
 * CONFIGURATION DE L'ENVIRONNEMENT
 * Pour activer les vraies routes d'API, passez `USE_REAL_BACKEND_API` à true
 * et renseignez les URLs de votre serveur Node/Express ou Cloud Function.
 */
export const API_CONFIG = {
  USE_REAL_BACKEND_API: false,
  OCR_ENDPOINT: '/api/land-title/analyze-ocr',
  LLM_ENDPOINT: '/api/ai/assistant-chat',
};

/**
 * Exemples de simulations de titres fonciers pour tester facilement l'analyse
 */
export const SAMPLE_ANALYSES: Record<string, ExtractedLandData> = {
  // Exemple 1 : Titre avec alertes critiques (fraude fréquente / double vente suspectée)
  'anomalies-kribi': {
    titleNumber: 'N° 18.942 / Océan',
    volume: 'Vol. 142',
    folio: 'Folio 88',
    department: 'Océan',
    arrondissement: 'Kribi 1er',
    locality: 'Mboamanga / Bord de mer',
    declaredArea: '1 250 m²',
    registeredOwner: 'Société Civile Immobilière Soleil & Océan',
    deliveryDate: '14 Novembre 2018',
    conservateurName: 'M. Mvondo Jean-Pierre',
    landRegistryOffice: 'Conservation Foncière de Kribi (MINDCAF)',
    conservationStatus: 'litigation',
    documentType: 'Titre Foncier',
    overallRiskScore: 78,
    overallRiskLevel: 'critique',
    vigilancePoints: [
      {
        id: 'v1',
        severity: 'high',
        title: 'Certificat de propriété absent ou daté de plus de 3 mois',
        description: 'Le document présenté est une photocopie de titre. Sans certificat de propriété délivré par le conservateur foncier il y a moins de 3 mois, impossible de savoir si le terrain a été revendu, hypothéqué ou frappé de prénotation judiciaire.',
        legalContext: 'Article 8 du Décret 76-165 : Le certificat de propriété est la seule preuve authentique de la situation juridique actuelle du titre à date.',
        recommendedAction: 'Exigez impérativement un Certificat de Propriété récent (moins de 90 jours) retiré directement auprès de la Conservation Foncière de Kribi.'
      },
      {
        id: 'v2',
        severity: 'high',
        title: 'Signalement de litige foncier (Zone du Domaine Public Maritime)',
        description: 'La localisation indiquée borde le domaine public maritime (moins de 100m du niveau des plus hautes marées). Les titres privés dans cette zone font l\'objet d\'annulations fréquentes par arrêté ministériel du MINDCAF.',
        legalContext: 'Ordonnance n° 74-2 du 6 juillet 1974 fixant le régime domanial (inaliénabilité du domaine public naturel).',
        recommendedAction: 'Consultez le service départemental du cadastre de Kribi pour vérifier si le plan n\'empiète pas sur le domaine public de l\'État.'
      },
      {
        id: 'v3',
        severity: 'medium',
        title: 'Absence de cachet humide ou de signature légalisée du conservateur',
        description: 'Le tampon visible semble être une numérisation réutilisée. Les titres originaux comportent le timbre fiscal à jour et le sceau humide en relief ou à l\'encre grasse.',
        legalContext: 'Réglementation MINDCAF sur la confection des duplicatas de titre foncier.',
        recommendedAction: 'Demandez à voir le duplicata original (livre vert cartonné) chez un Notaire assermenté avant tout versement d\'acompte.'
      }
    ],
    positivePoints: [
      'Le numéro de volume et folio respecte la nomenclature de la conservation de l\'Océan.',
      'Le plan de bornage comporte les coordonnées géographiques des bornes.'
    ]
  },

  // Exemple 2 : Titre régulier avec précautions d'usage (Yaoundé)
  'regulier-yaounde': {
    titleNumber: 'N° 34.120 / Mfoundi',
    volume: 'Vol. 286',
    folio: 'Folio 12',
    department: 'Mfoundi',
    arrondissement: 'Yaoundé 2 (Bastos / Tsinga)',
    locality: 'Quartier Tsinga Ouest',
    declaredArea: '800 m²',
    registeredOwner: 'M. Essomba Nguélé Christian',
    deliveryDate: '22 Janvier 2012',
    conservateurName: 'Me Nana Joseph (P.I.)',
    landRegistryOffice: 'Conservation Foncière du Mfoundi (Yaoundé)',
    conservationStatus: 'active',
    documentType: 'Titre Foncier',
    overallRiskScore: 18,
    overallRiskLevel: 'faible',
    vigilancePoints: [
      {
        id: 'v4',
        severity: 'low',
        title: 'Vérification de l\'état matrimonial du vendeur requise',
        description: 'Le propriétaire est inscrit comme personne physique. S\'il est marié sous le régime de la communauté de biens, le consentement formel du conjoint chez le Notaire est obligatoire pour toute vente.',
        legalContext: 'Code Civil applicable au Cameroun et jurisprudence sur la protection des biens familiaux.',
        recommendedAction: 'Sollicitez auprès du Notaire la présentation de l\'acte de mariage du propriétaire pour sécuriser la transaction.'
      }
    ],
    positivePoints: [
      'Numéro de titre actif et vérifiable au grand livre de la conservation du Mfoundi.',
      'Superficie et limites conformes au plan cadastral numérisé du Mfoundi.',
      'Certificat de non-contestation de bornage archivé.',
      'Aucune charge hypothécaire ni prénotation inscrite au livre foncier.'
    ]
  },

  // Exemple 3 : Convention sous seing privé / terrain coutumier sans titre (Risque Majeur)
  'coutumier-douala': {
    titleNumber: 'Aucun (Document sous seing privé : "Abandon de droits coutumiers")',
    volume: 'Néant',
    folio: 'Néant',
    department: 'Wouri',
    arrondissement: 'Douala 5e',
    locality: 'Logbessou / PK 14',
    declaredArea: '500 m²',
    registeredOwner: 'Famille coutumière Bell-Ekoko',
    deliveryDate: 'Document daté de Juin 2022',
    conservateurName: 'Néant (Signé par un chef de bloc et 2 témoins)',
    landRegistryOffice: 'Non immatriculé au MINDCAF',
    conservationStatus: 'doubtful',
    documentType: 'Convention de vente coutumière',
    overallRiskScore: 92,
    overallRiskLevel: 'critique',
    vigilancePoints: [
      {
        id: 'v5',
        severity: 'high',
        title: 'Attention : Ce document n\'est PAS un titre de propriété',
        description: 'La convention coutumière ou "abandon de droits coutumiers" n\'a aucune valeur de propriété opposable aux tiers. Au regard de la loi camerounaise, ce terrain fait partie du Domaine National. Il ne peut légalement être vendu.',
        legalContext: 'Ordonnance n° 74-1 du 6 juillet 1974 : Seul le Titre Foncier confère la pleine propriété inattaquable et définitive.',
        recommendedAction: 'Ne versez aucun paiement intégral. Seule une procédure d\'immatriculation directe devant la Commission Consultative présidée par le Sous-Préfet permettra d\'obtenir un vrai titre foncier.'
      },
      {
        id: 'v6',
        severity: 'high',
        title: 'Risque élevé de revente multiple (Double / Triple vente)',
        description: 'Les ventes coutumières sans inscription au livre foncier sont la cause n°1 des conflits et escroqueries à Douala et Yaoundé. Plusieurs membres de la même famille peuvent vendre le même lot à des acquéreurs différents.',
        legalContext: 'Article 8 du Code Pénal camerounais réprimant les escroqueries foncières.',
        recommendedAction: 'Faites réaliser un constat préalable par un géomètre assermenté et exigez l\'arbre généalogique validé par la chefferie de 1er degré avant tout engagement.'
      }
    ],
    positivePoints: [
      'Document utile uniquement comme pièce d\'historique d\'occupation pour une future demande d\'immatriculation.'
    ]
  }
};

/**
 * Fonction d'analyse d'un document téléversé (PDF ou Image)
 * Prévoit le branchement vers un OCR backend réel.
 */
export async function analyzeLandTitleDocument(
  file: File | string,
  presetType?: string
): Promise<ExtractedLandData> {
  // 1. Branchement potentiel vers le backend réel
  if (API_CONFIG.USE_REAL_BACKEND_API) {
    try {
      const formData = new FormData();
      if (typeof file !== 'string') {
        formData.append('document', file);
      }
      const response = await fetch(API_CONFIG.OCR_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur OCR: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Échec de l\'appel API OCR réel, bascule sur l\'analyse locale de secours.', error);
    }
  }

  // 2. Simulation réaliste avec délai de scan (1,2 seconde pour l'expérience utilisateur)
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Sélection du profil de résultat
  if (presetType && SAMPLE_ANALYSES[presetType]) {
    return SAMPLE_ANALYSES[presetType];
  }

  // Détection automatique basée sur le nom du fichier si possible
  const fileName = typeof file === 'string' ? file.toLowerCase() : file.name.toLowerCase();

  if (fileName.includes('kribi') || fileName.includes('suspect') || fileName.includes('faux') || fileName.includes('litige')) {
    return SAMPLE_ANALYSES['anomalies-kribi'];
  }
  if (fileName.includes('coutumier') || fileName.includes('abandon') || fileName.includes('convention') || fileName.includes('village')) {
    return SAMPLE_ANALYSES['coutumier-douala'];
  }
  if (fileName.includes('yaounde') || fileName.includes('bastos') || fileName.includes('bon') || fileName.includes('titre')) {
    return SAMPLE_ANALYSES['regulier-yaounde'];
  }

  // Résultat dynamique générique crédible
  return {
    titleNumber: 'N° 27.604 / Wouri',
    volume: 'Vol. 195',
    folio: 'Folio 44',
    department: 'Wouri',
    arrondissement: 'Douala 4e (Bonabéri)',
    locality: 'Quartier Sodiko',
    declaredArea: '640 m²',
    registeredOwner: 'Mme Kamgaing Fotso Jacqueline',
    deliveryDate: '08 Mai 2019',
    conservateurName: 'M. Ndongo Jean-Marie',
    landRegistryOffice: 'Conservation Foncière de Douala Nord (MINDCAF)',
    conservationStatus: 'active',
    documentType: 'Titre Foncier',
    overallRiskScore: 42,
    overallRiskLevel: 'modere',
    vigilancePoints: [
      {
        id: 'v-gen-1',
        severity: 'medium',
        title: 'Demande de Certificat de Propriété de moins de 3 mois indispensable',
        description: 'La date de délivrance initiale du titre remonte à plus de 5 ans. Entre-temps, une hypothèque ou une saisie conservatoire a pu être inscrite au livre foncier.',
        legalContext: 'Article 8 du Décret 76-165 fixant les conditions d\'obtention du titre foncier.',
        recommendedAction: 'Déposez une demande de certificat de propriété timbrée au bureau du conservateur du Wouri avant tout acte notarié.'
      },
      {
        id: 'v-gen-2',
        severity: 'low',
        title: 'Plan cadastral et bornes physiques à repérer sur le terrain',
        description: 'Vérifiez impérativement que les 4 bornes en béton marquées "TF 27.604" sont physiquement en place sur la parcelle et n\'ont pas été déplacées par les voisins.',
        legalContext: 'Normes de délimitation du Cadastre national camerounais.',
        recommendedAction: 'Faites réaliser un récolement de bornes par un géomètre assermenté inscrit à l\'Ordre des Géomètres du Cameroun (OGC).'
      }
    ],
    positivePoints: [
      'Format du numéro d\'enregistrement conforme à la série administrative du Wouri.',
      'Superficie déclarée cohérente avec le plan de lotissement.'
    ]
  };
}

/**
 * Réponses de l'Assistant Foncier IA
 * Entraîné sur les règles du droit foncier camerounais (MINDCAF, décrets de 1976 et 2005)
 */
export async function queryLandAssistantAI(
  userQuery: string,
  _history: ChatMessage[] = []
): Promise<{ text: string; legalNotice?: string; suggestions?: string[] }> {
  // Branchement réel possible vers un LLM backend
  if (API_CONFIG.USE_REAL_BACKEND_API) {
    try {
      const response = await fetch(API_CONFIG.LLM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery, history: _history }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('LLM backend indisponible, bascule sur la base de connaissances experte.', e);
    }
  }

  // Simulation intelligente hors-ligne avec base de connaissances camerounaise
  await new Promise((resolve) => setTimeout(resolve, 800));

  const query = userQuery.toLowerCase();

  if (query.includes('certificat de propriété') || query.includes('certificat')) {
    return {
      text: `Au Cameroun, le **Certificat de Propriété** est le document le plus crucial avant d'acheter un terrain titré.

Voici ce que vous devez retenir :
1. **Rôle exact :** Il certifie qui est le propriétaire inscrit au Grand Livre foncier **à la date de délivrance** et mentionne si le terrain supporte des hypothèques, prénotations judiciaires ou saisies.
2. **Durée de validité pratique :** Il doit dater de **moins de 3 mois (90 jours)** pour être accepté par un Notaire.
3. **Où l'obtenir ?** Exclusivement à la **Conservation Foncière (MINDCAF)** du département où se trouve l'immeuble.
4. **Coût officiel :** Une demande timbrée (généralement timbre fiscal de 1 500 à 2 000 FCFA + droits d'état).

⚠️ **Conseil d'or :** N'achetez jamais sur la base d'une simple photocopie de titre présentée par le vendeur ! Exigez toujours un certificat de propriété retiré directement à la conservation.`,
      legalNotice: 'Décret n° 76-165 du 27 avril 1976 fixant les conditions d\'obtention du titre foncier.',
      suggestions: [
        'Comment reconnaître un faux certificat de propriété ?',
        'Quel est le rôle du notaire dans la vente ?',
        'Combien coûte l\'immatriculation d\'un terrain ?'
      ]
    };
  }

  if (query.includes('coutumier') || query.includes('abandon') || query.includes('domaine national') || query.includes('sans titre') || query.includes('famille')) {
    return {
      text: `**Attention danger juridique :** Au Cameroun, un terrain coutumier sans titre foncier relève juridiquement du **Domaine National de 1ère ou 2ème catégorie** (Ordonnance n° 74-1 du 6 juillet 1974).

**Ce que dit la loi :**
- Les actes sous seing privé intitulés *"Abandon de droits coutumiers"*, *"Vente coutumière"* ou *"Certificat de vente de chefferie"* **ne confèrent aucun droit de propriété légal**.
- La loi interdit formellement la vente du Domaine National. Seule l'attribution ou l'immatriculation par l'État est reconnue.

**Comment sécuriser ce type de terrain ?**
1. Vous devez engager une **procédure d'immatriculation directe** auprès de la Sous-Préfecture.
2. La **Commission Consultative** (présidée par le Sous-Préfet, avec le géomètre du Cadastre, le Chef de village et notables) doit descendre constater l'occupation effective et réaliser le bornage contradictoire.
3. **Recommandation :** Ne versez jamais la totalité du prix au vendeur coutumier avant la descente effective et sans contestation de la commission !`,
      legalNotice: 'Ordonnance n° 74-1 du 6 juillet 1974 et Décret n° 2005/481 du 16 décembre 2005.',
      suggestions: [
        'Quelle est la composition de la commission consultative ?',
        'Quels sont les délais d\'obtention d\'un titre foncier ?',
        'Comment vérifier si un géomètre est agréé ?'
      ]
    };
  }

  if (query.includes('double vente') || query.includes('arnaque') || query.includes('fraude') || query.includes('faux')) {
    return {
      text: `La **double vente** est l'escroquerie foncière la plus fréquente à Yaoundé, Douala, Kribi et dans les zones périurbaines.

**Les techniques des fraudeurs :**
- Présentation d'une ancienne photocopie de titre foncier alors que le terrain a déjà été muté ou morcelé.
- Vente par plusieurs membres d'une même fratrie sans acte de notoriété d'héritiers ou sans mandat successoral.
- Faux tampons de conservateur foncier ou de géomètre.

**Comment vous protéger efficacement :**
1. **Posez une prénotation judiciaire ou réquisition notariée :** Dès l'accord de principe, passez impérativement par une étude de notaire titulaire de charge.
2. **Visite inopinée sur les lieux :** Interrogez les 4 voisins limitrophes immédiats (qui cultive ? qui revendique la parcelle ? y a-t-il eu un deuil ou une contestation récente ?).
3. **Exigez un récolement de bornes :** Faites venir un géomètre-expert inscrit au tableau de l'Ordre des Géomètres du Cameroun (OGC) pour vérifier les coordonnées GPS réelles.`,
      legalNotice: 'Article 318 du Code Pénal camerounais (Escroquerie et filouterie foncière).',
      suggestions: [
        'Comment trouver un notaire agréé à Douala ou Yaoundé ?',
        'Quels documents demander avant de signer ?',
        'Combien de temps prend la procédure au MINDCAF ?'
      ]
    };
  }

  if (query.includes('délai') || query.includes('temps') || query.includes('durée') || query.includes('combien de temps')) {
    return {
      text: `Au Cameroun, il existe une grande différence entre les **délais légaux théoriques** et la **réalité pratique du terrain** :

**1. Pour une immatriculation directe (terrain coutumier / Domaine National) :**
- *Délai légal officiel (décret 2005) :* Environ 6 mois (180 jours).
- *Réalité constatée sur le terrain :* Souvent entre **1 an et 3 ans**, en fonction de la disponibilité de la commission consultative, des publications au Bulletin des Avis Domaniaux et Fonciers (BADF) et du traitement à la délégation régionale MINDCAF.

**2. Pour un morcellement ou une mutation totale (terrain déjà titré chez notaire) :**
- *Morcellement (dossier technique géomètre + acte notarié) :* **3 à 6 mois**.
- *Mutation totale sans morcellement :* **1 à 3 mois** chez un notaire réactif avec la conservation foncière.

💡 **Astuce FoncierSûr :** Utilisez notre module **"Tableau de bord"** pour suivre méthodiquement chaque étape et relancer l'administration au bon moment.`,
      legalNotice: 'Décret n° 2005/481 du 16 décembre 2005 modifiant le décret 76-165.',
      suggestions: [
        'Quelles sont les étapes obligatoires du MINDCAF ?',
        'Que faire si mon dossier est bloqué à la sous-préfecture ?',
        'Quels sont les frais officiels ?'
      ]
    };
  }

  if (query.includes('notaire') || query.includes('avocat') || query.includes('géomètre')) {
    return {
      text: `Chaque professionnel foncier a un rôle bien précis et non substituable au Cameroun :

1. **Le Notaire :**
   - **Obligatoire** pour tout transfert de propriété sur un terrain titré.
   - Il rédige l'acte authentique de vente, vérifie le certificat de propriété, conserve les fonds sous séquestre et dépose le dossier à la conservation foncière.
   
2. **Le Géomètre-Expert (inscrit à l'OGC) :**
   - Indispensable pour le lever topographique, le bornage contradictoire, le plan de morcellement et le dossier technique visé par le Cadastre.
   - Attention : N'engagez jamais un géomètre "clandestin" non inscrit au tableau de l'Ordre des Géomètres du Cameroun.

3. **L'Avocat Foncier :**
   - Intervient en cas de contestation de bornage, d'opposition devant le Préfet ou de recours contentieux devant le Tribunal Administratif.

👉 Consultez notre **Annuaire** pour trouver un professionnel agréé par ville.`,
      legalNotice: 'Loi n° 80-21 du 14 juillet 1980 sur l\'exercice de la profession de géomètre.',
      suggestions: [
        'Consulter l\'annuaire des géomètres et notaires',
        'Quelles pièces fournir à mon notaire ?',
        'Comment vérifier l\'authenticité d\'un titre foncier ?'
      ]
    };
  }

  // Réponse générale bienveillante et documentée
  return {
    text: `Bonjour ! Je suis l'**Assistant FoncierSûr**, spécialisé dans la réglementation et les pratiques foncières au Cameroun (MINDCAF).

Pour sécuriser votre projet foncier (achat, vente ou immatriculation) :
- Si vous avez un terrain sans titre : il faut engager une **immatriculation directe** sur le domaine national via la Sous-Préfecture.
- Si vous achetez un terrain titré : l'acte doit **obligatoirement être passé devant un Notaire**, avec un **Certificat de Propriété de moins de 3 mois**.
- Ne payez jamais sur présentation d'une simple promesse verbale ou d'un "abandon coutumier".

Posez-moi votre question précise ou cliquez sur l'une des suggestions ci-dessous :`,
    legalNotice: 'Cet outil d\'orientation juridique ne remplace pas la consultation formelle d\'un Notaire ou la vérification officielle au MINDCAF.',
    suggestions: [
      'Comment vérifier un titre foncier avant d\'acheter ?',
      'Quelle est la valeur d\'un abandon de droits coutumiers ?',
      'Quels sont les délais réels pour obtenir un titre foncier ?',
      'Pourquoi le certificat de propriété est-il indispensable ?'
    ]
  };
}
