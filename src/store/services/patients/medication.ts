
import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios';

export const getMedicationbyPatientService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.getMedicationbyPatient, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getMedicationsByAppointmentIdService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.getMedicationsByAppointmentId, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
