import { useState } from 'react';
import { LAND_PROCEDURES } from '../data/mockData';
import { Timeline } from '../components/Timeline';
import { AppPage } from '../types';
import { 
  ClipboardList, 
  HelpCircle, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Building2, 
  Scale, 
  Coins, 
  FileSearch,
  CheckCircle,
  Download
} from 'lucide-react';

interface GuidePageProps {
  onNavigate: (page: AppPage) => void;
}

export function GuidePage({ onNavigate }: GuidePageProps) {
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>('immatriculation-directe');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const currentProcedure = LAND_PROCEDURES.find((p) => p.id === selectedProcedureId) || LAND_PROCEDURES[0];

  const handlePrintChecklist = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 300);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* En-tête de la page */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Guide Officiel MINDCAF
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            Décrets N° 76-165 & 2005/481
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Guide pas à pas des démarches de Titre Foncier au Cameroun
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Comprendre chaque étape de la procédure administrative, anticiper les pièces requises et connaître vos droits face aux délais et aux frais officiels.
        </p>

        {/* Notice légale visible */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-200 text-xs flex items-start gap-2.5 border border-emerald-800">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Mention d'information civique :</strong> Cet outil aide à la compréhension et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF ou l'intervention de votre Notaire.
          </div>
        </div>
      </div>

      {/* Sélecteur de type de procédure */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Sélectionnez la situation correspondant à votre projet :
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LAND_PROCEDURES.map((proc) => {
            const isSelected = proc.id === selectedProcedureId;
            return (
              <button
                key={proc.id}
                onClick={() => setSelectedProcedureId(proc.id)}
                className={`p-4 rounded-xl text-left border-2 transition-all ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {proc.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {proc.shortDescription}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-emerald-800">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {proc.averageTotalTime}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                    {proc.legalReference}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Résumé des repères clés */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <span className="text-slate-500 font-medium">Autorité initiatrice</span>
          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-700" />
            {selectedProcedureId === 'immatriculation-directe' ? 'Sous-Préfecture & MINDCAF' : 'Étude Notariale & Conservation'}
          </div>
          <p className="text-[11px] text-slate-500">Du lieu où se situe le terrain</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <span className="text-slate-500 font-medium">Délai indicatif moyen</span>
          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-700" />
            {currentProcedure.averageTotalTime}
          </div>
          <p className="text-[11px] text-slate-500">Variable selon purges et recours</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <span className="text-slate-500 font-medium">Document final délivré</span>
          <div className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Duplicata de Titre Foncier
          </div>
          <p className="text-[11px] text-slate-500">Seul titre inattaquable au Cameroun</p>
        </div>
      </div>

      {/* Timeline interactive détaillée */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-700" />
            Étapes séquentielles obligatoires ({currentProcedure.steps.length} étapes)
          </h2>
          <span className="text-xs text-slate-500">Cliquez pour déplier chaque étape</span>
        </div>

        <Timeline 
          steps={currentProcedure.steps}
          procedureName={currentProcedure.name}
          legalReference={currentProcedure.legalReference}
        />
      </div>

      {/* Checklist imprimable & Téléchargeable */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Checklist récapitulative des pièces pour la constitution du dossier
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Imprimez ou conservez cette fiche mémo pour préparer votre descente à la sous-préfecture ou chez le notaire.
            </p>
          </div>

          <button
            onClick={handlePrintChecklist}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Impression en cours...' : 'Imprimer la fiche mémo'}</span>
          </button>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-200">
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
            <span>4 exemplaires de la demande timbrée au tarif légal (1 500 FCFA).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
            <span>Photocopie de la Carte Nationale d'Identité certifiée conforme.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
            <span>Plan de situation de la parcelle côté par un géomètre assermenté.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
            <span>Attestation d'abandon de droits coutumiers avec visa de la chefferie.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">5</span>
            <span>Procès-verbal de bornage contradictoire signé de la commission.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">6</span>
            <span>Quittance du Trésor Public pour le règlement de la redevance foncière.</span>
          </div>
        </div>
      </div>

      {/* Orientation vers l'analyse de titre */}
      <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-slate-900">Vous possédez déjà un document à contrôler ?</h4>
          <p className="text-xs text-slate-600">
            Passez votre document au crible de notre simulateur de pré-vérification pour détecter les risques d'anomalies.
          </p>
        </div>
        <button
          onClick={() => onNavigate('verify')}
          className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition shrink-0 flex items-center gap-1.5"
        >
          <FileSearch className="w-4 h-4" />
          <span>Vérifier mon titre</span>
        </button>
      </div>

    </div>
  );
}
