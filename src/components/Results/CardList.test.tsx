import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import CardList from './CardList';

test('renders list of items', () => {
  const items = [
    {
      id: '1',
      name: 'Spock',
      description:
        'Gender: male | Born: 2230 | Died: 2285 | From: Vulcan',
    },
  ];

  render(<CardList items={items} />);

  expect(screen.getByText(/Spock/i)).toBeInTheDocument();

  expect(
    screen.getByText(
      /Gender: male \| Born: 2230 \| Died: 2285 \| From: Vulcan/i,
    ),
  ).toBeInTheDocument();
});

test('renders empty list when no items found', () => {
  render(<CardList items={[]} />);

  const items = document.querySelectorAll('.result-item');

  expect(items.length).toBe(0);
});