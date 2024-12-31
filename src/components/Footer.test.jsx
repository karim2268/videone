import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the copyright text', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`© ${currentYear} VideoOne\\.`, 'i')
    );
    expect(copyrightText).toBeTruthy();
  });

  it('contains developer information', () => {
    const developerText = screen.getByText(/Développé par Abdelkrim Salem/i);
    expect(developerText).toBeTruthy();
  });

  it('has correct styling classes', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer.classList.contains('bg-gray-800')).toBe(true);
    expect(footer.classList.contains('text-white')).toBe(true);
  });
});
