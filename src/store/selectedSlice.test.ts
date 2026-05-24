import { describe, test, expect } from 'vitest';
import reducer, { toggleItem } from './selectedSlice';

describe('selectedSlice', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      selectedItems: [],
    });
  });

  test('should add selected item', () => {
    const state = reducer(
      { selectedItems: [] },
      toggleItem({ id: '1', name: 'Spock', description: '' }),
    );

    expect(state.selectedItems.length).toBe(1);
  });

  test('should remove selected item', () => {
    const state = reducer(
      { selectedItems: [{ id: '1', name: 'Spock', description: '' }] },
      toggleItem({ id: '1', name: 'Spock', description: '' }),
    );

    expect(state.selectedItems).toEqual([]);
  });
});