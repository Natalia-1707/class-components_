import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App'

test('renders 404 page', () => {
  render(
    <MemoryRouter initialEntries={['/wrong-route']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/not found/i)).toBeInTheDocument();

  expect(
    screen.getByRole('link', { name: /main/i })
  ).toBeInTheDocument();
});