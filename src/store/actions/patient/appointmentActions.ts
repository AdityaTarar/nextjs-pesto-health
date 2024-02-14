import {
  getAllDoctorListService,
  getAppointmentByPatientService,
  getDoctorService,
  getDoctorsAvailabilityService,
  getVideoConferenceDetailsService,
  postAppointmentStatusService,
  postBookAppointmentService,
  postCancelAppointmentService,
  postRecheduleAppointmentService,
} from '@/store/services/patients/bookappointmentServices';
import { AppointmentActionTypes } from '@/store/types/patient/bookAppointmentTypes';
import { Dispatch } from 'redux';

export const getDoctorsAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_GET_DOCTORS_REQUEST,
  });
  try {
    const data = await getDoctorService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_GET_DOCTORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_GET_DOCTORS_FAILURE,
    });
  }
};

export const getDoctorsAvailabilityAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_REQUEST,
  });
  try {
    const data = await getDoctorsAvailabilityService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_FAILURE,
    });
  }
};
export const postBookAppointmentAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_REQUEST,
  });
  try {
    const data = await postBookAppointmentService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_FAILURE,
    });
  }
};
export const postCancelAppointmentAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_REQUEST,
  });
  try {
    const data = await postCancelAppointmentService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_FAILURE,
    });
  }
};
export const postRecheduleAppointmentAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_REQUEST,
  });
  try {
    const data = await postRecheduleAppointmentService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_FAILURE,
    });
  }
};
export const postAppointmentStatusAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_REQUEST,
  });
  try {
    const data = await postAppointmentStatusService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_FAILURE,
    });
  }
};
export const getAppointmentsByPatientAction = (credentials: any) => async (dispatch: any) => {
  console.log('getAppointmentsByPatientAction', credentials);

  dispatch({
    type: AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_REQUEST,
  });
  try {
    const data = await getAppointmentByPatientService(credentials);
    console.log('getAppointmentsByPatientAction', data);

    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_FAILURE,
    });
  }
};
export const getVideoConferenceDetailsAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_REQUEST,
  });
  try {
    const data = await getVideoConferenceDetailsService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_FAILURE,
    });
  }
};
export const getAllDoctorListAction = (credentials: any) => async (dispatch: any) => {
  dispatch({
    type: AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_REQUEST,
  });
  try {
    const data = await getAllDoctorListService(credentials);
    dispatch({
      type: AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_FAILURE,
    });
  }
};
export const clearVideoConferenceDetails = () => async (dispatch: Dispatch) => {
  dispatch({
    type: AppointmentActionTypes.DELETE_PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT,
  });

};
export const clearAppointmentDetails = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: AppointmentActionTypes.CLEAR_APPOINTMENT_DETAILS,
    });
  } catch (error) {
    console.log(error);

  }
};
