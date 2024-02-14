// services/authService.js
import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios'; // Import your configured Axios instance
import { HelathcareRegisterState } from '@/store/interface/healthcare/authInterface';
export const loginDoctorService = async (credentials: HelathcareRegisterState) => {
  try {
    const response = await API_CLIENT.post(API.loginDoctorAPI, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const registerHealthcareProvider = async (credentials: HelathcareRegisterState) => {
  try {
    const response = await API_CLIENT.post(API.helathcare_registration_API, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
