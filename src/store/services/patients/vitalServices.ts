
import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios';

export const updateVitalService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.updateVitals, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllVitalsByPatientService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.getAllVitalsByPatient, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
