import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import CardList from './CardList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

test('renders list of items', () => {
  const items = [
    {
      id: '1',
      name: 'Spock',
      description:
        'Gender: male | Born: 2230 | Died: 2285 | From: Vulcan',
    },
  ];

  renderWithProvider(<CardList items={items} />);

  expect(screen.getByText(/Spock/i)).toBeInTheDocument();

  expect(
    screen.getByText(
      /Gender: male \| Born: 2230 \| Died: 2285 \| From: Vulcan/i,
    ),
  ).toBeInTheDocument();
});

test('renders empty list when no items found', () => {
  render(
    <Provider store={store}>
      <CardList items={[]} />
    </Provider>
  );

  const items = document.querySelectorAll('.result-item');

  expect(items.length).toBe(0);
});