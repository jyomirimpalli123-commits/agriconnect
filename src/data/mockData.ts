import type { Disease, NASAData, WeatherDay, Advisory } from '../types';

export const mockData = {
  crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Tomato'],
  
  diseases: {
    Rice: [
      { name: 'Blast', probability: 0.3, severity: 'High' as const },
      { name: 'Bacterial Blight', probability: 0.2, severity: 'Medium' as const }
    ],
    Wheat: [
      { name: 'Rust', probability: 0.4, severity: 'High' as const },
      { name: 'Smut', probability: 0.1, severity: 'Low' as const }
    ],
    Cotton: [
      { name: 'Bollworm', probability: 0.5, severity: 'High' as const },
      { name: 'Leaf Curl Virus', probability: 0.2, severity: 'Medium' as const }
    ],
    Sugarcane: [
      { name: 'Red Rot', probability: 0.3, severity: 'Medium' as const },
      { name: 'Smut', probability: 0.2, severity: 'Medium' as const }
    ],
    Tomato: [
      { name: 'Early Blight', probability: 0.4, severity: 'High' as const },
      { name: 'Late Blight', probability: 0.3, severity: 'High' as const }
    ]
  } as Record<string, Disease[]>,
  
  recommendations: {
    Rice: [
      'Apply Tricyclazole for blast control',
      'Ensure proper water management',
      'Use resistant varieties in next season'
    ],
    Wheat: [
      'Apply Propiconazole for rust control',
      'Remove infected plants',
      'Practice crop rotation'
    ],
    Cotton: [
      'Use recommended insecticides for bollworm',
      'Remove virus-affected plants',
      'Use yellow sticky traps for monitoring'
    ],
    Sugarcane: [
      'Use disease-free setts for planting',
      'Practice crop rotation',
      'Avoid waterlogging conditions'
    ],
    Tomato: [
      'Apply Chlorothalonil for blight control',
      'Practice staking for better air circulation',
      'Remove infected leaves promptly'
    ]
  } as Record<string, string[]>,
  
  nasaData: {
    ndvi: 0.72,
    temperature: 28.5,
    soilMoisture: 0.45,
    precipitation: 125
  } as NASAData,
  
  weather: [
    { day: 'Today', temp: '28°C', rain: '30%', icon: 'cloud-sun' },
    { day: 'Tomorrow', temp: '27°C', rain: '60%', icon: 'cloud-rain' },
    { day: 'Day 3', temp: '26°C', rain: '80%', icon: 'cloud-showers-heavy' },
    { day: 'Day 4', temp: '29°C', rain: '10%', icon: 'sun' }
  ] as WeatherDay[],
  
  advisories: [
    { title: 'Kisan Call Center', contact: '1800-180-1551', availability: '24/7 Helpline' },
    { title: 'Krishi Vigyan Kendra - Pune', nextSession: 'Aug 22, 2024 - 10:00 AM', specialty: 'Soil Testing' }
  ] as Advisory[]
};