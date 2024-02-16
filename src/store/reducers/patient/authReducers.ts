// store/reducers/authReducer.ts

import {
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGIN_FAILURE,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAILURE,
  HEALTHCARE_LOGOUT,
  AuthState,
  CLEAR_STATE
} from '../../types/patient/authTypes';

const initialState = {
  user: null,
  registerUser: null,
  isAuthenticated: false,
  isRegistered: false,
  loading: false,
};

export const authPatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PATIENT_LOGIN_REQUEST:
    case PATIENT_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case PATIENT_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        registerUser: action.payload,
        loading: false,
      };
    case PATIENT_LOGIN_FAILURE:
    case PATIENT_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case HEALTHCARE_LOGOUT:
      return {
        ...initialState,
      };
    case CLEAR_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
