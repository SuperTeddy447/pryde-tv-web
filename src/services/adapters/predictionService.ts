import { isMockMode } from '../config';
import { mockPredictionService } from '../mock/mockPredictionService';

export function getPredictionService() {
  if (isMockMode()) {
    return mockPredictionService;
  }
  // TODO: Return real service when API is ready
  return mockPredictionService;
}
