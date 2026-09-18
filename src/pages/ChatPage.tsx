import { useState } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { AppPage } from '../types';
import { 
  Bot, 
  Scale, 
  AlertTriangle, 
  Sparkles, 
  ShieldAlert, 
  BookOpen, 
  Building2, 
  FileCheck2,
  ArrowRight
} from 'lucide-react';

interface ChatPageProps {
  onNavigate: (page: AppPage) => void;
}

export function ChatPage({ onNavigate }: ChatPageProps) {
  const [activeThemePrompt, setActiveThemePrompt] = useState<string | undefined>(undefined);

  const quickThemes = [
    {
      title: 'Double vente & Risques',
      icon: ShieldAlert,
      prompt: 'Comment savoir si un vendeur tente de me faire une double vente au Cameroun ?'
    },
    {
      title: 'Certificat de propriété',
      icon: FileCheck2,
      prompt: 'Pourquoi le certificat de propriété de moins de 3 mois est-il obligatoire ?'
    },
    {
      title: 'Terrain coutumier & Domaine National',
      icon: Building2,
      prompt: 'J\'ai acheté un terrain avec un "abandon coutumier", comment obtenir mon vrai titre foncier ?'
    },
    {
      title: 'Honoraires notaires & Cadastre',
      icon: Scale,
      prompt: 'Quels sont les frais légaux et officiels pour immatriculer ou muter un terrain au Cameroun ?'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* En-tête de la page */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Assistant Virtuel Spécialisé • Droit Foncier Camerounais
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            MINDCAF & Décrets d'application
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Assistant Juridique & Procédural FoncierSûr
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Posez toutes vos interrogations sur la réglementation foncière au Cameroun, les délais, les pièces requises et les recours en cas de litige.
        </p>

        {/* Mention légale visible obligatoire */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-200 text-xs flex items-start gap-2.5 border border-emerald-800">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Avertissement formel :</strong> Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF ou la consultation d'un Notaire.
          </div>
        </div>
      </div>

      {/* Raccourcis thématiques */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Thématiques fréquentes (sélectionnez pour poser la question) :
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quickThemes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveThemePrompt(theme.prompt)}
                className="p-3 bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center shrink-0 transition">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">
                    {theme.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {theme.prompt}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fenêtre de chat */}
      <div>
        <ChatWindow key={activeThemePrompt || 'default'} initialPrompt={activeThemePrompt} />
      </div>

      {/* Liens utiles vers les autres pages */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-600">
          Vous disposez d'un document scanné ? Utilisez directement notre outil d'extraction.
        </span>
        <button
          onClick={() => onNavigate('verify')}
          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 shrink-0"
        >
          <span>Vérifier mon titre</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
