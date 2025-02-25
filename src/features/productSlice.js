// features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await axios.get('/produit');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], status: 'idle', error: null },
  reducers: {
    // You can add additional synchronous actions here if needed.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
