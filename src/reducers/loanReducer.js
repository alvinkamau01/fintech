import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from "../supabase"

// Async thunk to fetch loan details using fetch API
export const fetchLoanDetails = createAsyncThunk(
  'loan/fetchLoanDetails',
  async (_, { rejectWithValue }) => {
    try {
     const {data,error} = await supabase
     .from ('loan_details')
     .select('*');
      return data;

     if (error) throw error;
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching loan details');
    }
  }
);

// Async thunk to fetch personal info using fetch API
export const fetchPersonalInfo = createAsyncThunk(
  'loan/fetchPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
   const {data , error} = await supabase
   .from ('personal_info')
   .select ('*')
   if (error) throw error;
   return data
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching personal info');
    }
  }
);

const loanSlice = createSlice({
  name: 'loan',
  initialState: {
    loanDetails: [],
    personalInfo: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.loanDetails = action.payload;
      })
      .addCase(fetchLoanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loanSlice.reducer;
