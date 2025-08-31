import type { Disease, NASAData, WeatherDay, Advisory, SoilTest, ForumPost, Expert, GovernmentScheme } from '../types';

export const mockData = {
  crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Tomato', 'Maize', 'Soybean'],
  fields: ['North Field', 'South Field', 'East Field', 'West Field', 'Central Field'],
  
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
    ],
    Maize: [
      { name: 'Corn Borer', probability: 0.3, severity: 'Medium' as const },
      { name: 'Leaf Blight', probability: 0.2, severity: 'Medium' as const }
    ],
    Soybean: [
      { name: 'Rust', probability: 0.3, severity: 'High' as const },
      { name: 'Pod Borer', probability: 0.2, severity: 'Medium' as const }
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
    ],
    Maize: [
      'Use pheromone traps for corn borer',
      'Apply recommended fungicides for blight',
      'Ensure proper spacing between plants'
    ],
    Soybean: [
      'Apply rust-resistant varieties',
      'Monitor for pod borer damage',
      'Practice integrated pest management'
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
  ] as Advisory[],
  
  soilTests: [] as SoilTest[],
  
  forumPosts: [
    { 
      id: 1, 
      author: 'Rajesh Kumar', 
      time: '2 hours ago', 
      content: 'Has anyone tried the new organic fertilizer from the government scheme? How were the results?',
      likes: 5,
      comments: 3
    },
    { 
      id: 2, 
      author: 'Priya Singh', 
      time: '1 day ago', 
      content: 'Looking for advice on dealing with pest infestation in my tomato crop. Any organic solutions?',
      likes: 8,
      comments: 6
    },
    { 
      id: 3, 
      author: 'Amir Khan', 
      time: '3 days ago', 
      content: 'Just attended a great workshop on drip irrigation techniques at KVK. Highly recommend!',
      likes: 12,
      comments: 4
    }
  ] as ForumPost[],
  
  experts: [
    {
      name: 'Dr. Sunil Sharma',
      specialty: 'Soil Science & Fertilizers',
      rating: 4.8,
      experience: '15 years',
      price: '₹499/hour'
    },
    {
      name: 'Dr. Meera Patel',
      specialty: 'Plant Pathology',
      rating: 4.9,
      experience: '12 years',
      price: '₹599/hour'
    },
    {
      name: 'Prof. Ravi Singh',
      specialty: 'Crop Management',
      rating: 4.7,
      experience: '20 years',
      price: '₹699/hour'
    }
  ] as Expert[],
  
  governmentSchemes: [
    {
      title: 'PM-KISAN Scheme',
      description: 'Financial assistance of ₹6,000 per year to all farmer families',
      link: '#'
    },
    {
      title: 'Soil Health Card Scheme',
      description: 'Provides soil health cards to farmers every 3 years',
      link: '#'
    },
    {
      title: 'National Mission on Sustainable Agriculture',
      description: 'Promotes sustainable agriculture practices',
      link: '#'
    }
  ] as GovernmentScheme[]
};