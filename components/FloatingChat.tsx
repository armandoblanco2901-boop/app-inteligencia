import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Send, Bot, Minimize2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Bienvenido a VeneKaz. Soy tu asistente experto en exportación. ¿Tienes dudas sobre la ruta logística o los estándares SCA?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToGemini(input);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen ? (
        <div className="bg-[#1c1917] border border-[#78350f] w-80 md:w-96 h-[500px] rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-[#291d18] p-4 flex justify-between items-center border-b border-[#78350f]/30">
            <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#d4a373]" />
                <h3 className="text-[#d4a373] font-serif font-bold">Asistente IA</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#151210]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-[#d4a373] text-[#291d18] rounded-tr-none font-medium' 
                  : 'bg-[#291d18] text-stone-200 border border-[#78350f]/20 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-[#291d18] p-3 rounded-lg rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#d4a373] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#d4a373] rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-[#d4a373] rounded-full animate-bounce delay-150"></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[#291d18] border-t border-[#78350f]/30">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu pregunta..."
                    className="w-full bg-[#151210] text-white rounded-full pl-4 pr-10 py-2 text-sm border border-[#78350f]/30 focus:border-[#d4a373] focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#d4a373] text-[#291d18] rounded-full hover:bg-[#e6b98d] transition-colors disabled:opacity-50"
                >
                    <Send className="w-3 h-3" />
                </button>
            </div>
          </div>
        </div>
      ) : (
        <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center justify-center w-14 h-14 bg-[#d4a373] text-[#291d18] rounded-full shadow-[0_0_20px_rgba(212,163,115,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(212,163,115,0.5)] transition-all duration-300"
        >
            <MessageSquareText className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default FloatingChat;