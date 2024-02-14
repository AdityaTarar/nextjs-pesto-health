import { VitalTypes } from "@/store/types/patient/vitalsTypes";

const initialState: any = {
  updateVitals: {
    loading: false,
    error: null,
    data: null
  },
  allVitalsByPatient: {
    loading: false,
    error: null,
    data: []
  }
};

export const vitalsReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case VitalTypes.PATIENT_UPDATE_VITALS_REQUEST:
      return {
        ...state,
        updateVitals: {
          loading: true,
          error: null,
          data: null
        }
      };
    case VitalTypes.PATIENT_UPDATE_VITALS_SUCCESS:
      return {
        ...state,
        updateVitals: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case VitalTypes.PATIENT_UPDATE_VITALS_FAILURE:
      return {
        ...state,
        updateVitals: {
          loading: false,
          error: true,
          data: null
        }
      };
    case VitalTypes.GET_VITALS_BY_PATIENT_REQUEST:
    // return {
    //   ...state,
    //   allVitalsByPatient: {
    //     loading: true,
    //     error: null,
    //     data: null
    //   }
    // };
    case VitalTypes.GET_VITALS_BY_PATIENT_SUCCESS:
      console.log('GET_VITALS_BY_PATIENT_SUCCESS', action.payload?.data);

      return {
        ...state,
        allVitalsByPatient: {
          loading: false,
          error: null,
          data: action?.payload?.data
        }
      };
    case VitalTypes.GET_VITALS_BY_PATIENT_FAILURE:
    // return {
    //   ...state,
    //   allVitalsByPatient: {
    //     loading: false,
    //     error: true,
    //     data: null
    //   }
    // };
    default:
      return state;
  }
};

