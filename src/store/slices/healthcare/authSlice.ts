import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginDoctorService, registerHealthcareProvider } from '@/store/services/healthcare/authServices';
// import { HelathcareRegisterState } from '@/store/interface/healthcare/authInterface';

// Async thunk for doctor login
export const doctorLogin = createAsyncThunk('healthcareAuth/doctorLogin', async (credentials: any) => {
  try {
    const user = await loginDoctorService(credentials);
    return user;
  } catch (error) {
    throw error;
  }
});

// Async thunk for healthcare provider registration
export const healthcareRegister = createAsyncThunk(
  'healthcareAuth/healthcareRegister',
  async (credentials: any) => {
    try {
      const user = await registerHealthcareProvider(credentials);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

const authDoctorSlice = createSlice({
  name: 'healthcareAuth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isRegistered: false,
    loading: false, // Add loading state to handle async actions
  },
  reducers: {
    helathcareLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(doctorLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(healthcareRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(healthcareRegister.fulfilled, (state) => {
        state.isRegistered = true;
        state.loading = false;
      })
      .addCase(healthcareRegister.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { helathcareLogout } = authDoctorSlice.actions;

export default authDoctorSlice.reducer;
