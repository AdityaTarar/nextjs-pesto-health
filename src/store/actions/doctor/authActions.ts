// store/actions/authActions.ts

import { loginDoctorService, registerHealthcareProvider } from '@/store/services/healthcare/authServices';
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

export const doctorLoginAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: DOCTOR_LOGIN_REQUEST,
  });
  try {
    const user = await loginDoctorService(credentials);
    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAILURE,
    });
  }
};


export const doctorRegisterAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: DOCTOR_REGISTER_REQUEST,
  });
  try {
    const user = await registerHealthcareProvider(credentials);
    dispatch({
      type: DOCTOR_REGISTER_SUCCESS,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_REGISTER_FAILURE,
    });
  }
};
// export const updatePatientProfileAction = (credentials: any) => async (dispatch: any) => {
//   dispatch({
//     type: UPDATE_Patient_PROFILE_REQUEST,
//   });
//   try {
//     const user = await updatePatientProfileService(credentials);
//     dispatch({
//       type: UPDATE_Patient_PROFILE_SUCCESS,
//       payload: user
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_Patient_PROFILE_FAILURE,
//     });
//   }
// };

// Logout action
export const healthcareLogout = () => ({
  type: HEALTHCARE_LOGOUT,
});
