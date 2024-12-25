import { createSlice } from '@reduxjs/toolkit';
import { MapedItemData } from '../components/ItemCard/helper';

const itemSlice = createSlice({
  name: 'items',
  initialState: [] as MapedItemData[],
  reducers: {
    addItem(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
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
