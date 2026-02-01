import React, { useState, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import FloatingChat from './components/FloatingChat';
import { 
  MapPin, Coffee, Scale, ShieldCheck, Ship, FileText, 
  TrendingUp, AlertTriangle, ChevronRight, X, Info, Anchor, Train, Truck, Menu, Check, Droplet, Microscope, Package, BookOpen, Globe
} from 'lucide-react';
import { LOGISTICS_ROUTE, COFFEE_VARIETIES, ALBUM_IMAGES, HERO_IMAGE } from './constants';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// --- Legal Data for Interactive Cards ---
const LEGAL_DATA = [
  {
    id: 'vuce',
    title: "VUCE",
    subtitle: "Ventanilla Única",
    icon: "💻",
    shortDesc: "Centralización digital de trámites.",
    fullDesc: "La VUCE es la plataforma obligatoria que centraliza los trámites de exportación en Venezuela. Permite al exportador registrarse, solicitar permisos ante diversos ministerios y realizar la Declaración de Aduanas de forma electrónica."
  },
  {
    id: 'sunagro',
    title: "SUNAGRO",
    subtitle: "Gestión Agroalimentaria",
    icon: "🚜",
    shortDesc: "Guía SICA para movilización.",
    fullDesc: "El código SICA es vital para el traslado del café desde las zonas de producción (Lara, Mérida) hasta el puerto. Sin la Guía de Movilización activa, la carga corre riesgo de comiso. Es fundamental mantener los inventarios al día."
  },
  {
    id: 'cvc',
    title: "CVC",
    subtitle: "Corp. Venezolana del Café",
    icon: "📜",
    shortDesc: "Certificados de Origen e Internos.",
    fullDesc: "Emite el Certificado de Demanda Interna Satisfecha (autoriza exportación) y el Certificado de Origen ICO (valida procedencia para beneficios arancelarios internacionales)."
  },
  {
    id: 'insai',
    title: "INSAI",
    subtitle: "Salud Agrícola Integral",
    icon: "🍃",
    shortDesc: "Certificación Fitosanitaria.",
    fullDesc: "Certifica que el grano está libre de plagas cuarentenarias (Broca) y hongos. La inspección se realiza en puerto. Requisito indispensable para el ingreso a Kazajistán."
  },
  {
    id: 'resguardo',
    title: "Resguardo",
    subtitle: "Guardia Nacional",
    icon: "🛡️",
    shortDesc: "Antidrogas Portuaria.",
    fullDesc: "Protocolo de seguridad extremo. Inspección física o por escáner del contenedor para certificar carga limpia. Requiere presencia del agente aduanal antes del precintado."
  }
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedLegal, setSelectedLegal] = useState<typeof LEGAL_DATA[0] | null>(null);
  const [bagType, setBagType] = useState<'yute' | 'grainpro'>('grainpro');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for Technical Report Tabs
  const [activeReportTab, setActiveReportTab] = useState('sourcing');

  // Scroll logic
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        // Simple spy logic could go here
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTechnicalContent = () => {
    switch(activeReportTab) {
      case 'sourcing':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h3 className="text-2xl font-serif text-[#d4a373] mb-4">1. Origen y Sourcing: Bastiones de Calidad</h3>
              <p className="text-stone-300 mb-6 leading-relaxed">
                Para el mercado de Kazajistán, el sourcing se enfoca en altitudes superiores a los <strong className="text-white">1.200 m.s.n.m. (SHB)</strong>.
                La maduración lenta en los Andes garantiza la densidad necesaria para resistir el largo tránsito.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-[#1c1917] p-5 rounded-lg border border-[#78350f]/30">
                    <h4 className="font-bold text-white mb-2">Lara (Sanare)</h4>
                    <p className="text-sm text-stone-400">1.500 msnm. Acidez cítrica limpia, notas de frutos secos. PACCA Sanare.</p>
                 </div>
                 <div className="bg-[#1c1917] p-5 rounded-lg border border-[#78350f]/30">
                    <h4 className="font-bold text-white mb-2">Mérida (Mocotíes)</h4>
                    <p className="text-sm text-stone-400">1.580 msnm. Cuerpo aterciopelado, floral. Clúster del Café.</p>
                 </div>
                 <div className="bg-[#1c1917] p-5 rounded-lg border border-[#78350f]/30">
                    <h4 className="font-bold text-white mb-2">Portuguesa (Biscucuy)</h4>
                    <p className="text-sm text-stone-400">Volumen con calidad (85+ SCA). Eje Chabasquén-Biscucuy.</p>
                 </div>
                 <div className="bg-[#1c1917] p-5 rounded-lg border border-[#78350f]/30">
                    <h4 className="font-bold text-white mb-2">Trujillo (Boconó)</h4>
                    <p className="text-sm text-stone-400">Innovación en procesos Honeys y Naturales.</p>
                 </div>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-[#78350f]/20">
               <table className="w-full text-sm text-left text-stone-300">
                 <thead className="bg-[#291d18] text-[#d4a373] font-serif uppercase text-xs">
                   <tr>
                     <th className="px-4 py-3">Variedad</th>
                     <th className="px-4 py-3">Agronomía</th>
                     <th className="px-4 py-3">Perfil de Taza</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#78350f]/10 bg-[#1c1917]">
                    <tr><td className="px-4 py-3 font-bold">Typica</td><td className="px-4 py-3">Porte alto, delicada.</td><td className="px-4 py-3">Floral, dulce, elegante.</td></tr>
                    <tr><td className="px-4 py-3 font-bold">Bourbon</td><td className="px-4 py-3">Requiere potasio.</td><td className="px-4 py-3">Caramelo, cuerpo sedoso.</td></tr>
                    <tr><td className="px-4 py-3 font-bold">Caturra</td><td className="px-4 py-3">Alta densidad.</td><td className="px-4 py-3">Acidez cítrica brillante.</td></tr>
                    <tr><td className="px-4 py-3 font-bold">Monte Claro</td><td className="px-4 py-3">Resistente (INIA).</td><td className="px-4 py-3">Chocolate oscuro y nueces.</td></tr>
                 </tbody>
               </table>
            </div>
          </div>
        );
      case 'quality':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-2xl font-serif text-[#d4a373] mb-4">2. Estándares SCA y Laboratorio</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1c1917] p-6 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-3 mb-4">
                        <Scale className="text-[#d4a373]" />
                        <h4 className="text-xl font-bold text-white">Análisis Físico (350g)</h4>
                    </div>
                    <ul className="space-y-3 text-stone-300 text-sm">
                        <li className="flex justify-between border-b border-stone-800 pb-2">
                            <span>Humedad Interna</span>
                            <span className="font-bold text-[#d4a373]">10% - 12%</span>
                        </li>
                         <li className="flex justify-between border-b border-stone-800 pb-2">
                            <span>Actividad de Agua (aw)</span>
                            <span className="font-bold text-red-400">&lt; 0.70</span>
                        </li>
                         <li className="flex justify-between border-b border-stone-800 pb-2">
                            <span>Tamizado (Malla)</span>
                            <span className="font-bold text-white">90% sobre Malla 16/17</span>
                        </li>
                         <li className="flex justify-between pb-2">
                            <span>Defectos Cat 1 / Cat 2</span>
                            <span className="font-bold text-white">0 / Max 5</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-[#1c1917] p-6 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-3 mb-4">
                        <Microscope className="text-[#d4a373]" />
                        <h4 className="text-xl font-bold text-white">Laboratorio (Req. Euroasiático)</h4>
                    </div>
                     <div className="space-y-4">
                        <div className="p-3 bg-[#291d18] rounded border-l-2 border-[#d4a373]">
                            <strong className="block text-white mb-1">Ocratoxina A (OTA)</strong>
                            <p className="text-xs text-stone-400">Límite Máximo: <span className="text-[#d4a373] font-bold">5 ppb</span>. Crítico para Unión Económica Euroasiática.</p>
                        </div>
                        <div className="p-3 bg-[#291d18] rounded border-l-2 border-[#d4a373]">
                             <strong className="block text-white mb-1">Trazas de Plaguicidas</strong>
                             <p className="text-xs text-stone-400">Cumplimiento estricto límites FAO y normativa kazaja.</p>
                        </div>
                    </div>
                </div>
             </div>

             <div className="bg-[#1c1917] p-6 rounded-xl border border-stone-800">
                 <h4 className="text-lg font-bold text-white mb-4">Defectos Críticos (SCA)</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                     <div className="p-2 border border-red-900/50 rounded bg-red-900/10">
                         <strong className="text-red-400 block mb-1">Grano Negro</strong>
                         <p className="text-stone-500">Sobrefermentación. Sabor fenol.</p>
                     </div>
                     <div className="p-2 border border-red-900/50 rounded bg-red-900/10">
                         <strong className="text-red-400 block mb-1">Grano Agrio</strong>
                         <p className="text-stone-500">Retraso despulpado. Sabor vinagre.</p>
                     </div>
                     <div className="p-2 border border-red-900/50 rounded bg-red-900/10">
                         <strong className="text-red-400 block mb-1">Hongo</strong>
                         <p className="text-stone-500">Humedad alta. Sabor tierra/moho.</p>
                     </div>
                      <div className="p-2 border border-amber-900/50 rounded bg-amber-900/10">
                         <strong className="text-amber-400 block mb-1">Grano Partido</strong>
                         <p className="text-stone-500">Trilla defectuosa. Tueste desigual.</p>
                     </div>
                 </div>
             </div>
          </div>
        );
       case 'packaging':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-2xl font-serif text-[#d4a373] mb-4">3. Embalaje para Tránsito Transcontinental</h3>
             <p className="text-stone-300 mb-6">El "Sudor del Contenedor" en el paso del Mar Negro al Caspio es el enemigo principal. La solución obligatoria es el sistema de barrera.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-[#d4a373] to-[#78350f] rounded-xl blur opacity-25"></div>
                     <div className="relative bg-[#1c1917] p-6 rounded-xl h-full">
                         <Package className="w-10 h-10 text-[#d4a373] mb-4" />
                         <h4 className="text-xl font-bold text-white mb-2">Unidad de Empaque</h4>
                         <ul className="space-y-2 text-stone-400 text-sm">
                             <li><Check className="inline w-4 h-4 text-green-500 mr-2"/>Saco externo: Yute/Fique (60kg).</li>
                             <li><Check className="inline w-4 h-4 text-green-500 mr-2"/>Saco interno: <strong>Alta Barrera (GrainPro/Ecotact)</strong>.</li>
                             <li><Check className="inline w-4 h-4 text-green-500 mr-2"/>Atmósfera modificada (preservación +12 meses).</li>
                         </ul>
                     </div>
                 </div>
                 
                 <div className="relative bg-[#1c1917] p-6 rounded-xl border border-stone-800 h-full">
                     <Ship className="w-10 h-10 text-stone-500 mb-4" />
                     <h4 className="text-xl font-bold text-white mb-2">Configuración Contenedor (20' DV)</h4>
                      <ul className="space-y-2 text-stone-400 text-sm">
                             <li><Check className="inline w-4 h-4 text-[#d4a373] mr-2"/><strong>Kraft Liner:</strong> Recubrimiento cartón en paredes.</li>
                             <li><Check className="inline w-4 h-4 text-[#d4a373] mr-2"/><strong>Silicagel:</strong> Absorbedores de humedad (2kg/bolsa).</li>
                             <li><Check className="inline w-4 h-4 text-[#d4a373] mr-2"/>Paletización: 10 paletas (NIMF-15).</li>
                             <li><Check className="inline w-4 h-4 text-[#d4a373] mr-2"/>Peso Neto: 12 - 15 TM aprox.</li>
                         </ul>
                 </div>
             </div>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-2xl font-serif text-[#d4a373] mb-4">4. Marco Legal y Permisología</h3>
             
             <div className="relative border-l border-[#78350f]/30 ml-4 space-y-8">
                 {LEGAL_DATA.map((item, idx) => (
                     <div key={item.id} className="relative pl-8">
                         <div className="absolute -left-3 top-0 w-6 h-6 bg-[#1c1917] border border-[#d4a373] rounded-full flex items-center justify-center text-xs text-[#d4a373] font-bold">
                             {idx + 1}
                         </div>
                         <h4 className="text-lg font-bold text-white">{item.title} <span className="text-stone-500 text-sm font-normal">- {item.subtitle}</span></h4>
                         <p className="text-stone-400 text-sm mt-2">{item.fullDesc}</p>
                     </div>
                 ))}
             </div>
          </div>
        );
       case 'logistics':
        return (
           <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-2xl font-serif text-[#d4a373] mb-4">5. Logística: Middle Corridor</h3>
             <p className="text-stone-300 text-sm mb-6 bg-[#291d18] p-4 rounded border-l-4 border-[#d4a373]">
                 Kazajistán es una nación "Landlocked" (sin salida al mar). La ruta requiere transbordo en el Mar Negro y cruce en ferry por el Mar Caspio.
             </p>

             <div className="space-y-4">
                 {LOGISTICS_ROUTE.map((step) => (
                     <div key={step.id} className="flex gap-4 items-center bg-[#1c1917] p-4 rounded-lg border border-stone-800">
                         <div className="w-10 h-10 rounded-full bg-[#0f0a08] flex items-center justify-center text-[#d4a373] shrink-0 font-bold border border-[#d4a373]/30">
                             {step.id}
                         </div>
                         <div className="flex-1">
                             <div className="flex justify-between mb-1">
                                 <h4 className="text-white font-bold">{step.location}</h4>
                                 <span className="text-xs text-[#d4a373] bg-[#d4a373]/10 px-2 py-0.5 rounded">{step.duration}</span>
                             </div>
                             <p className="text-xs text-stone-500">{step.action} - {step.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                 <div className="bg-[#1c1917] p-4 rounded border border-stone-800">
                     <strong className="text-white block mb-2">FCA Puerto Cabello</strong>
                     <p className="text-xs text-stone-500">Riesgo transfiere al cargar en buque. Comprador controla flete.</p>
                 </div>
                 <div className="bg-[#1c1917] p-4 rounded border border-[#d4a373] shadow-[0_0_15px_rgba(212,163,115,0.1)]">
                     <strong className="text-[#d4a373] block mb-2">CIP Almaty (Recomendado)</strong>
                     <p className="text-xs text-stone-300">Exportador paga flete y seguro hasta destino final. Mayor control sobre la calidad.</p>
                 </div>
                 <div className="bg-[#1c1917] p-4 rounded border border-stone-800">
                     <strong className="text-white block mb-2">DAP Almaty</strong>
                     <p className="text-xs text-stone-500">Máximo riesgo para exportador. Entrega en almacén destino sin descargar.</p>
                 </div>
             </div>
           </div>
        );
      case 'commercial':
        return (
           <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-2xl font-serif text-[#d4a373] mb-4">6. Estrategia Comercial y Riesgos</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#1c1917] p-6 rounded-xl border border-stone-800">
                     <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="text-[#d4a373]"/> Estructura de Precio</h4>
                     <ul className="space-y-4 text-sm text-stone-300">
                         <li className="flex justify-between">
                             <span>Precio Base</span>
                             <span className="font-bold">Bolsa NY "C" Market</span>
                         </li>
                         <li className="flex justify-between text-[#d4a373]">
                             <span>Diferencial Calidad (Premium)</span>
                             <span className="font-bold">+20 a +60 cts/lb</span>
                         </li>
                         <li className="flex justify-between">
                             <span>Recargo Logístico</span>
                             <span className="font-bold">+25 a +40 cts/lb</span>
                         </li>
                     </ul>
                 </div>

                 <div className="bg-[#1c1917] p-6 rounded-xl border border-stone-800">
                     <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500"/> Gestión de Riesgos</h4>
                     <div className="space-y-3">
                         <div className="p-3 bg-red-900/10 border border-red-900/30 rounded">
                             <strong className="text-red-400 text-xs uppercase block mb-1">Riesgo Financiero</strong>
                             <p className="text-xs text-stone-400">Usar Cartas de Crédito Confirmadas (Bancos Turquía/EAU) para evitar bloqueos por sanciones.</p>
                         </div>
                         <div className="p-3 bg-blue-900/10 border border-blue-900/30 rounded">
                             <strong className="text-blue-400 text-xs uppercase block mb-1">Cumplimiento OFAC</strong>
                             <p className="text-xs text-stone-400">Verificar Licencias Generales (ej. GL 46). Análisis de beneficiarios finales.</p>
                         </div>
                     </div>
                 </div>
             </div>
           </div>
        );
      default: return null;
    }
  };

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen bg-[#0f0a08] font-sans text-[#e7e5e4]">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#0f0a08]/80 backdrop-blur-md border-b border-[#d4a373]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
                <span className="text-2xl">☕</span>
                <span className="text-xl font-serif text-white tracking-widest font-bold">VENE<span className="text-[#d4a373]">KAZ</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.15em] uppercase text-stone-400">
                {['Origen', 'Calidad', 'Logistica', 'Ruta', 'Legal', 'Precio'].map((item) => (
                    <button 
                        key={item} 
                        onClick={() => scrollTo(item.toLowerCase())}
                        className="hover:text-[#d4a373] transition-colors relative group py-2"
                    >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a373] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-[#d4a373]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#1c1917] border-b border-[#78350f] animate-in slide-in-from-top-5">
                <div className="flex flex-col p-6 gap-4 text-center">
                    {['Origen', 'Calidad', 'Logistica', 'Ruta', 'Legal', 'Precio'].map((item) => (
                        <button 
                            key={item} 
                            onClick={() => scrollTo(item.toLowerCase())}
                            className="text-white uppercase tracking-widest text-sm py-2 hover:bg-[#291d18]"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0">
                <img 
                    src={HERO_IMAGE} 
                    alt="Venezuelan Andes Coffee Landscape" 
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a08] via-[#0f0a08]/60 to-transparent z-10"></div>
        </div>

        <div className="relative z-10 px-6 text-center max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
             <p className="font-script text-3xl md:text-5xl text-[#d4a373] animate-pulse">De los Andes a la Estepa</p>
             <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
                 Café de Especialidad <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a373] to-[#a67c52]">Hoja de Ruta 2026</span>
             </h1>
             <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
                 Un puente estratégico de calidad, trazabilidad y logística multimodal entre Venezuela y Kazajistán.
             </p>
             
             <div className="flex flex-col md:flex-row justify-center gap-4 pt-8">
                 <button onClick={() => scrollTo('origen')} className="px-8 py-3 bg-[#d4a373] text-[#0f0a08] rounded-full font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(212,163,115,0.4)]">
                     Iniciar Recorrido
                 </button>
                 <button onClick={() => scrollTo('technical')} className="px-8 py-3 border border-[#d4a373] text-[#d4a373] rounded-full font-bold hover:bg-[#d4a373]/10 transition-all">
                     Ver Informe Técnico
                 </button>
             </div>
        </div>
      </section>

      {/* --- Origen Section --- */}
      <section id="origen" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                  <div className="md:w-1/2 space-y-6">
                      <span className="text-[#d4a373] uppercase tracking-widest font-bold text-sm">El Terroir</span>
                      <h2 className="text-4xl md:text-5xl font-serif text-white">Donde nace la <br/><span className="italic text-[#d4a373]">Excelencia</span></h2>
                      <p className="text-stone-400 text-lg leading-relaxed text-justify">
                          En las altas montañas de los Andes venezolanos, por encima de los 1.200 msnm, se cultiva un grano denso, complejo y dulce. 
                          Para el exigente mercado de Kazajistán, seleccionamos exclusivamente lotes SHB (Strictly Hard Bean) de Mérida y Lara, 
                          donde la maduración lenta concentra azúcares y acidez brillante.
                      </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4">
                      {ALBUM_IMAGES.slice(0,2).map((img, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden aspect-[3/4] relative group shadow-2xl bg-stone-900">
                              <img 
                                src={img.src} 
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 z-10">
                                  <p className="text-[#d4a373] font-serif text-lg">{img.title}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Interactive Varieties */}
              <div className="grid md:grid-cols-4 gap-4">
                  {COFFEE_VARIETIES.map((v, i) => (
                      <div key={i} className="glass-panel p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 group">
                          <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#d4a373]">{v.name}</h3>
                          <div className="h-0.5 w-12 bg-[#d4a373] mb-4"></div>
                          <p className="text-sm text-stone-400 mb-4">{v.profile}</p>
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                              <span>Acidez</span>
                              <div className="w-16 h-1 bg-[#291d18] rounded-full overflow-hidden">
                                  <div className="h-full bg-[#d4a373]" style={{width: `${v.acidity}%`}}></div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- Calidad Section (Comparison) --- */}
      <section id="calidad" className="py-24 bg-[#151210] px-6">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <span className="text-[#d4a373] uppercase tracking-widest font-bold text-sm">Protocolos SCA</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Preservación Total</h2>
                  <p className="text-stone-400 mt-4 max-w-2xl mx-auto">El viaje transcontinental exige tecnología de empaque superior. Compara las opciones.</p>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-center">
                  
                  {/* Toggle Controls */}
                  <div className="flex-1 w-full lg:w-auto">
                      <div className="bg-[#1c1917] p-2 rounded-full flex relative mb-8 border border-[#78350f]/30">
                          <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-[#d4a373] rounded-full transition-all duration-300 ${bagType === 'grainpro' ? 'translate-x-full left-2' : 'left-2'}`}></div>
                          <button onClick={() => setBagType('yute')} className={`flex-1 py-3 text-center relative z-10 font-bold tracking-widest transition-colors ${bagType === 'yute' ? 'text-[#0f0a08]' : 'text-stone-400'}`}>SACO TRADICIONAL</button>
                          <button onClick={() => setBagType('grainpro')} className={`flex-1 py-3 text-center relative z-10 font-bold tracking-widest transition-colors ${bagType === 'grainpro' ? 'text-[#0f0a08]' : 'text-stone-400'}`}>ALTA BARRERA</button>
                      </div>

                      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                          {bagType === 'yute' ? (
                              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                  <div className="flex items-start gap-4 text-stone-400">
                                      <X className="text-red-500 shrink-0" />
                                      <p>Permite intercambio de oxígeno y humedad (oxidación acelerada).</p>
                                  </div>
                                  <div className="flex items-start gap-4 text-stone-400">
                                      <X className="text-red-500 shrink-0" />
                                      <p>Vida útil sensorial limitada (3-4 meses).</p>
                                  </div>
                                  <div className="flex items-start gap-4 text-stone-400">
                                      <X className="text-red-500 shrink-0" />
                                      <p>Requiere fumigación química (Fosfina) para plagas.</p>
                                  </div>
                              </div>
                          ) : (
                              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                  <div className="flex items-start gap-4 text-white">
                                      <ShieldCheck className="text-[#d4a373] shrink-0" />
                                      <p>Hermético: Protege contra el "sudor del contenedor" en el mar.</p>
                                  </div>
                                  <div className="flex items-start gap-4 text-white">
                                      <ShieldCheck className="text-[#d4a373] shrink-0" />
                                      <p>Preserva puntaje SCA > 84 por más de 12 meses.</p>
                                  </div>
                                  <div className="flex items-start gap-4 text-white">
                                      <ShieldCheck className="text-[#d4a373] shrink-0" />
                                      <p>Control orgánico de plagas por asfixia (sin químicos).</p>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Visual Chart */}
                  <div className="flex-1 w-full h-[400px]">
                      <h3 className="text-center font-serif text-white mb-6">Curva de Frescura (Meses)</h3>
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                              { name: 'Mes 1', Yute: 100, GrainPro: 100 },
                              { name: 'Mes 3', Yute: 85, GrainPro: 99 },
                              { name: 'Mes 6', Yute: 60, GrainPro: 98 },
                              { name: 'Mes 12', Yute: 40, GrainPro: 95 },
                          ]}>
                              <XAxis dataKey="name" stroke="#57534e" />
                              <RechartsTooltip 
                                contentStyle={{backgroundColor: '#1c1917', borderColor: '#d4a373', color: '#fff'}}
                                itemStyle={{color: '#d4a373'}}
                              />
                              <Bar dataKey="Yute" fill="#57534e" radius={[4,4,0,0]} />
                              <Bar dataKey="GrainPro" fill="#d4a373" radius={[4,4,0,0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Logistica & Ruta Section --- */}
      <section id="ruta" className="py-24 px-6 relative overflow-hidden">
          {/* Background Map Effect */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                  <span className="text-[#d4a373] uppercase tracking-widest font-bold text-sm">Middle Corridor</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">La Travesía de la Seda</h2>
                  <p className="text-stone-400 mt-4">Conectando dos mares, dos continentes y tres modos de transporte.</p>
              </div>

              <div className="relative">
                  {/* Connecting Line Desktop */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent -translate-y-1/2"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                      {LOGISTICS_ROUTE.map((step, idx) => {
                          let Icon = Anchor;
                          if (step.transport === 'rail') Icon = Train;
                          if (step.transport === 'road') Icon = Truck;
                          
                          return (
                              <div key={step.id} className="relative group">
                                  {/* Icon Node */}
                                  <div className="w-16 h-16 mx-auto bg-[#0f0a08] border-2 border-[#d4a373] rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,163,115,0.3)]">
                                      <Icon className="text-[#d4a373] w-6 h-6" />
                                  </div>
                                  
                                  {/* Card */}
                                  <div className="mt-6 bg-[#1c1917] p-4 rounded-xl border border-[#78350f]/20 text-center hover:border-[#d4a373] transition-colors">
                                      <div className="text-xs text-[#d4a373] font-bold uppercase mb-2">{step.duration}</div>
                                      <h3 className="text-white font-bold mb-1">{step.location.split(' ')[0]}</h3>
                                      <p className="text-stone-500 text-xs">{step.action}</p>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      </section>

      {/* --- Legal Section (Interactive Cards) --- */}
      <section id="legal" className="py-24 bg-[#151210] px-6">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif text-white mb-12 text-center">Marco Regulatorio <span className="text-[#d4a373]">2026</span></h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {LEGAL_DATA.map((item) => (
                      <button 
                          key={item.id}
                          onClick={() => setSelectedLegal(item)}
                          className="text-left glass-panel p-8 rounded-2xl hover:bg-[#291d18] transition-all duration-300 group relative overflow-hidden"
                      >
                          <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-xs text-[#d4a373] uppercase tracking-wider mb-4">{item.subtitle}</p>
                          <p className="text-stone-400 text-sm leading-relaxed">{item.shortDesc}</p>
                          
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4a373]">
                              <ChevronRight />
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      </section>

      {/* --- Album Section --- */}
      <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif text-white mb-12 text-center">Galería Operativa</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
                  {ALBUM_IMAGES.map((img, i) => (
                      <div key={i} className={`rounded-xl overflow-hidden relative group bg-stone-900 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                          <img 
                            src={img.src} 
                            alt={img.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 z-10">
                              <h3 className="text-[#d4a373] font-serif text-xl">{img.title}</h3>
                              <p className="text-stone-300 text-sm">{img.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- Technical Section (The Deep Dive - Premium Tabbed Interface) --- */}
      <section id="technical" className="py-24 bg-[#0f0a08] px-6 border-t border-[#d4a373]/20">
          <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                  <div className="h-px bg-stone-700 flex-1"></div>
                  <span className="text-[#d4a373] font-bold uppercase tracking-[0.2em] text-sm">Documentación Técnica</span>
                  <div className="h-px bg-stone-700 flex-1"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sidebar Navigation for Report */}
                  <div className="lg:w-1/4">
                      <h2 className="text-3xl font-serif text-white mb-8">Informe <br/>Operativo</h2>
                      <div className="flex flex-col gap-2">
                        {[
                          { id: 'sourcing', label: '1. Origen & Sourcing', icon: MapPin },
                          { id: 'quality', label: '2. Estándares Calidad', icon: Scale },
                          { id: 'packaging', label: '3. Embalaje Técnico', icon: Package },
                          { id: 'legal', label: '4. Marco Legal', icon: BookOpen },
                          { id: 'logistics', label: '5. Logística', icon: Globe },
                          { id: 'commercial', label: '6. Comercialización', icon: TrendingUp },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveReportTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-300 text-left ${
                              activeReportTab === tab.id 
                              ? 'bg-[#d4a373] text-[#0f0a08] font-bold shadow-[0_0_15px_rgba(212,163,115,0.4)]' 
                              : 'text-stone-400 hover:bg-[#1c1917] hover:text-white'
                            }`}
                          >
                            <tab.icon className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-wide">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                  </div>

                  {/* Content Area */}
                  <div className="lg:w-3/4 bg-[#151210] p-8 rounded-2xl border border-[#78350f]/20 min-h-[600px]">
                      {renderTechnicalContent()}
                  </div>
              </div>
          </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0f0a08] pt-20 pb-10 px-6 border-t border-[#d4a373]/10">
          <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl font-serif text-[#d4a373] mb-6">VENEKAZ</h2>
              <div className="flex justify-center gap-8 mb-8 text-sm uppercase tracking-widest text-stone-500">
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Contacto</a>
              </div>
              <p className="text-xs text-stone-600">© 2026 VeneKaz Export Guide. All Rights Reserved.</p>
          </div>
      </footer>

      {/* --- Modals & Overlays --- */}
      {selectedLegal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedLegal(null)}>
            <div className="bg-[#1c1917] border border-[#d4a373]/30 max-w-lg w-full p-8 rounded-2xl relative shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <button onClick={() => setSelectedLegal(null)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X /></button>
                <div className="text-5xl mb-4">{selectedLegal.icon}</div>
                <h3 className="text-3xl font-serif text-white mb-1">{selectedLegal.title}</h3>
                <p className="text-[#d4a373] uppercase text-xs tracking-widest mb-6">{selectedLegal.subtitle}</p>
                <div className="space-y-4 text-stone-300 font-light">
                    <p>{selectedLegal.fullDesc}</p>
                    <div className="bg-[#0f0a08] p-4 rounded-lg border border-[#78350f]/30">
                        <strong className="text-[#d4a373] block mb-1 text-xs uppercase">Importancia Operativa</strong>
                        {selectedLegal.shortDesc}
                    </div>
                </div>
            </div>
        </div>
      )}

      <FloatingChat />
    </div>
  );
};

export default App;