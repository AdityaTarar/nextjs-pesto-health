import { getAllVitalsByPatientService, updateVitalService } from '@/store/services/patients/vitalServices';
import { Dispatch } from "redux";
import { VitalTypes } from "@/store/types/patient/vitalsTypes";

export const updateVitalsAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: VitalTypes.PATIENT_UPDATE_VITALS_REQUEST,
  });
  try {
    const user = await updateVitalService(credentials);
    dispatch({
      type: VitalTypes.PATIENT_UPDATE_VITALS_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: VitalTypes.PATIENT_UPDATE_VITALS_FAILURE,
    });
  }
};

export const getAllVitalsByPatientAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: VitalTypes.GET_VITALS_BY_PATIENT_REQUEST,
  });
  try {
    const user = await getAllVitalsByPatientService(credentials);
    console.log('getAllVitalsByPatientAction', user);

    dispatch({
      type: VitalTypes.GET_VITALS_BY_PATIENT_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: VitalTypes.GET_VITALS_BY_PATIENT_FAILURE,
    });
  }
};

