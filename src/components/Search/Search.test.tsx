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
