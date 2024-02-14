// services/authService.js
import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios'; // Import your configured Axios instance
import { LoginUserState } from '../../interface/patients/authInterface'
export const loginUser: any = async (credentials: LoginUserState) => {
  try {
    const response = await API_CLIENT.post(API.loginAPI, credentials);
    console.log('resposnse', response);

    return response;
  } catch (error) {
    throw error;
  }
};
export const registerPatientService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.patient_registration, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updatePatientProfileService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.updatePatientProfile, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
