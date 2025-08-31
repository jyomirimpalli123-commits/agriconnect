import type { SoilTest } from '../types';

export class SoilAnalysisManager {
  private storageKey = 'agriConnectSoilTests';

  getSoilTests(): SoilTest[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveSoilTest(test: SoilTest): void {
    const tests = this.getSoilTests();
    tests.unshift(test); // Add to beginning
    localStorage.setItem(this.storageKey, JSON.stringify(tests));
  }

  getStatus(value: number, type: 'pH' | 'nitrogen' | 'phosphorus' | 'potassium'): 'optimal' | 'good' | 'fair' | 'poor' {
    switch (type) {
      case 'pH':
        if (value >= 6.0 && value <= 7.5) return 'optimal';
        if ((value >= 5.5 && value < 6.0) || (value > 7.5 && value <= 8.0)) return 'good';
        if ((value >= 5.0 && value < 5.5) || (value > 8.0 && value <= 8.5)) return 'fair';
        return 'poor';
      case 'nitrogen':
        if (value >= 40) return 'optimal';
        if (value >= 30) return 'good';
        if (value >= 20) return 'fair';
        return 'poor';
      case 'phosphorus':
        if (value >= 25) return 'optimal';
        if (value >= 20) return 'good';
        if (value >= 15) return 'fair';
        return 'poor';
      case 'potassium':
        if (value >= 120) return 'optimal';
        if (value >= 100) return 'good';
        if (value >= 80) return 'fair';
        return 'poor';
      default:
        return 'fair';
    }
  }

  getRecommendations(test: SoilTest): string[] {
    const recommendations: string[] = [];
    const pH = parseFloat(test.pH);
    const nitrogen = parseFloat(test.nitrogen);
    const phosphorus = parseFloat(test.phosphorus);
    const potassium = parseFloat(test.potassium);

    if (pH < 6.0) {
      recommendations.push('Your soil is acidic. Consider adding lime to raise pH level.');
    } else if (pH > 7.5) {
      recommendations.push('Your soil is alkaline. Consider adding sulfur to lower pH level.');
    }

    if (nitrogen < 40) {
      recommendations.push('Nitrogen levels are low. Consider adding nitrogen-rich fertilizers.');
    }

    if (phosphorus < 25) {
      recommendations.push('Phosphorus levels are low. Consider adding bone meal or rock phosphate.');
    }

    if (potassium < 120) {
      recommendations.push('Potassium levels are low. Consider adding potash fertilizers.');
    }

    if (pH >= 6.0 && pH <= 7.5 && nitrogen >= 40 && phosphorus >= 25 && potassium >= 120) {
      recommendations.push('Your soil is in excellent condition. Maintain current practices.');
    }

    return recommendations;
  }
}

export const soilAnalysisManager = new SoilAnalysisManager();