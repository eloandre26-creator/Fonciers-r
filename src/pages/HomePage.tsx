import { AppPage } from '../types';
import { COMMON_FRAUDS } from '../data/mockData';
import { 
  ShieldCheck, 
  FileSearch, 
  ClipboardList, 
  AlertTriangle, 
  Users, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Scale, 
  Sparkles,
  MapPin,
  Lock
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Hero Section — Sobre, rassurante et institutionnelle */}
      <section id="home-hero-section" className="relative overflow-hidden bg-slate-900 text-white rounded-2xl border border-emerald-900/60 shadow-lg p-6 sm:p-10 lg:p-12">
        {/* Accent décoratif discret (terre & forêt) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-800/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Badge institutionnel */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/70 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Plateforme Civique de Sécurisation Foncière • République du Cameroun</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sécurisez vos démarches de <span className="text-emerald-400">Titre Foncier</span> au Cameroun.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Au Cameroun, acquérir ou immatriculer une terre est souvent complexe, lent et exposé aux risques de <strong>doubles ventes</strong> ou de <strong>faux titres</strong>. 
            FoncierSûr vous accompagne pour comprendre la procédure MINDCAF, repérer les signaux d'alerte et avancer l'esprit tranquille.
          </p>

          {/* Bandeau de rappel MINDCAF */}
          <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Rappel important :</strong> Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF ou l'intervention obligatoire d'un Notaire.
            </span>
          </div>

          {/* Boutons d'action principaux (Demandés explicitement) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              id="hero-cta-verify-title"
              onClick={() => onNavigate('verify')}
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md border border-emerald-400/40 transition text-sm sm:text-base group"
            >
              <FileSearch className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Vérifier mon titre</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-view-guide"
              onClick={() => onNavigate('guide')}
              className="inline-flex items-center justify-center gap-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition text-sm sm:text-base"
            >
              <ClipboardList className="w-5 h-5 text-slate-400" />
              <span>Voir le guide des démarches</span>
            </button>
          </div>

          {/* Points de confiance */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Décrets 76-165 & 2005</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Points de vigilance OCR</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Anonyme & Gratuit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Le Problème vs La Solution */}
      <section id="problem-solution-section" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Contexte camerounais
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprendre les pièges pour mieux protéger votre investissement
          </h2>
          <p className="text-sm text-slate-600">
            Au Cameroun, près de 65% des litiges devant les tribunaux concernent des conflits fonciers. Voici comment FoncierSûr vous aide à sécuriser votre parcours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Carte Le Problème */}
          <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Le problème au quotidien</h3>
                <p className="text-xs text-rose-700 font-medium">Lenteurs, opacité et fraude répandue</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Doubles & triples ventes :</strong> Un même terrain vendu à plusieurs acquéreurs grâce à de simples photocopies d'un ancien titre.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Ventes coutumières illégales :</strong> Achat d'un "abandon de droits coutumiers" qui ne donne aucun droit réel sans immatriculation MINDCAF.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Faux géomètres & faux tampons :</strong> Bornes posées sans coordonnées cadastrales réelles ni visa de la brigade topographique.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Lenteur et déperdition de dossiers :</strong> Démarches administratives pouvant durer des années sans visibilité claire sur l'étape en cours.</span>
              </li>
            </ul>
          </div>

          {/* Carte La Solution FoncierSûr */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">La solution FoncierSûr</h3>
                <p className="text-xs text-emerald-700 font-medium">Clarté, vigilance et pédagogie juridique</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Pré-vérification immédiate de titre :</strong> Détection automatique d'anomalies (date de certificat, tampons, cohérence des superficies).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Guide des étapes MINDCAF :</strong> Timeline visuelle détaillée avec pièces requises, acteurs officiels et délais indicatifs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Assistant Juridique IA :</strong> Réponses instantanées 24/7 sur la législation foncière camerounaise.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Annuaire de confiance :</strong> Coordonnées de géomètres assermentés OGC, notaires et avocats fonciers certifiés.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Les 4 Pièges à éviter absolument au Cameroun */}
      <section id="common-frauds-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Guide de survie foncière</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Les 4 pièges les plus fréquents au Cameroun
            </h2>
          </div>
          <button
            onClick={() => onNavigate('guide')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Voir toute la procédure MINDCAF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMON_FRAUDS.map((fraud) => (
            <div
              key={fraud.id}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {fraud.tag}
                </span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {fraud.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fraud.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-3.5 rounded-b-xl">
                <div className="text-[11px] text-slate-800 font-medium">
                  <span className="text-emerald-700 font-bold">Conseil FoncierSûr : </span>
                  {fraud.defense}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules et Fonctionnalités Clés */}
      <section id="features-overview-section" className="bg-slate-100/80 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Tous les outils nécessaires pour vos démarches
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Une boîte à outils conçue pour être simple, sobre et directement utile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1 */}
          <div 
            onClick={() => onNavigate('verify')}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs transition cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition">
              Vérifier un titre
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Téléversez votre document ou testez un échantillon pour détecter les points de vigilance et anomalies.
            </p>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1">
              Tester l'analyse →
            </span>
          </div>

          {/* Module 2 */}
          <div 
            onClick={() => onNavigate('guide')}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs transition cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-800 transition">
              Guide des démarches
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Parcours interactif pas à pas : immatriculation directe, mutation chez notaire, pièces et délais MINDCAF.
            </p>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1">
              Explorer la timeline →
            </span>
          </div>

          {/* Module 3 */}
          <div 
            onClick={() => onNavigate('chat')}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs transition cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center group-hover:bg-sky-700 group-hover:text-white transition">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-800 transition">
              Assistant Juridique IA
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Posez toutes vos questions sur les lois foncières, le bornage, les frais et les recours possibles.
            </p>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1">
              Démarrer le chat →
            </span>
          </div>

          {/* Module 4 */}
          <div 
            onClick={() => onNavigate('directory')}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs transition cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-800 transition">
              Annuaire agréé
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trouvez un notaire, un géomètre assermenté OGC ou un avocat foncier qualifié près de chez vous.
            </p>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1">
              Consulter l'annuaire →
            </span>
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="p-8 rounded-2xl bg-emerald-950 text-white border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Vous avez un document foncier entre les mains ?</h3>
          <p className="text-sm text-emerald-200/90 max-w-xl">
            Ne versez aucun acompte avant d'avoir vérifié les mentions légales indispensables et le certificat de propriété de la conservation.
          </p>
        </div>
        <button
          onClick={() => onNavigate('verify')}
          className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition shrink-0 flex items-center gap-2 shadow-xs"
        >
          <FileSearch className="w-5 h-5" />
          <span>Faire une vérification</span>
        </button>
      </section>

    </div>
  );
}
