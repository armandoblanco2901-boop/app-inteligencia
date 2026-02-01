import React, { useState, useEffect, useRef } from 'react';
import { ViewState, VarietyData, DefectData, RouteStep, ChatMessage } from '../types';
import { COFFEE_VARIETIES, DEFECTS_LIST, LOGISTICS_ROUTE } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { AlertTriangle, CheckCircle, Ship, Train, Truck as TruckIcon, Anchor, Calculator, Send, Bot, User, Info, FileText, Map, Award } from 'lucide-react';

// --- DASHBOARD VIEW ---
export const DashboardView: React.FC<{ onViewChange: (view: ViewState) => void }> = ({ onViewChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-serif font-bold mb-2">Hoja de Ruta: Venezuela - Kazajistán</h2>
        <p className="text-stone-200 max-w-2xl">
          Plataforma integral para la gestión de exportación de café verde de especialidad.
          Supervise la calidad SCA, monitoree la ruta transcaspiana y consulte estrategias comerciales.
        </p>
        <button 
            onClick={() => onViewChange(ViewState.LOGISTICS)}
            className="mt-6 px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg font-semibold transition-colors shadow-lg flex items-center"
        >
            Ver Ruta Logística <Ship className="ml-2 w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-stone-500 font-medium uppercase">Origen Principal</p>
                    <h3 className="text-2xl font-bold text-stone-800 mt-1">Mérida</h3>
                </div>
                <span className="p-2 bg-green-100 text-green-700 rounded-lg"><MapIcon className="w-5 h-5"/></span>
            </div>
            <p className="text-xs text-stone-400 mt-2">Valle del Mocotíes (1.580 msnm)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-stone-500 font-medium uppercase">Calidad Objetivo</p>
                    <h3 className="text-2xl font-bold text-stone-800 mt-1">SCA 84+</h3>
                </div>
                <span className="p-2 bg-amber-100 text-amber-700 rounded-lg"><AwardIcon className="w-5 h-5"/></span>
            </div>
             <p className="text-xs text-stone-400 mt-2">Perfil Taza Limpia & Floral</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-stone-500 font-medium uppercase">Tiempo Tránsito</p>
                    <h3 className="text-2xl font-bold text-stone-800 mt-1">50 Días</h3>
                </div>
                <span className="p-2 bg-blue-100 text-blue-700 rounded-lg"><ClockIcon className="w-5 h-5"/></span>
            </div>
             <p className="text-xs text-stone-400 mt-2">Ruta Middle Corridor</p>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-stone-500 font-medium uppercase">Incoterm Rec.</p>
                    <h3 className="text-2xl font-bold text-stone-800 mt-1">CIP Almaty</h3>
                </div>
                <span className="p-2 bg-purple-100 text-purple-700 rounded-lg"><FileTextIcon className="w-5 h-5"/></span>
            </div>
             <p className="text-xs text-stone-400 mt-2">Seguro Cobertura Total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-lg font-bold text-stone-800 mb-4 font-serif">Perfil Sensorial por Variedad</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={COFFEE_VARIETIES}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5"/>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="acidity" name="Acidez" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="body" name="Cuerpo" fill="#a8a29e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="aroma" name="Aroma" fill="#78350f" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-lg font-bold text-stone-800 mb-4 font-serif">Alertas Operativas</h3>
            <div className="space-y-3">
                <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-amber-800">Control de Humedad Crítico</h4>
                        <p className="text-xs text-amber-700 mt-1">La ruta marítima y el paso por el Caspio generan alta condensación. Usar Kraft Liner y Silicagel es obligatorio.</p>
                    </div>
                </div>
                <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-blue-800">Documentación VUCE</h4>
                        <p className="text-xs text-blue-700 mt-1">Asegurar código SICA activo para movilización interna antes de la inspección INSAI.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- SOURCING VIEW ---
export const SourcingView: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-stone-800">Origen y Sourcing</h2>
                <span className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full text-xs font-semibold">Cosecha 2025-2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {['Lara', 'Mérida', 'Portuguesa', 'Trujillo'].map(state => (
                   <div key={state} className="bg-white border-l-4 border-amber-600 p-4 rounded-r-lg shadow-sm">
                       <h3 className="font-bold text-lg">{state}</h3>
                       <p className="text-xs text-stone-500">Zona SHB (Strictly Hard Bean)</p>
                   </div>
               ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                    <h3 className="font-bold text-lg font-serif">Catálogo de Variedades</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-stone-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Variedad</th>
                                <th className="px-6 py-3">Características Agronómicas</th>
                                <th className="px-6 py-3">Perfil de Taza</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {COFFEE_VARIETIES.map((v) => (
                                <tr key={v.name} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-amber-900">{v.name}</td>
                                    <td className="px-6 py-4 text-stone-600">{v.agronomy}</td>
                                    <td className="px-6 py-4 text-stone-600">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {v.profile}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- QUALITY VIEW ---
export const QualityView: React.FC = () => {
    return (
        <div className="space-y-8">
             <div>
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">Estándares de Calidad SCA</h2>
                <p className="text-stone-500">Requisitos mandatorios para exportación a mercados de especialidad.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Physical Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Análisis Físico (350g)
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-stone-50 rounded">
                            <span className="text-stone-600 font-medium">Humedad Interna</span>
                            <span className="font-bold text-stone-900">10% - 12%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-stone-50 rounded">
                            <span className="text-stone-600 font-medium">Actividad de Agua (aw)</span>
                            <span className="font-bold text-stone-900 text-red-600">&lt; 0.70</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-stone-50 rounded">
                            <span className="text-stone-600 font-medium">Defectos Primarios (Cat 1)</span>
                            <span className="font-bold text-green-600">0 permitidos</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-stone-50 rounded">
                            <span className="text-stone-600 font-medium">Defectos Secundarios (Cat 2)</span>
                            <span className="font-bold text-amber-600">Máx 5</span>
                        </div>
                    </div>
                </div>

                {/* Lab Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        Normativa Euroasiática (UEE)
                    </h3>
                     <div className="space-y-4">
                        <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                            <h4 className="font-bold text-blue-900">Ocratoxina A (OTA)</h4>
                            <p className="text-sm text-blue-700 mt-1">Límite Máximo: <strong>5 ppb</strong></p>
                            <p className="text-xs text-blue-500 mt-2">Crítico para aduana en Kazajistán.</p>
                        </div>
                        <div className="p-4 border border-stone-100 bg-stone-50 rounded-lg">
                            <h4 className="font-bold text-stone-900">Embalaje Requerido</h4>
                            <p className="text-sm text-stone-700 mt-1">Saco Yute 60kg + Bolsa Alta Barrera (Ecotact/GrainPro)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <h3 className="text-lg font-bold mb-4">Clasificación de Defectos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DEFECTS_LIST.map((defect) => (
                        <div key={defect.name} className={`p-4 rounded-lg border ${defect.category === 1 ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-stone-800">{defect.name}</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold ${defect.category === 1 ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'}`}>
                                    Cat {defect.category}
                                </span>
                            </div>
                            <p className="text-xs text-stone-600 mb-1"><strong>Causa:</strong> {defect.description}</p>
                            <p className="text-xs text-stone-600"><strong>Impacto:</strong> {defect.impact}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- LOGISTICS VIEW ---
export const LogisticsView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                     <h2 className="text-2xl font-serif font-bold text-stone-800">Logística Transcontinental</h2>
                     <p className="text-stone-500">Ruta Middle Corridor: Venezuela → Cáucaso → Asia Central</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-md text-sm font-medium border border-stone-200">Total: ~45-60 días</span>
                </div>
            </div>
           
            <div className="relative border-l-4 border-stone-300 ml-4 space-y-8 py-4">
                {LOGISTICS_ROUTE.map((step) => {
                    let Icon = Anchor;
                    if (step.transport === 'sea') Icon = Ship;
                    if (step.transport === 'rail') Icon = Train;
                    if (step.transport === 'road') Icon = TruckIcon;
                    if (step.transport === 'multimodal') Icon = Ship; // Ferry

                    return (
                        <div key={step.id} className="relative pl-8">
                            {/* Dot */}
                            <div className="absolute -left-[1.3rem] top-1 h-6 w-6 rounded-full bg-stone-100 border-4 border-amber-600 flex items-center justify-center"></div>
                            
                            <div className="bg-white p-5 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                    <h4 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                        <Icon className="w-5 h-5 text-stone-400" />
                                        {step.location}
                                    </h4>
                                    <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                                        {step.duration}
                                    </span>
                                </div>
                                <p className="text-sm text-stone-600 font-medium">{step.action}</p>
                                <p className="text-xs text-stone-400 mt-1">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-stone-800 text-stone-300 p-6 rounded-xl">
                    <h3 className="text-white font-bold text-lg mb-3">Incoterm Recomendado: CIP</h3>
                    <p className="text-sm mb-4">
                        <strong>Carriage and Insurance Paid To (Almaty)</strong>.
                        Debido a la complejidad de los transbordos y el riesgo en el Mar Caspio, se recomienda que el exportador controle el contrato de transporte y seguro hasta destino final.
                    </p>
                    <ul className="text-sm space-y-2 list-disc list-inside">
                        <li>Transferencia de riesgo: Al entregar al primer porteador.</li>
                        <li>Seguro: Obligatorio (Cláusula A - Todo Riesgo).</li>
                    </ul>
                 </div>
                 <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="text-amber-900 font-bold text-lg mb-3">Configuración de Carga</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between border-b border-amber-200 pb-2">
                            <span className="text-amber-800">Contenedor</span>
                            <span className="font-bold text-amber-900">20' Dry Van (Grado Alimenticio)</span>
                        </li>
                         <li className="flex justify-between border-b border-amber-200 pb-2">
                            <span className="text-amber-800">Peso Neto Est.</span>
                            <span className="font-bold text-amber-900">18.000 - 19.200 Kg</span>
                        </li>
                         <li className="flex justify-between pb-2">
                            <span className="text-amber-800">Protección</span>
                            <span className="font-bold text-amber-900">Papel Kraft + Desecantes</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
    );
};

// --- COMMERCIAL VIEW ---
export const CommercialView: React.FC = () => {
    const [price, setPrice] = useState<number>(300); // Base NY cents/lb
    const [differential, setDifferential] = useState<number>(40);
    const [logistics, setLogistics] = useState<number>(35); // cents/lb logistics cost

    const finalPrice = price + differential + logistics;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-stone-800">Estructura de Precios & Riesgos</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
                    <div className="flex items-center space-x-2 mb-6 text-stone-700">
                        <Calculator className="w-6 h-6" />
                        <h3 className="text-xl font-bold">Calculadora de Precio (FOB/CIP)</h3>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">Precio Base NY "C" (cts/lb)</label>
                            <input 
                                type="range" min="150" max="400" value={price} 
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                            />
                            <div className="flex justify-between mt-1 text-xs text-stone-500">
                                <span>150</span>
                                <span className="font-bold text-lg text-amber-700">{price} cts/lb</span>
                                <span>400</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">Diferencial Calidad Venezuela (cts/lb)</label>
                            <input 
                                type="number" value={differential} 
                                onChange={(e) => setDifferential(Number(e.target.value))}
                                className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">Costo Logístico Est. (cts/lb)</label>
                            <input 
                                type="number" value={logistics} 
                                onChange={(e) => setLogistics(Number(e.target.value))}
                                className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                        </div>

                        <div className="mt-6 pt-6 border-t border-stone-100">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-stone-700">Precio Final Estimado</span>
                                <span className="text-3xl font-bold text-green-700">{finalPrice} <span className="text-sm font-normal text-stone-500">cts/lb</span></span>
                            </div>
                            <p className="text-right text-xs text-stone-400 mt-1">Aprox. USD {(finalPrice / 100 * 2.20462).toFixed(2)} / Kg</p>
                        </div>
                    </div>
                </div>

                {/* Risks */}
                <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-bold text-red-900">Riesgo Financiero</h4>
                        <p className="text-sm text-red-700 mt-1">
                            Debido a sanciones, evite transferencias directas. Use <strong>Cartas de Crédito Confirmadas</strong> a través de bancos intermediarios en Turquía o EAU.
                        </p>
                    </div>
                     <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                        <h4 className="font-bold text-amber-900">Riesgo de Calidad</h4>
                        <p className="text-sm text-amber-700 mt-1">
                            El comprador kazajo es exigente. Se recomienda inspección SGS o Bureau Veritas "Pre-Shipment" para certificar que el lote coincide con la muestra.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ASSISTANT VIEW ---
export const AssistantView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'model', text: 'Hola. Soy tu consultor experto para la exportación de café a Kazajistán. ¿En qué puedo ayudarte hoy? (Ej: ¿Qué Incoterm debo usar? ¿Cuáles son los defectos permitidos?)' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const responseText = await sendMessageToGemini(input);
        
        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 p-4 flex items-center text-white">
                <Bot className="w-6 h-6 mr-3 text-amber-500" />
                <div>
                    <h3 className="font-bold">Consultor VeneKaz AI</h3>
                    <p className="text-xs text-stone-400">Powered by Gemini 3 Flash</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                            msg.role === 'user' 
                            ? 'bg-amber-600 text-white rounded-tr-none' 
                            : 'bg-white text-stone-800 shadow-sm border border-stone-200 rounded-tl-none'
                        }`}>
                            <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-stone-200 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-white border-t border-stone-200">
                <div className="flex items-center space-x-2">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe tu consulta sobre la exportación..."
                        className="flex-1 p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="p-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Icons helper
function MapIcon(props: any) { return <Map className={props.className} size={20} /> }
function AwardIcon(props: any) { return <Award className={props.className} size={20} /> }
function ClockIcon(props: any) { return <div className={props.className}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div> }
function FileTextIcon(props: any) { return <FileText className={props.className} size={20} /> }