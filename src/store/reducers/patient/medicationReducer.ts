import { MedicationTypes } from "@/store/types/patient/medicationTypes";
const initialState: any = {
  medicationByPatient: {
    loading: false,
    error: null,
    data: null
  },
  medicationsByAppointmentId: {
    loading: false,
    error: null,
    data: null
  }
};

export const medicationPatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MedicationTypes.GET_MEDICATION_BY_PATIENT_REQUEST:
      return {
        ...state,
        medicationByPatient: {
          loading: true,
          error: null,
          data: null
        }
      };
    case MedicationTypes.GET_MEDICATION_BY_PATIENT_SUCCESS:
      return {
        ...state,
        medicationByPatient: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case MedicationTypes.GET_MEDICATION_BY_PATIENT_FAILURE:
      return {
        ...state,
        medicationByPatient: {
          loading: false,
          error: true,
          data: null
        }
      };
    case MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_REQUEST:
      return {
        ...state,
        medicationsByAppointmentId: {
          loading: true,
          error: null,
          data: null
        }
      };
    case MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_SUCCESS:
      return {
        ...state,
        medicationsByAppointmentId: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case MedicationTypes.GET_MEDICATION_BY_APPOINTMENT_FAILURE:
      return {
        ...state,
        medicationsByAppointmentId: {
          loading: false,
          error: true,
          data: null
        }
      };
    default:
      return state;
  }
};

