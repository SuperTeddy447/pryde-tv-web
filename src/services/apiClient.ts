import axios from 'axios';
import { API_BASE_URL } from './config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add secret key from legacy project
    config.headers['secretkey'] = 'qMzBNWTWMwuntYPENeUspQmVmgzTnR';

    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('pryde-auth-storage');
      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch {
          // ignore parse errors
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (typeof window !== 'undefined' && response) {
      const message = response?.data?.message;
      const errorsMsg = response?.data?.errors;

      if (message === "Member not found" || errorsMsg === "account has been suspended" || errorsMsg === "account has been banned") {
        localStorage.removeItem('pryde-auth-storage');
        window.location.href = `/sign-in?status=ban`;
      } else if (response.status === 401) {
        localStorage.removeItem('pryde-auth-storage');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(response?.data || error);
  }
);

export { apiClient };
