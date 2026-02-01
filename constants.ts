import { VarietyData, RouteStep, DefectData } from './types';

// Static High-Quality Images (Pinterest & Unsplash)
export const HERO_IMAGE = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061"; // Dark moody coffee plant/nature

export const ALBUM_IMAGES = [
    { 
        src: "https://i.pinimg.com/1200x/60/97/2c/60972c68f511e7469e27c33da8a1b4fb.jpg", 
        title: "Cosecha Manual", 
        desc: "Selección grano a grano en los Andes." 
    },
    { 
        src: "https://images.unsplash.com/photo-1642602737672-880942b083b4?q=80&w=1000&auto=format&fit=crop", 
        title: "Beneficio Húmedo", 
        desc: "Fermentación controlada para perfiles únicos." 
    },
    { 
        src: "https://i.pinimg.com/736x/02/cd/6d/02cd6df9d7840f782b039651542d6580.jpg", 
        title: "Control de Calidad", 
        desc: "Cata SCA rigurosa antes del embarque." 
    },
    { 
        src: "https://i.pinimg.com/736x/65/64/6a/65646a3ef56f6640dd9702d50f6a33ba.jpg", 
        title: "Logística Portuaria", 
        desc: "Preparación para la ruta transoceánica." 
    },
];

export const REPORT_CONTEXT = `
INFORME TÉCNICO OPERATIVO: ESTRATEGIAS DE SOURCING, CALIDAD, LOGÍSTICA Y COMERCIALIZACIÓN PARA LA EXPORTACIÓN DE CAFÉ VERDE DE ESPECIALIDAD DESDE VENEZUELA HACIA KAZAJISTÁN

1. CONTEXTO
La industria global del café ha transitado hacia un ecosistema de especialidad. Venezuela se posiciona como origen de alto potencial para abastecer a Kazajistán.

2. ORIGEN Y SOURCING (CARACTERIZACIÓN)
- Geografía: Lara (Sanare, 1500 msnm), Mérida (Mocotíes, 1580 msnm), Portuguesa (Biscucuy), Trujillo (Boconó).
- Altitud: > 1.200 msnm (Strictly Hard Bean - SHB).
- Variedades: Typica (Floral), Bourbon (Dulce/Caramelo), Caturra (Cítrico), Catuaí (Frutos secos), Monte Claro (Chocolate/Nueces).
- Estructura: PACCAS (Sanare, Chabasquén), Cooperativas de Especialidad y Alianzas de Exportación.

3. ESTÁNDARES DE CALIDAD (SCA & LABORATORIO)
- Análisis Físico (350g):
  - Humedad: 10% - 12%.
  - Actividad de Agua (aw): < 0.70 (Crítico).
  - Tamizado: 90% sobre malla 16/17.
  - Defectos: 0 Cat 1, Máx 5 Cat 2.
- Análisis Sensorial: > 80 puntos (Recomendado > 84 para compensar logística).
- Laboratorio (Requisito UEE/Kazajistán): Ocratoxina A (OTA) < 5 ppb; Trazas de Plaguicidas según FAO.

4. EMBALAJE TRANSCONTINENTAL
- Sistema Doble: Saco Yute 60kg + Bolsa Alta Barrera (Ecotact/GrainPro).
- Contenedor: 20' Dry Van con Kraft Liner y Silicagel (Absorbedores de humedad).
- Estiba: Paletizada (NIMF-15), 10 paletas, aprox 12-15 TM.

5. MARCO LEGAL (VENEZUELA)
- VUCE: Registro y trámites digitales.
- SUNAGRO: Código SICA (Movilización).
- CVC: Certificados de Demanda Interna Satisfecha y Origen ICO.
- INSAI: Certificado Fitosanitario (Inspección puerto).
- SENCAMER: Calidad nacional.
- Resguardo (GNB): Antidrogas.

6. LOGÍSTICA (MIDDLE CORRIDOR)
- Ruta: Puerto Cabello -> Algeciras/Malta -> Poti (Georgia) -> Bakú (Azerbaiyán) -> Aktau (Kazajistán) -> Almaty.
- Tiempos: Marítimo 35-45 días + Multimodal 15-20 días. Total: ~60 días.
- Incoterms 2020:
  - CIP Almaty (Recomendado): Exportador paga flete y seguro hasta destino.
  - FCA Puerto Cabello.
  - DAP Almaty.

7. COMERCIALIZACIÓN
- Precios Ref 2025/26: Bolsa NY + Diferencial (+20 a +60 cts/lb) + Logística.
- Riesgos:
  - Pago: Usar Cartas de Crédito Confirmadas (Bancos Turquía/EAU).
  - Calidad: Inspección Pre-embarque (SGS).
  - Sanciones: Cumplimiento OFAC (Licencia General 46).
`;

export const COFFEE_VARIETIES: VarietyData[] = [
  { name: 'Typica', agronomy: 'Porte alto, delicada.', profile: 'Floral, dulce, elegante y limpio.', acidity: 95, body: 60, aroma: 95 },
  { name: 'Bourbon', agronomy: 'Exigente en nutrición.', profile: 'Dulzor a caramelo, cuerpo sedoso.', acidity: 85, body: 80, aroma: 90 },
  { name: 'Caturra', agronomy: 'Alta densidad.', profile: 'Acidez cítrica brillante, notas rojas.', acidity: 95, body: 70, aroma: 85 },
  { name: 'Monte Claro', agronomy: 'Resistente (INIA).', profile: 'Chocolate oscuro, especias y nueces.', acidity: 75, body: 90, aroma: 80 },
];

export const DEFECTS_LIST: DefectData[] = [
  { name: 'Grano Negro', category: 1, description: 'Sobrefermentación o suelo.', impact: 'Sabor desagradable, medicinal.' },
  { name: 'Grano Agrio', category: 1, description: 'Retraso en despulpado.', impact: 'Vinagre, cebolla, fermento.' },
  { name: 'Daño por Hongo', category: 1, description: 'Humedad en almacén.', impact: 'Tierra, moho, fenol.' },
  { name: 'Materia Extraña', category: 1, description: 'Piedras, palos.', impact: 'Daño a molinos, contaminación.' },
];

export const LOGISTICS_ROUTE: RouteStep[] = [
  { id: 1, location: 'Puerto Cabello (VZ)', action: 'Zarpe & Aduana', transport: 'sea', duration: 'Día 1', description: 'Inspección Antidrogas y Carga Segura.' },
  { id: 2, location: 'Algeciras (ES)', action: 'Transbordo', transport: 'sea', duration: '+18 días', description: 'Conexión estratégica hacia el Mediterráneo.' },
  { id: 3, location: 'Poti (Georgia)', action: 'Llegada Mar Negro', transport: 'rail', duration: '+40 días', description: 'Inicio del Corredor Ferroviario del Cáucaso.' },
  { id: 4, location: 'Bakú -> Aktau', action: 'Cruce Mar Caspio', transport: 'multimodal', duration: '+45 días', description: 'Ferry logístico hacia Asia Central.' },
  { id: 5, location: 'Almaty (KZ)', action: 'Entrega Final', transport: 'road', duration: '+55 días', description: 'Nacionalización e Incoterm CIP.' },
];
