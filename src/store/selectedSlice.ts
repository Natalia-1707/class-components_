import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../api/types';

type SelectedState = {
  selectedItems: Item[];
};

const initialState: SelectedState = {
  selectedItems: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Item>) {
      const exists = state.selectedItems.some(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selectedItems.push(action.payload);
      }
    },

    clearItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { toggleItem, clearItems } =
  selectedSlice.actions;

export default selectedSlice.reducer;