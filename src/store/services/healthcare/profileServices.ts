import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios';
export const postCreateAvailabiltyServices = async (credentials: any) => {
  try {
    const response = await API_CLIENT.post(API.createAvailability, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};