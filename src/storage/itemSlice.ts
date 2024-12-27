import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MapedItemData, ItemData } from '../components/ItemCard/helper';
import axios from 'axios';

export const fetchItemsData = createAsyncThunk<MapedItemData[], string>(
  'items/fetchItemsData',
  async (requestURL: string) => {
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MapedItemData[] = await response.json();
      return data;
    } catch (error) {
      throw new Error((error as Error)?.message || 'Failed to fetch data');
    }
  }
);

interface ItemsState {
  data: MapedItemData[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  data: [],
  status: 'idle',
  error: null,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.data.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.data.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.data = state.data.filter((item) => item.id !== action.payload.id);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItemsData.fulfilled, (state, action: PayloadAction<MapedItemData[]>) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchItemsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
