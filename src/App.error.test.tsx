import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

vi.mock('./components/Results/Results', () => ({
  default: () => {
    throw new Error('Test error');
  },
}));

import App from './App';

test('shows fallback UI when child throws error', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </MemoryRouter>
  );
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});