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

export interface User {
  name: string;
  username: string;
  password: string;
  phone?: string;
  location?: string;
  joinDate: string;
}

export interface SoilTest {
  id: number;
  pH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  date: string;
}

export interface ForumPost {
  id: number;
  author: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export interface Expert {
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: string;
}

export interface GovernmentScheme {
  title: string;
  description: string;
  link: string;
}

export interface YieldPrediction {
  factors: {
    temperature: number;
    rainfall: number;
    humidity: number;
    soilMoisture: number;
  };
  overallScore: number;
  estimatedYield: string;
  confidence: string;
}