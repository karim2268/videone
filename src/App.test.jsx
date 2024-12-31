import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Exemple de test : vérifier la présence d'éléments clés
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('has correct routing setup', () => {
    // Vous pouvez ajouter des tests de routage ici
    // Par exemple, vérifier que certaines routes existent
  });
});
