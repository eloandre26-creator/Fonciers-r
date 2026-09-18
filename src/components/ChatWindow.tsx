import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { queryLandAssistantAI } from '../services/api';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  RefreshCw, 
  Scale, 
  Check, 
  Copy,
  BookOpen
} from 'lucide-react';

interface ChatWindowProps {
  initialPrompt?: string;
  isCompact?: boolean;
}

export function ChatWindow({ initialPrompt, isCompact = false }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Bonjour. Je suis l'**Assistant FoncierSûr**, conçu pour vous aider à comprendre la législation et les démarches foncières au Cameroun (MINDCAF, conservation foncière, notaires, cadastre).

Posez-moi vos questions sur :
- L'authenticité d'un document ou titre foncier
- La procédure d'immatriculation directe ou par achat notarié
- Les risques de double vente et faux certificats de propriété
- Les rôles respectifs du Sous-Préfet, du Géomètre et du Notaire

*Comment puis-je vous orienter aujourd'hui ?*`,
      timestamp: 'À l\'instant',
      suggestedQuestions: [
        'Pourquoi le certificat de propriété est-il indispensable ?',
        'Quelle est la valeur légale d\'un abandon coutumier ?',
        'Comment repérer une tentative de double vente ?',
        'Quels sont les délais réels pour obtenir un titre foncier ?'
      ],
      legalNotice: 'Orientation juridique à titre informatif — Ne se substitue pas à une consultation chez un Notaire ou au MINDCAF.'
    }
  ]);

  const [inputText, setInputText] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        sender: 'user',
        text: query,
        timestamp: 'À l\'instant'
      }
    ];

    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await queryLandAssistantAI(query, newMessages);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'À l\'instant',
        legalNotice: response.legalNotice || 'Cet outil aide à la pré-vérification et à la sensibilisation ; il ne remplace pas une vérification officielle auprès du MINDCAF.',
        suggestedQuestions: response.suggestions
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Erreur assistant chat:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text: 'Désolé, une anomalie temporaire est survenue lors de la consultation de la base foncière. Veuillez reformuler votre question.',
          timestamp: 'À l\'instant'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Historique réinitialisé. Posez une nouvelle question sur les procédures foncières camerounaises.',
        timestamp: 'À l\'instant',
        suggestedQuestions: [
          'Quelles sont les étapes pour immatriculer un terrain coutumier ?',
          'Comment vérifier si un géomètre est agréé ?',
          'Que faire si mon voisin conteste mon bornage ?'
        ]
      }
    ]);
  };

  return (
    <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${
      isCompact ? 'h-[500px]' : 'h-[640px]'
    }`}>
      {/* En-tête de la fenêtre de chat */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Assistant FoncierSûr</h4>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-1.5 py-0.2 rounded font-medium">
                Droit Camerounais
              </span>
            </div>
            <p className="text-[11px] text-slate-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Conseils procédures MINDCAF & Décret 76-165
            </p>
          </div>
        </div>

        <button
          onClick={resetChat}
          title="Réinitialiser la conversation"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Mention de responsabilité permanente */}
      <div className="bg-emerald-950/90 text-emerald-200 text-[11px] py-1.5 px-3 border-b border-emerald-800/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">Sensibilisation & pré-vérification : ne remplace pas l'avis officiel d'un notaire ou du MINDCAF.</span>
        </div>
      </div>

      {/* Corps des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[88%] sm:max-w-[78%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-none'
                  }`}
                >
                  {/* Formatage markdown simple pour les listes et gras */}
                  <div className="whitespace-pre-line space-y-1">
                    {msg.text.split('\n').map((line, i) => {
                      if (line.startsWith('- ') || line.startsWith('* ')) {
                        return (
                          <div key={i} className="flex items-start gap-1.5 pl-1">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{line.substring(2)}</span>
                          </div>
                        );
                      }
                      if (line.match(/^\d+\.\s/)) {
                        return (
                          <div key={i} className="font-medium text-slate-900 pt-1">
                            {line}
                          </div>
                        );
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>

                  {/* Référence juridique si présente */}
                  {msg.legalNotice && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-start gap-1 text-[11px] text-slate-500 italic">
                      <Scale className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{msg.legalNotice}</span>
                    </div>
                  )}
                </div>

                {/* Barre d'action pour les messages de l'assistant */}
                {!isUser && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-1">
                    <span>{msg.timestamp}</span>
                    <span>•</span>
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="hover:text-slate-800 flex items-center gap-1 transition"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Suggestions de questions rapides */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="pt-1.5 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Questions fréquemment posées :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sugg, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sugg)}
                          className="text-left text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1.5 transition shadow-2xs"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Indicateur de chargement / réflexion */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl rounded-tl-none p-3 shadow-xs text-xs text-slate-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-slate-500">Consultation des textes fonciers du MINDCAF...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question (ex: Quels sont les frais officiels de bornage ?)"
            className="flex-1 bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 disabled:opacity-50 text-white p-2.5 rounded-lg transition shrink-0 flex items-center justify-center"
            title="Envoyer la question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Appuyez sur Entrée pour envoyer</span>
          <span className="flex items-center gap-1 text-slate-500">
            <BookOpen className="w-3 h-3" />
            Législation camerounaise
          </span>
        </div>
      </div>
    </div>
  );
}
