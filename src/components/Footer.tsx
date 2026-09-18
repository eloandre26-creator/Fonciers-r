import { AppPage } from '../types';
import { ShieldCheck, AlertOctagon, Scale, BookOpen, ExternalLink, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cadre de sensibilisation institutionnelle - MINDCAF */}
        <div id="footer-legal-notice-box" className="bg-slate-900 border border-emerald-800/50 rounded-xl p-5 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-emerald-200">Avertissement légal & Déontologique</h4>
              <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">
                <strong>Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF.</strong> Toute acquisition immobilière définitive au Cameroun doit obligatoirement être passée par acte authentique devant un Notaire et validée par le Conservateur de la Propriété Foncière compétent.
              </p>
            </div>
          </div>
        </div>

        {/* Colonnes de liens */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1 : À propos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-700 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">FoncierSûr</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plateforme civique d’aide aux usagers camerounais pour comprendre les procédures, décrypter les documents fonciers et se prémunir contre les escroqueries et les doubles ventes.
            </p>
            <div className="text-xs text-emerald-400/90 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>République du Cameroun • Yaoundé / Douala</span>
            </div>
          </div>

          {/* Col 2 : Outils de la plateforme */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Outils pratiques</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('verify')} 
                  className="text-slate-400 hover:text-emerald-300 transition text-left flex items-center gap-1.5"
                >
                  <span>→ Vérification & Détection d’anomalies</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="text-slate-400 hover:text-emerald-300 transition text-left flex items-center gap-1.5"
                >
                  <span>→ Guide MINDCAF & Procédures pas à pas</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="text-slate-400 hover:text-emerald-300 transition text-left flex items-center gap-1.5"
                >
                  <span>→ Suivi de dossier d’immatriculation</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('chat')} 
                  className="text-slate-400 hover:text-emerald-300 transition text-left flex items-center gap-1.5"
                >
                  <span>→ Assistant Juridique IA Foncier</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('directory')} 
                  className="text-slate-400 hover:text-emerald-300 transition text-left flex items-center gap-1.5"
                >
                  <span>→ Annuaire Géomètres & Notaires</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 : Textes de référence */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Cadre légal</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Décret N° 76-165 du 27 avril 1976 (Conditions d’obtention du titre foncier)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Décret N° 2005/481 du 16 décembre 2005 (Réforme foncière)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ordonnance N° 74-1 du 6 juillet 1974 (Régime foncier)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Loi régissant l’Ordre des Géomètres du Cameroun (OGC)</span>
              </li>
            </ul>
          </div>

          {/* Col 4 : Contacts & Urgence litige */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Orientation administrative</h5>
            <div className="text-xs space-y-2 text-slate-400">
              <p>
                <strong>MINDCAF Central :</strong> Boulevard du 20 Mai, Yaoundé
              </p>
              <p className="flex items-center gap-1 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consulter la Délégation Départementale de votre secteur</span>
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-amber-950/70 border border-amber-800/80 text-amber-300 text-[11px]">
                  <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                  <span>Suspicion de fraude ? Consultez immédiatement un Notaire.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bas de page */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FoncierSûr Cameroun — Initiative civique d'information et d'accès au droit foncier.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Protection des données & Anonymat des documents</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Sensibilisation citoyenne</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
