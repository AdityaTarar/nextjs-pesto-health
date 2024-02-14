export const PATIENT_LOGIN_REQUEST = 'PATIENT_LOGIN_REQUEST';
export const PATIENT_LOGIN_SUCCESS = 'PATIENT_LOGIN_SUCCESS';
export const PATIENT_LOGIN_FAILURE = 'PATIENT_LOGIN_FAILURE';
export const PATIENT_REGISTER_REQUEST = 'PATIENT_REGISTER_REQUEST';
export const PATIENT_REGISTER_SUCCESS = 'PATIENT_REGISTER_SUCCESS';
export const PATIENT_REGISTER_FAILURE = 'PATIENT_REGISTER_FAILURE';
export const HEALTHCARE_LOGOUT = 'HEALTHCARE_LOGOUT';

export const UPDATE_Patient_PROFILE_REQUEST = 'UPDATE_Patient_PROFILE_REQUEST';
export const UPDATE_Patient_PROFILE_SUCCESS = 'UPDATE_Patient_PROFILE_SUCCESS';
export const UPDATE_Patient_PROFILE_FAILURE = 'UPDATE_Patient_PROFILE_FAILURE';

// State interface
export interface AuthState {
  user: any; // Define a more specific type if possible
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  registerUser: any
}
