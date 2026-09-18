import { useState } from 'react';
import { AppPage } from '../types';
import { 
  ShieldCheck, 
  FileSearch, 
  MapPin, 
  Bot, 
  ClipboardList, 
  Users, 
  Menu, 
  X,
  AlertTriangle,
  Compass
} from 'lucide-react';

interface HeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppPage; label: string; icon: typeof ShieldCheck; badge?: string }[] = [
    { id: 'home', label: 'Accueil', icon: Compass },
    { id: 'guide', label: 'Guide des démarches', icon: ClipboardList },
    { id: 'verify', label: 'Vérifier mon titre', icon: FileSearch, badge: 'Essentiel' },
    { id: 'chat', label: 'Assistant IA', icon: Bot },
    { id: 'dashboard', label: 'Tableau de bord', icon: ShieldCheck },
    { id: 'directory', label: 'Annuaire pros', icon: Users },
  ];

  const handleNav = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-emerald-900/60">
      {/* Bandeau d'avertissement institutionnel officiel (Obligatoire) */}
      <div id="mindcaf-disclaimer-banner" className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-3 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium truncate">
              <strong>MINDCAF Notice :</strong> Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-emerald-300/80 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Réglementation Décret 76-165 & 2005</span>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Titre */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden focus:ring-2 focus:ring-emerald-400 rounded-lg p-1 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-inner border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition">
                  FoncierSûr
                </span>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-emerald-900/90 text-emerald-200 border border-emerald-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-0.5"></span>
                  Cameroun
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Sécurisation du Titre Foncier</p>
            </div>
          </button>

          {/* Navigation Desktop */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-800/70 text-white font-semibold shadow-xs border border-emerald-600/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bouton d'action rapide & Toggle Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="cta-quick-verify-btn"
              onClick={() => handleNav('verify')}
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-sm border border-emerald-400/40 transition"
            >
              <FileSearch className="w-4 h-4" />
              <span>Vérifier mon titre</span>
            </button>

            {/* Menu Hamburger Mobile */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 transition"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-xl">
          <div className="pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400 px-2 flex items-center justify-between">
            <span>Navigation FoncierSûr</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <MapPin className="w-3 h-3" /> Yaoundé • Douala • Régions
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              id="mobile-menu-verify-btn"
              onClick={() => handleNav('verify')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm"
            >
              <FileSearch className="w-5 h-5" />
              <span>Tester et vérifier un titre foncier</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
