import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import React from 'react';

const fetchCharactersMock = vi.fn();

vi.mock('./components/Results/Results', () => ({
  default: React.forwardRef((_, ref) => {
    React.useImperativeHandle(ref, () => ({
      fetchCharacters: fetchCharactersMock,
    }));

    return <div data-testid="results" />;
  }),
}));

import App from './App';

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText(/Star Trek Search/i)).toBeInTheDocument();
});

test('saves search value to localStorage', async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  await user.type(input, 'spock');
  await user.click(button);

  expect(localStorage.getItem('search')).toBe('spock');
});

test('calls fetchCharacters when search is triggered', async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  await user.type(input, 'spock');
  await user.click(button);

  expect(fetchCharactersMock).toHaveBeenCalledWith('spock');
});

