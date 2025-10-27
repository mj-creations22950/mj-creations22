import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Bonjour ! Je suis lassistant virtuel MJ Creations. Comment puis-je vous aider ?',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const autoResponses = [
    {
      keywords: ['prix', 'cout', 'tarif', 'combien'],
      response: 'Pour connaitre nos tarifs, consultez notre catalogue sur /catalog ou demandez un devis gratuit sur /devis !'
    },
    {
      keywords: ['devis', 'estimation', 'prix'],
      response: 'Vous pouvez demander un devis gratuit via notre formulaire ou en nous appelant au 06.11.20.37.41'
    },
    {
      keywords: ['rdv', 'rendez-vous', 'disponibilite', 'quand'],
      response: 'Consultez nos disponibilites dans lespace Rendez-vous ou contactez-nous directement au 06.11.20.37.41'
    },
    {
      keywords: ['horaire', 'ouverture', 'fermeture', 'heure'],
      response: 'Nous sommes ouverts du lundi au vendredi de 8h a 18h et le samedi de 9h a 17h.'
    },
    {
      keywords: ['urgence', 'depannage', 'urgent', 'rapide'],
      response: 'Pour une urgence, appelez-nous directement au 06.11.20.37.41. Service 24/7 disponible.'
    },
    {
      keywords: ['contact', 'telephone', 'email', 'joindre'],
      response: 'Vous pouvez nous contacter par telephone au 06.11.20.37.41 ou par email a mj.creations22950@gmail.com'
    },
    {
      keywords: ['paiement', 'payer', 'carte', 'cheque'],
      response: 'Nous acceptons : CB, virement, cheque, especes (max 1000EUR), et paiement en 4x sans frais pour les commandes > 500EUR'
    },
    {
      keywords: ['garantie', 'assurance'],
      response: 'Tous nos travaux sont garantis 2 ans. Nous sommes assures avec garantie decennale.'
    },
    {
      keywords: ['zone', 'ou', 'deplacement', 'bretagne'],
      response: 'Nous intervenons dans toute la Bretagne : Rennes, Brest, Vannes, Lorient, Saint-Malo, Quimper et environs. Frais de deplacement : 25EUR + 0.65EUR/km'
    },
    {
      keywords: ['fidelite', 'points', 'reduction'],
      response: 'Programme fidelite : 1 point par euro depense ! 50pts=-5EUR, 100pts=-10EUR, 250pts=-25EUR, 500pts=-60EUR, 1000pts=-150EUR'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const response of autoResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }
    return 'Merci pour votre message ! Un conseiller vous repondra dans les plus brefs delais. Pour une reponse immediate, appelez-nous au 06.11.20.37.41';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: findResponse(inputMessage),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] border-none shadow-2xl flex flex-col">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6" />
                <div>
                  <CardTitle className="text-lg">Assistant MJ Creations</CardTitle>
                  <p className="text-xs opacity-90">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-300'
                }`}>
                  {message.type === 'bot' ? <Bot className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-gray-600" />}
                </div>
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.type === 'bot' ? 'bg-gray-100 text-gray-900' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatAssistant;