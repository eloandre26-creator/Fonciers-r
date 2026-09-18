import { useState } from 'react';
import { PROFESSIONALS_DIRECTORY } from '../data/mockData';
import { Professional, AppPage } from '../types';
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ShieldCheck, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface DirectoryPageProps {
  onNavigate: (page: AppPage) => void;
}

export function DirectoryPage({ onNavigate }: DirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [contactModalPro, setContactModalPro] = useState<Professional | null>(null);

  // Filtrage
  const filteredPros = PROFESSIONALS_DIRECTORY.filter((pro) => {
    const matchesSearch = 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialities.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pro.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'all' || pro.role === selectedRole;
    const matchesCity = selectedCity === 'all' || pro.city.toLowerCase().includes(selectedCity.toLowerCase());

    return matchesSearch && matchesRole && matchesCity;
  });

  const cities = ['Yaoundé', 'Douala', 'Kribi', 'Bafoussam', 'Garoua', 'Bamenda / Buea'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* En-tête de la page */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Professionnels Agréés • Cameroun
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            Ordre des Géomètres (OGC) & Chambre des Notaires
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Annuaire des Géomètres, Notaires & Avocats Fonciers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Pour vos bornages, actes de vente notariés et règlements de contentieux, faites appel exclusivement à des praticiens inscrits à leurs ordres professionnels respectifs.
        </p>

        {/* Mention légale visible obligatoire */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-200 text-xs flex items-start gap-2.5 border border-emerald-800">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Avertissement déontologique :</strong> Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF ou des tableaux officiels de l'OGC et de la Chambre des Notaires.
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, spécialité (ex: bornage, succession, morcellement, Kribi)..."
            className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Filtre par profession */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Spécialité :
            </span>
            {[
              { id: 'all', label: 'Tous les professionnels' },
              { id: 'Notaire', label: 'Notaires' },
              { id: 'Géomètre-Expert', label: 'Géomètres OGC' },
              { id: 'Avocat Foncier', label: 'Avocats Fonciers' },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedRole === role.id
                    ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Filtre par ville */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Ville :</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-emerald-600"
            >
              <option value="all">Toutes les villes</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Nombre de résultats */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>{filteredPros.length} professionnel(s) répertorié(s)</span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> Ordre professionnel vérifié
        </span>
      </div>

      {/* Grille des professionnels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPros.map((pro) => (
          <div
            key={pro.id}
            id={`pro-card-${pro.id}`}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      pro.role === 'Notaire'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : pro.role === 'Géomètre-Expert'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-sky-100 text-sky-900 border border-sky-200'
                    }`}>
                      {pro.role}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      N° {pro.orderNumber}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {pro.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{pro.rating}</span>
                  <span className="text-slate-400 font-normal text-[10px]">({pro.reviewCount})</span>
                </div>
              </div>

              {/* Localisation et expérience */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{pro.city} ({pro.region})</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{pro.address}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{pro.experienceYears} ans d'exercice dans le droit foncier</span>
                </div>
              </div>

              {/* Tags de compétences */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pro.specialities.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Coordonnées et boutons de contact */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{pro.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{pro.email}</span>
                </div>
              </div>

              <button
                onClick={() => setContactModalPro(pro)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-3.5 py-2 rounded-lg transition text-center shadow-2xs"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de contact fictif */}
      {contactModalPro && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-800">{contactModalPro.role}</span>
                <h3 className="text-lg font-bold text-slate-900">{contactModalPro.name}</h3>
              </div>
              <button
                onClick={() => setContactModalPro(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p>
                <strong>Adresse de l'étude / cabinet :</strong> {contactModalPro.address}
              </p>
              <p>
                <strong>Téléphone direct :</strong> <a href={`tel:${contactModalPro.phone}`} className="text-emerald-700 underline font-semibold">{contactModalPro.phone}</a>
              </p>
              <p>
                <strong>Courriel professionnel :</strong> <a href={`mailto:${contactModalPro.email}`} className="text-emerald-700 underline">{contactModalPro.email}</a>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <p className="font-semibold">Conseil FoncierSûr avant votre rendez-vous :</p>
              <p className="mt-0.5 text-slate-600">
                Venez toujours muni de votre CNI valide, du numéro exact du Titre Foncier et de la localisation géographique précise du bien.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setContactModalPro(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                Fermer
              </button>
              <a
                href={`tel:${contactModalPro.phone}`}
                className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Notice de sensibilisation sur les faux géomètres */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          Mise en garde stricte contre les géomètres non assermentés
        </div>
        <p className="leading-relaxed text-slate-700">
          Un géomètre non inscrit à l'Ordre des Géomètres du Cameroun (OGC) n'a aucune qualité légale pour déposer un dossier technique au Cadastre ou dresser un plan de morcellement valide. En cas de doute, demandez son numéro d'inscription à l'OGC et exigez le reçu officiel.
        </p>
      </div>

    </div>
  );
}
