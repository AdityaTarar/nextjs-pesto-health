// Import necessary dependencies
import { configureStore } from '@reduxjs/toolkit';
import { authPatientReducer } from './reducers/patient/authReducers';
import { appointmentPatientReducer } from './reducers/patient/appointmentReducers';
import { medicationPatientReducer } from './reducers/patient/medicationReducer';
import { vitalsReducers } from './reducers/patient/vitalsReducers';
import doctorReducer from './slices/healthcare/authSlice';
import loaderReducer from './slices/common/loaderSlice';
import docotrAppointmentSlice from './slices/healthcare/appointmentSlice';
import doctorProfileSlice from './slices/healthcare/profileSlice';
import vitalSlice from './slices/patients/vitalSlice';
import { PaymentsReducer } from './reducers/commonReducers';

const store = configureStore({
  reducer: {
    patientAuth: authPatientReducer,
    appointmentData: appointmentPatientReducer,
    medicationData: medicationPatientReducer,
    vitalsData: vitalsReducers,
    doctorAuth: doctorReducer,
    paymentsData: PaymentsReducer,
    loader: loaderReducer, // Adjusted key to match slice name
    doctorAppointment: docotrAppointmentSlice,
    doctorProfile: doctorProfileSlice,
    vitals: vitalSlice
  },
});

export default store;
