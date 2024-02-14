// store/reducers/authReducer.ts

import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAILURE,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_REGISTER_FAILURE,
  HEALTHCARE_LOGOUT,
  AuthState
} from '../../types/doctors/authTypes';
const initialState = {
  user: null,
  registerUser: null,
  isAuthenticated: false,
  isRegistered: false,
  loading: false,
};

export const authDoctorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DOCTOR_LOGIN_REQUEST:
    case DOCTOR_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DOCTOR_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case DOCTOR_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        registerUser: action.payload,
        loading: false,
      };
    case DOCTOR_LOGIN_FAILURE:
    case DOCTOR_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case HEALTHCARE_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
