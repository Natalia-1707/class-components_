import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

vi.mock('./components/Results/Results', () => ({
  default: () => {
    throw new Error('Test error');
  },
}));

import App from './App';

test('shows fallback UI when child throws error', () => {
  render(<App />);
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});