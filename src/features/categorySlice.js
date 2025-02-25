// features/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axios';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await axios.get('/categorie');
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: { categories: [], status: 'idle', error: null },
  reducers: {
    // Additional actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
