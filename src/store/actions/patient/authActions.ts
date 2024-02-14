// store/actions/authActions.ts

import {
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGIN_FAILURE,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAILURE,
  HEALTHCARE_LOGOUT,
  UPDATE_Patient_PROFILE_FAILURE,
  UPDATE_Patient_PROFILE_REQUEST,
  UPDATE_Patient_PROFILE_SUCCESS,
  AuthState
} from '../../types/patient/authTypes';
import { loginUser, registerPatientService, updatePatientProfileService } from '@/store/services/patients/authServices';

export const patientLoginAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: PATIENT_LOGIN_REQUEST,
  });
  try {
    const user = await loginUser(credentials);
    dispatch({
      type: PATIENT_LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LOGIN_FAILURE,
    });
  }
};


export const patientRegisterAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: PATIENT_REGISTER_REQUEST,
  });
  try {
    const user = await registerPatientService(credentials);
    dispatch({
      type: PATIENT_REGISTER_SUCCESS,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: PATIENT_REGISTER_FAILURE,
    });
  }
};
export const updatePatientProfileAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_Patient_PROFILE_REQUEST,
  });
  try {
    const user = await updatePatientProfileService(credentials);
    dispatch({
      type: UPDATE_Patient_PROFILE_SUCCESS,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: UPDATE_Patient_PROFILE_FAILURE,
    });
  }
};

// Logout action
export const healthcareLogout = () => ({
  type: HEALTHCARE_LOGOUT,
});
