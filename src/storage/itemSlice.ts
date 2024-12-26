import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { MapedItemData, ItemData } from '../components/ItemCard/helper';
// import { RootState } from './index';

const initialState: MapedItemData[] = [];

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          return state.filter((item) => item.id !== action.payload.id);
        }
      }
    },
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
