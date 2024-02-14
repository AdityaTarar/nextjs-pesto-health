import { MedicationTypes } from "@/store/types/patient/medicationTypes";
import { getMedicationbyPatientService, getMedicationsByAppointmentIdService } from '@/store/services/patients/medication';
import { Dispatch } from "redux";

export const getMedicationbyPatientAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: MedicationTypes.GET_MEDICATION_BY_PATIENT_REQUEST,
  });
  try {
    const user = await getMedicationbyPatientService(credentials);
    dispatch({
      type: MedicationTypes.GET_MEDICATION_BY_PATIENT_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: MedicationTypes.GET_MEDICATION_BY_PATIENT_FAILURE,
    });
  }
};

export const getMedicationsByAppointmentIdAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_REQUEST,
  });
  try {
    const user = await getMedicationsByAppointmentIdService(credentials);
    dispatch({
      type: MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_FAILURE,
    });
  }
};

