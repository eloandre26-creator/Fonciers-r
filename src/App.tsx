import { useState, useEffect } from 'react';
import { AppPage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { VerifyPage } from './pages/VerifyPage';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  // Réinitialiser la position de défilement au changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'guide':
        return <GuidePage onNavigate={setCurrentPage} />;
      case 'verify':
        return <VerifyPage onNavigate={setCurrentPage} />;
      case 'chat':
        return <ChatPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'directory':
        return <DirectoryPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* En-tête de navigation institutionnelle */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Contenu principal de la page courante */}
      <main id="app-main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {renderPage()}
      </main>

      {/* Pied de page avec mentions légales et MINDCAF */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

