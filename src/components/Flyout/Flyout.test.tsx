import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import Flyout from './Flyout';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

const testStore = configureStore({
  reducer: {
    selected: selectedReducer,
  },
  preloadedState: {
    selected: {
      selectedItems: [
        { id: '1', name: 'Spock', description: 'test' }
      ],
    },
  },
});

test('renders flyout', () => {
  render(
    <Provider store={testStore}>
      <Flyout />
    </Provider>
  );

  expect(screen.getByText(/selected/i)).toBeInTheDocument();
});

test('triggers download', () => {
  const createObjectURL = vi.fn(() => 'blob:url');
  const revokeObjectURL = vi.fn();

  globalThis.URL.createObjectURL = createObjectURL;
  globalThis.URL.revokeObjectURL = revokeObjectURL;

  const appendChild = vi.spyOn(document.body, 'appendChild');
  const removeChild = vi.spyOn(document.body, 'removeChild');

  render(
    <Provider store={testStore}>
      <Flyout />
    </Provider>
  );

  screen.getByRole('button', { name: /download selected items/i }).click();

  expect(createObjectURL).toHaveBeenCalled();
  expect(appendChild).toHaveBeenCalled();
  expect(removeChild).toHaveBeenCalled();
});