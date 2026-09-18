import React, { useState, useRef } from 'react';
import { AppPage, ExtractedLandData } from '../types';
import { analyzeLandTitleDocument, SAMPLE_ANALYSES } from '../services/api';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  X, 
  FileSearch, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  User, 
  Calendar, 
  Scale, 
  RefreshCw, 
  Printer, 
  Bot, 
  Users,
  ExternalLink,
  Info
} from 'lucide-react';

interface VerifyPageProps {
  onNavigate: (page: AppPage) => void;
}

export function VerifyPage({ onNavigate }: VerifyPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [activeSampleKey, setActiveSampleKey] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ExtractedLandData | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion du fichier sélectionné
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setActiveSampleKey(null);
    setAnalysisResult(null);

    if (file.type.startsWith('image/')) {
      setFileType('image');
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else if (file.type === 'application/pdf') {
      setFileType('pdf');
      setFilePreviewUrl(null);
    } else {
      setFileType('image');
      setFilePreviewUrl(null);
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Chargement d'un exemple prêt à tester
  const handleSelectSample = (sampleKey: string) => {
    setActiveSampleKey(sampleKey);
    setSelectedFile(null);
    setFileType('image');
    setFilePreviewUrl(null);
    setAnalysisResult(null);
  };

  // Lancement de l'analyse
  const handleRunAnalysis = async () => {
    if (!selectedFile && !activeSampleKey) return;
    setIsAnalyzing(true);

    try {
      let result: ExtractedLandData;
      if (activeSampleKey) {
        result = await analyzeLandTitleDocument(activeSampleKey, activeSampleKey);
      } else if (selectedFile) {
        result = await analyzeLandTitleDocument(selectedFile);
      } else {
        result = SAMPLE_ANALYSES['anomalies-kribi'];
      }
      setAnalysisResult(result);
    } catch (err) {
      console.error('Erreur analyse:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFilePreviewUrl(null);
    setFileType(null);
    setActiveSampleKey(null);
    setAnalysisResult(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* En-tête avec mention institutionnelle obligatoire */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            Module de Pré-Vérification & Détection
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Vérification de sécurité foncière
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vérifier un Titre Foncier ou Document Immobilier
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Téléversez une photo ou un scan de votre titre foncier, certificat de propriété ou convention de vente. Notre moteur de pré-contrôle extrait les données clés et détecte les signaux de vigilance prioritaires.
        </p>

        {/* Mention visible obligatoire */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-200 text-xs flex items-start gap-2.5 border border-emerald-800 shadow-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Avertissement légal :</strong> Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF. Seul le conservateur de la propriété foncière fait foi de l'authenticité d'un titre.
          </div>
        </div>
      </div>

      {/* Échantillons d'exemples rapides (1 clic) */}
      <div className="bg-slate-100/90 p-4 rounded-xl border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-700" />
            Ou testez immédiatement avec un échantillon type camerounais :
          </span>
          {activeSampleKey && (
            <button 
              onClick={handleReset} 
              className="text-xs text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Réinitialiser
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleSelectSample('anomalies-kribi')}
            className={`p-3 rounded-lg text-left text-xs border transition ${
              activeSampleKey === 'anomalies-kribi'
                ? 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/30 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-rose-800 mb-0.5">
              <span>⚠️ Cas Suspect : Kribi Bord de mer</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-100 rounded">Risque élevé</span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Zone littorale, certificat expiré & suspicion de double vente.
            </p>
          </button>

          <button
            onClick={() => handleSelectSample('regulier-yaounde')}
            className={`p-3 rounded-lg text-left text-xs border transition ${
              activeSampleKey === 'regulier-yaounde'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-emerald-800 mb-0.5">
              <span>✅ Cas Régulier : Yaoundé Bastos</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 rounded">Faible risque</span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Titre conforme avec précautions sur l'état matrimonial.
            </p>
          </button>

          <button
            onClick={() => handleSelectSample('coutumier-douala')}
            className={`p-3 rounded-lg text-left text-xs border transition ${
              activeSampleKey === 'coutumier-douala'
                ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/30 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-amber-800 mb-0.5">
              <span>🛑 Acte Coutumier : Douala PK14</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 rounded">Pas de titre</span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              "Abandon coutumier" sans valeur de propriété opposable.
            </p>
          </button>
        </div>
      </div>

      {/* Formulaire d'upload avec prévisualisation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Zone de glisser-déposer / sélection manuelle */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all ${
            dragActive
              ? 'border-emerald-600 bg-emerald-50/70'
              : 'border-slate-300 hover:border-emerald-600/70 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
            className="hidden"
            id="file-upload-input"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-slate-900">
                Glissez-déposez votre document ici ou{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-700 hover:text-emerald-800 underline font-extrabold focus:outline-hidden"
                >
                  parcourez vos fichiers
                </button>
              </p>
              <p className="text-xs text-slate-500">
                Formats acceptés : PDF, PNG, JPEG, WEBP (Jusqu'à 15 Mo). Vos données restent strictement confidentielles.
              </p>
            </div>
          </div>
        </div>

        {/* Prévisualisation du fichier sélectionné ou de l'échantillon */}
        {(selectedFile || activeSampleKey) && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-800">
                {fileType === 'pdf' ? (
                  <FileText className="w-6 h-6 text-amber-400" />
                ) : (
                  <ImageIcon className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {selectedFile ? selectedFile.name : `Échantillon : ${activeSampleKey}`}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold uppercase">
                    Prêt pour analyse
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedFile
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo • Fichier chargé`
                    : 'Document test simulé avec métadonnées MINDCAF'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleReset}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Supprimer ce document"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition shadow-xs flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    <span>Lancer l'analyse du document</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Aperçu visuel si image uploadée */}
        {filePreviewUrl && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 max-h-64 flex items-center justify-center p-2">
            <img
              src={filePreviewUrl}
              alt="Prévisualisation du titre foncier"
              className="max-h-60 object-contain rounded"
            />
          </div>
        )}

        {/* Animation de scan pendant l'analyse */}
        {isAnalyzing && (
          <div className="p-8 rounded-xl bg-slate-900 text-white text-center space-y-4 border border-emerald-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-800/60 border-2 border-emerald-400 flex items-center justify-center animate-pulse">
              <FileSearch className="w-6 h-6 text-emerald-300 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Extraction OCR & Audit des règles MINDCAF...</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Recherche du numéro de volume et folio, calcul de conformité cadastrale, vérification de la validité du certificat de propriété...
              </p>
            </div>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-emerald-400 animate-[indeterminate_1.5s_infinite_linear]"></div>
            </div>
          </div>
        )}
      </div>

      {/* RÉSULTAT DE L'ANALYSE */}
      {analysisResult && (
        <div id="analysis-report-section" className="space-y-6 pt-2">
          
          {/* Synthèse du risque */}
          <div className={`p-6 rounded-2xl border transition-all ${
            analysisResult.overallRiskLevel === 'critique'
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : analysisResult.overallRiskLevel === 'eleve'
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : analysisResult.overallRiskLevel === 'modere'
              ? 'bg-yellow-50/80 border-yellow-300 text-yellow-950'
              : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                  analysisResult.overallRiskLevel === 'critique'
                    ? 'bg-rose-700'
                    : analysisResult.overallRiskLevel === 'eleve'
                    ? 'bg-amber-600'
                    : analysisResult.overallRiskLevel === 'modere'
                    ? 'bg-yellow-600'
                    : 'bg-emerald-700'
                }`}>
                  {analysisResult.overallRiskLevel === 'critique' || analysisResult.overallRiskLevel === 'eleve' ? (
                    <AlertOctagon className="w-6 h-6" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Niveau d'alerte global</span>
                    <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded ${
                      analysisResult.overallRiskLevel === 'critique'
                        ? 'bg-rose-200 text-rose-900'
                        : analysisResult.overallRiskLevel === 'eleve'
                        ? 'bg-amber-200 text-amber-900'
                        : analysisResult.overallRiskLevel === 'modere'
                        ? 'bg-yellow-200 text-yellow-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      Risque {analysisResult.overallRiskLevel} ({analysisResult.overallRiskScore}/100)
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {analysisResult.overallRiskLevel === 'critique'
                      ? 'Anomalies majeures détectées — Ne procédez à aucun paiement'
                      : analysisResult.overallRiskLevel === 'eleve'
                      ? 'Points d\'attention sérieux — Vérification MINDCAF indispensable'
                      : analysisResult.overallRiskLevel === 'modere'
                      ? 'Document apparemment régulier — Précautions d\'usage recommandées'
                      : 'Structure du document conforme aux standards du cadastre'}
                  </h3>
                </div>
              </div>

              {/* Bouton imprimer / sauvegarder */}
              <button
                onClick={handlePrint}
                className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Imprimer la fiche d'alerte</span>
              </button>
            </div>
          </div>

          {/* Données d'extraction OCR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                Données identifiées sur le document
              </h4>
              <span className="text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                {analysisResult.documentType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Numéro de Titre Foncier
                </span>
                <p className="text-sm font-bold text-slate-900">{analysisResult.titleNumber}</p>
                <p className="text-[11px] text-slate-500">{analysisResult.volume} • {analysisResult.folio}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Propriétaire inscrit
                </span>
                <p className="text-sm font-bold text-slate-900">{analysisResult.registeredOwner}</p>
                <p className="text-[11px] text-slate-500">Superficie : {analysisResult.declaredArea}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Localisation administrative
                </span>
                <p className="text-sm font-bold text-slate-900">{analysisResult.department} ({analysisResult.arrondissement})</p>
                <p className="text-[11px] text-slate-500">Lieu-dit : {analysisResult.locality}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Date de délivrance initiale
                </span>
                <p className="text-sm font-bold text-slate-900">{analysisResult.deliveryDate}</p>
                <p className="text-[11px] text-slate-500">Conservateur : {analysisResult.conservateurName}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 sm:col-span-2">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Conservation Foncière de rattachement
                </span>
                <p className="text-sm font-bold text-slate-900">{analysisResult.landRegistryOffice}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Service administratif officiel compétent pour la délivrance du Certificat de Propriété.
                </p>
              </div>
            </div>
          </div>

          {/* LISTE DES POINTS DE VIGILANCE DÉTECTÉS (Exigence clé du prompt) */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Points de vigilance et anomalies relevés ({analysisResult.vigilancePoints.length})
            </h4>

            <div className="space-y-3">
              {analysisResult.vigilancePoints.map((point) => (
                <div
                  key={point.id}
                  className={`p-5 rounded-xl border space-y-2.5 transition ${
                    point.severity === 'high'
                      ? 'bg-rose-50/60 border-rose-200'
                      : point.severity === 'medium'
                      ? 'bg-amber-50/60 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        point.severity === 'high'
                          ? 'bg-rose-700 text-white'
                          : point.severity === 'medium'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-600 text-white'
                      }`}>
                        Alerte {point.severity === 'high' ? 'Critique' : point.severity === 'medium' ? 'Importante' : 'Moyenne'}
                      </span>
                      <h5 className="text-sm sm:text-base font-bold text-slate-900">
                        {point.title}
                      </h5>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {point.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                      <Scale className="w-3.5 h-3.5 text-emerald-700" />
                      Contexte juridique : {point.legalContext}
                    </div>
                    <div className="text-emerald-900 font-medium text-[11px] pt-1 border-t border-slate-100">
                      <strong>Action recommandée :</strong> {point.recommendedAction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Éléments positifs constatés */}
          {analysisResult.positivePoints && analysisResult.positivePoints.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Mentions conformes repérées :
              </h5>
              <ul className="space-y-1 text-xs text-emerald-900">
                {analysisResult.positivePoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions suivantes recommandées */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">Besoin d'approfondir ce dossier ?</h4>
              <p className="text-xs text-slate-300">
                Posez vos questions à l'Assistant IA ou contactez un notaire agréé de notre annuaire.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('chat')}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Interroger l'Assistant IA</span>
              </button>

              <button
                onClick={() => onNavigate('directory')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <Users className="w-4 h-4" />
                <span>Trouver un Notaire</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
