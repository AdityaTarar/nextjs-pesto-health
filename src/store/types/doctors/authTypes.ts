export const DOCTOR_LOGIN_REQUEST = 'DOCTOR_LOGIN_REQUEST';
export const DOCTOR_LOGIN_SUCCESS = 'DOCTOR_LOGIN_SUCCESS';
export const DOCTOR_LOGIN_FAILURE = 'DOCTOR_LOGIN_FAILURE';
export const DOCTOR_REGISTER_REQUEST = 'DOCTOR_REGISTER_REQUEST';
export const DOCTOR_REGISTER_SUCCESS = 'DOCTOR_REGISTER_SUCCESS';
export const DOCTOR_REGISTER_FAILURE = 'DOCTOR_REGISTER_FAILURE';
export const HEALTHCARE_LOGOUT = 'HEALTHCARE_LOGOUT';

// export const UPDATE_Patient_PROFILE_REQUEST = 'UPDATE_Patient_PROFILE_REQUEST';
// export const UPDATE_Patient_PROFILE_SUCCESS = 'UPDATE_Patient_PROFILE_SUCCESS';
// export const UPDATE_Patient_PROFILE_FAILURE = 'UPDATE_Patient_PROFILE_FAILURE';

// State interface
export interface AuthState {
  user: any; // Define a more specific type if possible
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  registerUser: any
}
