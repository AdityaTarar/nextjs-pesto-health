import { CommonTypes } from "../types/commonTypes";

const initialState: any = {
  paymentHistory: {
    loading: false,
    error: null,
    data: null
  },
  doctorDetails: {
    loading: false,
    error: null,
    data: null
  }
};

export const PaymentsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CommonTypes.GET_PAYMENTS_HISTORY_REQUEST:
      return {
        ...state,
        paymentHistory: {
          loading: true,
          error: null,
          data: null
        }
      };
    case CommonTypes.GET_PAYMENTS_HISTORY_SUCCESS:
      return {
        ...state,
        paymentHistory: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case CommonTypes.GET_PAYMENTS_HISTORY_FAILURE:
      return {
        ...state,
        paymentHistory: {
          loading: false,
          error: true,
          data: null
        }
      };
    case CommonTypes.GET_DOCTOR_DETAILS_REQUEST:
      return {
        ...state,
        doctorDetails: {
          loading: true,
          error: null,
          data: null
        }
      };
    case CommonTypes.GET_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        doctorDetails: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case CommonTypes.GET_DOCTOR_DETAILS_FAILURE:
      return {
        ...state,
        doctorDetails: {
          loading: false,
          error: true,
          data: null
        }
      };
    default:
      return state;
  }
};

