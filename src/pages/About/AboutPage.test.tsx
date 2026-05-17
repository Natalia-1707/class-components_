import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import AboutPage from './AboutPage';

test('renders about page content', () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/RSSchool React 2026 Q2 course/i)
  ).toBeInTheDocument();

   expect(
    screen.getByRole('link', {
      name: /author natalia-1707/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('link', { name: /back/i })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/good luck, everyone/i)
  ).toBeInTheDocument();
});