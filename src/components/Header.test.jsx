import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText('VideoOne Logo');
    expect(logo).toBeTruthy();
  });

  it('renders navigation links', () => {
    const homeLink = screen.getByRole('link', { name: /accueil/i });
    expect(homeLink).toBeTruthy();
  });

  it('has a fixed header with backdrop blur', () => {
    const header = screen.getByRole('banner');
    expect(header.classList.contains('fixed')).toBe(true);
    expect(header.classList.contains('backdrop-blur-md')).toBe(true);
  });
});
