import { addMeddicationService, getMyUpcommingAppointmentService } from "@/store/services/healthcare/appointmentServices";
import { AppointmentActionTypes } from "@/store/types/doctors/appointmentsTypes";
import { Dispatch } from "redux";

export const getMyUpcommingAppointmentAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_REQUEST,
  });
  try {
    const user = await getMyUpcommingAppointmentService(credentials);
    dispatch({
      type: AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_FAILURE,
    });
  }
};
export const postAddMedicationAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: AppointmentActionTypes.DOCTOR_ADD_MEDICATION_REQUEST,
  });
  try {
    const user = await addMeddicationService(credentials);
    dispatch({
      type: AppointmentActionTypes.DOCTOR_ADD_MEDICATION_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: AppointmentActionTypes.DOCTOR_ADD_MEDICATION_FAILURE,
    });
  }
};
export const clearState = () => async (dispatch: Dispatch) => {
  dispatch({
    type: AppointmentActionTypes.CLEAR_STATE,
  });
};