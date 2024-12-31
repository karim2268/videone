// Configuration globale des tests
import '@testing-library/jest-dom';

// Configuration supplémentaire si nécessaire
// Par exemple, mock de services externes
// window.matchMedia = jest.fn(() => ({
//   matches: false,
//   addListener: jest.fn(),
//   removeListener: jest.fn()
// }));

// Configuration des variables d'environnement pour les tests
Object.defineProperty(window, 'ENV', {
  value: {
    VITE_FIREBASE_API_KEY: 'test-key',
    VITE_FIREBASE_AUTH_DOMAIN: 'test-domain',
    VITE_FIREBASE_PROJECT_ID: 'test-project'
  },
  writable: false
});
