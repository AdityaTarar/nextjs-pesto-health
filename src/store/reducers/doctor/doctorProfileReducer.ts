import { ProfileActionTypes } from "@/store/types/doctors/profileTypes";

const initialState: any = {
  createAvailability: {
    loading: false,
    error: null,
    data: null
  }
};

export const doctorProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_REQUEST:
      return {
        ...state,
        createAvailability: {
          loading: true,
          error: null,
          data: null
        }
      };
    case ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_SUCCESS:
      return {
        ...state,
        createAvailability: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_FAILURE:
      return {
        ...state,
        createAvailability: {
          loading: false,
          error: true,
          data: null
        }
      };
    default:
      return state;
  }
};

