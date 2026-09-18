import { useState } from 'react';
import { ProcedureStep } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Building2, 
  User, 
  FileText, 
  AlertTriangle, 
  Coins, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface TimelineProps {
  steps: ProcedureStep[];
  procedureName?: string;
  legalReference?: string;
}

export function Timeline({ steps, procedureName, legalReference }: TimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="w-full">
      {procedureName && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950 text-white border border-emerald-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300">Procédure Officielle</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{procedureName}</h3>
            </div>
            {legalReference && (
              <span className="text-xs bg-emerald-900 px-2.5 py-1 rounded text-emerald-200 border border-emerald-700/50 self-start sm:self-auto">
                {legalReference}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Liste des étapes sous forme de timeline verticale */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-300">
        {steps.map((step) => {
          const isExpanded = expandedStep === step.number;
          return (
            <div 
              key={step.number} 
              id={`timeline-step-${step.number}`}
              className="relative group"
            >
              {/* Puce numérotée sur la ligne */}
              <div 
                className={`absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all ${
                  step.isCrucial
                    ? 'bg-amber-500 border-amber-600 text-white shadow-xs'
                    : 'bg-emerald-700 border-emerald-600 text-white shadow-xs'
                }`}
              >
                <span>{step.number}</span>
              </div>

              {/* Conteneur de l'étape */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition overflow-hidden">
                {/* En-tête cliquable */}
                <button
                  type="button"
                  onClick={() => toggleStep(step.number)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 focus:outline-hidden focus:bg-slate-50 transition"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        Étape {step.number} / {steps.length}
                      </span>
                      {step.isCrucial && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Étape charnière (attention requise)
                        </span>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {step.duration}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition">
                      {step.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-medium text-emerald-900">
                        <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                        {step.institution}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Acteur : {step.actor}
                      </span>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Contenu détaillé déroulable */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-100 bg-slate-50/60 space-y-4">
                    {/* Description générale de l'étape */}
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Pièces et documents requis */}
                    {step.requiredDocuments.length > 0 && (
                      <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-emerald-700" />
                          Documents & Pièces à fournir :
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          {step.requiredDocuments.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Frais officiels & vigilance */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Frais officiels */}
                      <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                          <Coins className="w-3.5 h-3.5 text-emerald-700" />
                          Frais et redevances officiels :
                        </div>
                        <p className="text-emerald-800 leading-relaxed">
                          {step.officialCostInfo}
                        </p>
                      </div>

                      {/* Conseil de vigilance pour éviter le piège */}
                      <div className="p-3 rounded-lg bg-amber-50/90 border border-amber-200 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                          Conseil de vigilance FoncierSûr :
                        </div>
                        <p className="text-amber-800 leading-relaxed">
                          {step.vigilanceAdvice}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
