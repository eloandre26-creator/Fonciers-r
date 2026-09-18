export type AppPage = 'home' | 'guide' | 'verify' | 'chat' | 'dashboard' | 'directory';

export interface VigilancePoint {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  legalContext: string;
  recommendedAction: string;
}

export interface ExtractedLandData {
  titleNumber: string;
  volume: string;
  folio: string;
  department: string;
  arrondissement: string;
  locality: string;
  declaredArea: string;
  registeredOwner: string;
  deliveryDate: string;
  conservateurName: string;
  landRegistryOffice: string;
  conservationStatus: 'active' | 'litigation' | 'cancelled' | 'doubtful';
  documentType: 'Titre Foncier' | 'Certificat de Propriété' | 'Procès-Verbal de Bornage' | 'Convention de vente coutumière';
  overallRiskScore: number; // 0 to 100 (higher = more alerts)
  overallRiskLevel: 'faible' | 'modere' | 'eleve' | 'critique';
  vigilancePoints: VigilancePoint[];
  positivePoints: string[];
}

export interface ProcedureStep {
  number: number;
  title: string;
  institution: string;
  actor: string;
  duration: string;
  description: string;
  requiredDocuments: string[];
  officialCostInfo: string;
  vigilanceAdvice: string;
  isCrucial: boolean;
}

export interface LandProcedure {
  id: string;
  name: string;
  shortDescription: string;
  legalReference: string;
  averageTotalTime: string;
  steps: ProcedureStep[];
}

export interface Professional {
  id: string;
  name: string;
  role: 'Notaire' | 'Géomètre-Expert' | 'Avocat Foncier';
  city: string;
  region: string;
  orderNumber: string;
  isCertified: boolean;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  address: string;
  experienceYears: number;
  specialities: string[];
}

export interface DossierStep {
  id: string;
  name: string;
  authority: string;
  isCompleted: boolean;
  isCurrent: boolean;
  completionDate?: string;
  targetDuration: string;
  notes?: string;
}

export interface TrackingDossier {
  id: string;
  code: string;
  title: string;
  applicantName: string;
  locality: string;
  region: string;
  department: string;
  targetArea: string;
  startDate: string;
  procedureType: string;
  currentStepIndex: number;
  steps: DossierStep[];
  attachedDocs: { name: string; status: 'valid' | 'pending' | 'missing' }[];
  alerts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  legalNotice?: string;
}
