// services/authService.js
import { API } from '@/network/restFullUrl';
import API_CLIENT from '../../../network/axios'; // Import your configured Axios instance
export const getDoctorService = async (params: any) => {
  try {
    const response = await API_CLIENT.get(`${API.doctor_search}?name=${params.name}&city=${params.city}`);
    console.log('resposnse', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDoctorsAvailabilityService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.getDoctorsAvailability}`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postBookAppointmentService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.bookAppointment}`, params);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const postCancelAppointmentService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.cancelAppointment}`, params);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const postRecheduleAppointmentService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.recheduleAppointment}`, params);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const postAppointmentStatusService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.getAppointmentStatusByID}`, params);
    console.log('response', response);

    return response;
  } catch (error: any) {
    console.log('error', error);
    throw error;
  }
};
export const getAppointmentByPatientService = async (params: any) => {
  try {
    const response = await API_CLIENT.get(`${API.getAppointmentByPatient}?id=${params.id}&userType=${params?.userType}`);
    return response;
  } catch (error: any) {
    console.log('error', error);
    throw error;
  }
};
export const getVideoConferenceDetailsService = async (params: any) => {
  try {
    const response = await API_CLIENT.post(`${API.getVideoConferenceDetails}`, params);
    return response;
  } catch (error: any) {
    console.log('error', error);
    throw error;
  }
};
export const getAllDoctorListService = async (params: any) => {
  try {
    const response = await API_CLIENT.get(`${API.getAllDoctorList}`);
    return response;
  } catch (error: any) {
    console.log('error', error);
    throw error;
  }
};
