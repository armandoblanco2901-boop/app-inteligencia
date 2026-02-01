export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  SOURCING = 'SOURCING',
  QUALITY = 'QUALITY',
  LOGISTICS = 'LOGISTICS',
  COMMERCIAL = 'COMMERCIAL',
  ASSISTANT = 'ASSISTANT'
}

export interface VarietyData {
  name: string;
  agronomy: string;
  profile: string;
  acidity: number;
  body: number;
  aroma: number;
}

export interface DefectData {
  name: string;
  category: number; // 1 or 2
  description: string;
  impact: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface RouteStep {
  id: number;
  location: string;
  action: string;
  transport: 'sea' | 'rail' | 'road' | 'multimodal';
  duration: string;
  description: string;
}
