import { isMockMode } from '../config';
import { mockAuthService } from '../mock/mockAuthService';
// TODO: Import real auth service when API is ready
// import { realAuthService } from './realAuthService';

export function getAuthService() {
  if (isMockMode()) {
    return mockAuthService;
  }
  // TODO: Return real service when API is ready
  // return realAuthService;
  return mockAuthService;
}
