import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios';
export const getMyUpcommingAppointmentService = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.getMyUpcommingAppointments, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addMeddicationService = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.addMedication, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const completeAppointmentService = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.completeAppointment, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};