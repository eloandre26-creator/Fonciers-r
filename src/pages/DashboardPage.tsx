import { useState } from 'react';
import { SAMPLE_DOSSIER } from '../data/mockData';
import { TrackingDossier, DossierStep, AppPage } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Building2, 
  Calendar, 
  User, 
  Sparkles,
  Plus,
  RefreshCw,
  Bell,
  ArrowRight
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: AppPage) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [dossier, setDossier] = useState<TrackingDossier>(SAMPLE_DOSSIER);
  const [activeTab, setActiveTab] = useState<'steps' | 'documents' | 'alerts'>('steps');

  // Basculer l'état d'une étape pour simuler l'avancement
  const handleToggleStep = (stepId: string) => {
    setDossier((prev) => {
      const updatedSteps = prev.steps.map((s) => {
        if (s.id === stepId) {
          const newCompleted = !s.isCompleted;
          return {
            ...s,
            isCompleted: newCompleted,
            completionDate: newCompleted ? new Date().toLocaleDateString('fr-FR') : undefined
          };
        }
        return s;
      });

      return {
        ...prev,
        steps: updatedSteps
      };
    });
  };

  const completedCount = dossier.steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / dossier.steps.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* En-tête du Tableau de Bord */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Espace Usager • Suivi de Procédure
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            Sous-Préfecture & MINDCAF
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tableau de bord de suivi de dossier
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Visualisez l'état d'avancement de votre demande de Titre Foncier, cochez les étapes franchies et anticipez les relances.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-mono font-semibold rounded-md border border-slate-300">
              {dossier.code}
            </span>
          </div>
        </div>

        {/* Mention institutionnelle visible */}
        <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 text-xs flex items-start gap-2.5 border border-emerald-800">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Information usager :</strong> Cet outil aide à la pré-vérification, à la traçabilité personnelle et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF ou du conservateur foncier.
          </div>
        </div>
      </div>

      {/* Carte d'identité du dossier suivi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Titre du dossier</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{dossier.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              En cours d'instruction
            </span>
          </div>
        </div>

        {/* Grille des caractéristiques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Demandeur
            </span>
            <p className="font-bold text-slate-900">{dossier.applicantName}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Localisation
            </span>
            <p className="font-bold text-slate-900">{dossier.locality} ({dossier.department})</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Superficie visée
            </span>
            <p className="font-bold text-slate-900">{dossier.targetArea}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Date d'engagement
            </span>
            <p className="font-bold text-slate-900">{dossier.startDate}</p>
          </div>
        </div>

        {/* Barre de progression globale */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Progression des étapes d'immatriculation :</span>
            <span className="font-bold text-emerald-800">{completedCount} sur {dossier.steps.length} étapes validées ({progressPercent}%)</span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Onglets de gestion */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('steps')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'steps'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Étapes séquentielles ({dossier.steps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'documents'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Pièces déposées ({dossier.attachedDocs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'alerts'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Rappels & Alertes ({dossier.alerts.length})</span>
        </button>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Cliquez sur une case pour cocher ou décocher une étape :</span>
            <span className="text-emerald-700 font-medium">Interactif</span>
          </div>

          <div className="space-y-3">
            {dossier.steps.map((step, idx) => {
              return (
                <div
                  key={step.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    step.isCompleted
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : step.isCurrent
                      ? 'bg-white border-amber-400 shadow-xs ring-2 ring-amber-300/30'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox de validation */}
                      <button
                        type="button"
                        onClick={() => handleToggleStep(step.id)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition border ${
                          step.isCompleted
                            ? 'bg-emerald-600 border-emerald-700 text-white'
                            : 'bg-white border-slate-300 hover:border-emerald-600 text-transparent'
                        }`}
                        title={step.isCompleted ? 'Marquer comme non effectuée' : 'Marquer comme validée'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            Étape {idx + 1}
                          </span>
                          {step.isCurrent && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Étape en cours
                            </span>
                          )}
                          {step.completionDate && (
                            <span className="text-xs text-emerald-700 font-medium">
                              Validée le {step.completionDate}
                            </span>
                          )}
                        </div>

                        <h4 className={`text-base font-bold ${
                          step.isCompleted ? 'text-slate-700 line-through decoration-emerald-600' : 'text-slate-900'
                        }`}>
                          {step.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                          <span className="flex items-center gap-1 text-slate-700">
                            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                            {step.authority}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            Délai indicatif : {step.targetDuration}
                          </span>
                        </div>

                        {step.notes && (
                          <p className="text-xs text-slate-600 bg-slate-100/70 p-2.5 rounded-lg mt-2 border border-slate-200">
                            <strong>Note de suivi :</strong> {step.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleStep(step.id)}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline shrink-0"
                    >
                      {step.isCompleted ? 'Décocher' : 'Cocher'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Onglet Pièces Déposées */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            Registre des pièces justificatives fournies
          </h4>

          <div className="divide-y divide-slate-100">
            {dossier.attachedDocs.map((doc, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{doc.name}</span>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                  doc.status === 'valid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : doc.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {doc.status === 'valid' ? 'Dûment classé' : doc.status === 'pending' ? 'En attente' : 'Manquant'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onglet Rappels & Alertes */}
      {activeTab === 'alerts' && (
        <div className="space-y-3">
          {dossier.alerts.map((alert, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Signalement de délai administratif :</span>
                <p className="leading-relaxed">{alert}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommandation vers l'assistant ou l'annuaire */}
      <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white">Votre dossier tarde à avancer ?</h4>
          <p className="text-xs text-slate-300">
            Découvrez vos recours légaux auprès de la délégation départementale ou échangez avec un expert.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('chat')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <span>Demander à l'IA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
