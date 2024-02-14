import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllVitalsByPatientService, updateVitalService } from '@/store/services/patients/vitalServices';


export const updateVitals: any = createAsyncThunk('vitalSlice/getMedicationbyPatient', async (credentials: any) => {
  try {
    const user = await updateVitalService(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});
export const getAllVitalsByPatient: any = createAsyncThunk('vitalSlice/getAllVitalsByPatient', async (credentials: any) => {
  try {
    const user = await getAllVitalsByPatientService(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});


const vitalSlice = createSlice({
  name: 'vitalSlice',
  initialState: {
    vitals: null,
    vitalsHistory: null,
    loading: false, // Add loading state to handle async actions
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(updateVitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVitals.fulfilled, (state, action) => {
        state.vitals = action.payload.data;
        state.loading = false;
      })
      .addCase(updateVitals.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllVitalsByPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVitalsByPatient.fulfilled, (state, action) => {
        state.vitalsHistory = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllVitalsByPatient.rejected, (state) => {
        state.loading = false;
      })

  },
});

export default vitalSlice.reducer;
