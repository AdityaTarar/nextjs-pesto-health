import API_CLIENT from '@/network/axios';
import { API } from '@/network/restFullUrl';

export const getPaymentHistoryService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.getPaymentHistory, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchDoctorDetailsService: any = async (credentials: any) => {
  try {
    const response = await API_CLIENT.get(`${API.fetchDoctorDetails}?id=${credentials}`);
    return response;
  } catch (error) {
    throw error;
  }
};