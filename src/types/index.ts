export interface Translation {
  [key: string]: string;
}

export interface Resources {
  [language: string]: {
    translation: Translation;
  };
}

export interface Disease {
  name: string;
  probability: number;
  severity: 'Low' | 'Medium' | 'High';
}

export interface CropPrediction {
  cropType: string;
  confidence: number;
  diseases: Disease[];
  recommendations: string[];
}

export interface NASAData {
  ndvi: number;
  temperature: number;
  soilMoisture: number;
  precipitation: number;
}

export interface WeatherDay {
  day: string;
  temp: string;
  rain: string;
  icon: string;
}

export interface Advisory {
  title: string;
  contact?: string;
  availability?: string;
  nextSession?: string;
  specialty?: string;
}

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'info' | 'success' | 'error';
}