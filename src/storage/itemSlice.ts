import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MapedItemData, ItemData } from '../components/ItemCard/helper';

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
  cartData: MapedItemData[];
  fetchedItemsData: ItemData[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  cartData: [],
  fetchedItemsData: [],
  status: 'idle',
  error: null,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.cartData.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<ItemData>) {
      const existingItem = state.cartData.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartData = state.cartData.filter((item) => item.id !== action.payload.id);
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
        state.fetchedItemsData = action.payload;
      })
      .addCase(fetchItemsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
