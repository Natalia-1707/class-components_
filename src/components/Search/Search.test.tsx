import { render, screen } from '@testing-library/react';
import SearchSection from './Search';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

describe('SearchSection', () => {
  test('renders input and button', () => {
    const mockSearch = vi.fn();

    render(<SearchSection onSearch={mockSearch} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('updates input value on type', async () => {
    const user = userEvent.setup();
    const mockSearch = vi.fn();

    render(<SearchSection onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'hello');

    expect(input).toHaveValue('hello');
  });
});

test('does not call onSearch if value is same as savedSearch', async () => {
  const user = userEvent.setup();
  const mockSearch = vi.fn();

  localStorage.setItem('savedSearch', 'spock');

  render(<SearchSection onSearch={mockSearch} />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  await user.clear(input);
  await user.type(input, 'spock');
  await user.click(button);

  expect(mockSearch).not.toHaveBeenCalled();
});
