import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postCreateAvailabiltyServices } from '@/store/services/healthcare/profileServices';

export const createAvailability = createAsyncThunk('healthcareAuth/createAvailability', async (credentials: any) => {
  try {
    const user = await postCreateAvailabiltyServices(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});

const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState: {
    slotsAvaialability: null,
    loading: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAvailability.fulfilled, (state, action) => {
        state.slotsAvaialability = action.payload.data;
        state.loading = false;
      })
      .addCase(createAvailability.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default doctorProfileSlice.reducer;
