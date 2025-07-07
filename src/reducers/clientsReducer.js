import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from "../supabase";

// Async thunk to fetch clients data
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching clients');
    }
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clientsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clientsList = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientsSlice.reducer;
