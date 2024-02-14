import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMeddicationService, getMyUpcommingAppointmentService } from '@/store/services/healthcare/appointmentServices';

// Async thunk for doctor login
export const getMyUpcommingAppointments = createAsyncThunk('doctorAppointment/getMyUpcommingAppointments', async (credentials: any) => {
  try {
    const user = await getMyUpcommingAppointmentService(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});
export const addMeddication = createAsyncThunk('doctorAppointment/addMeddication', async (credentials: any) => {
  try {
    const user = await addMeddicationService(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});


const docotrAppointmentSlice = createSlice({
  name: 'doctorAppointment',
  initialState: {
    upcommingAppointments: null,
    medication: null,
    loading: false, // Add loading state to handle async actions
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyUpcommingAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyUpcommingAppointments.fulfilled, (state, action) => {
        state.upcommingAppointments = action.payload.data;
        state.loading = false;
      })
      .addCase(getMyUpcommingAppointments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMeddication.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeddication.fulfilled, (state, action) => {
        state.medication = action.payload.data;
        state.loading = false;
      })
      .addCase(addMeddication.rejected, (state) => {
        state.loading = false;
      })

  },
});


export default docotrAppointmentSlice.reducer;
