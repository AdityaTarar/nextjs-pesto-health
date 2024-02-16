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
  },
  sendOTP: {
    loading: false,
    error: null,
    data: null
  },
  forgotPasssword: {
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
    case CommonTypes.SEND_OTP_REQUEST:
      return {
        ...state,
        sendOTP: {
          loading: true,
          error: null,
          data: null
        }
      };
    case CommonTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOTP: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case CommonTypes.SEND_OTP_FAILURE:
      return {
        ...state,
        sendOTP: {
          loading: false,
          error: true,
          data: null
        }
      };
    case CommonTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasssword: {
          loading: true,
          error: null,
          data: null
        }
      };
    case CommonTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasssword: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case CommonTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasssword: {
          loading: false,
          error: true,
          data: null
        }
      };
    case CommonTypes.CLEAR_OTP_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

