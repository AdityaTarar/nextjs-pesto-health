import { Dispatch } from "redux";
import { fetchDoctorDetailsService, forgotPassswordService, getPaymentHistoryService, sendOTPService } from "../services/commonService";
import { CommonTypes } from "../types/commonTypes";

export const getPaymentHistoryAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.GET_PAYMENTS_HISTORY_REQUEST,
  });
  try {
    const user = await getPaymentHistoryService(credentials);
    dispatch({
      type: CommonTypes.GET_PAYMENTS_HISTORY_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: CommonTypes.GET_PAYMENTS_HISTORY_FAILURE,
    });
  }
};
export const startLoaderAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.GET_PAYMENTS_HISTORY_REQUEST,
  });
  try {
    const user = await getPaymentHistoryService(credentials);
    dispatch({
      type: CommonTypes.GET_PAYMENTS_HISTORY_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: CommonTypes.GET_PAYMENTS_HISTORY_FAILURE,
    });
  }
};
export const fetchDoctorDetailsAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.GET_DOCTOR_DETAILS_REQUEST,
  });
  try {
    const user = await fetchDoctorDetailsService(credentials);
    dispatch({
      type: CommonTypes.GET_DOCTOR_DETAILS_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: CommonTypes.GET_DOCTOR_DETAILS_FAILURE,
    });
  }
};
export const sendOTPAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.SEND_OTP_REQUEST,
  });
  try {
    const user = await sendOTPService(credentials);
    dispatch({
      type: CommonTypes.SEND_OTP_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: CommonTypes.SEND_OTP_FAILURE,
    });
  }
};
export const forgotPassswordAction = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.FORGOT_PASSWORD_REQUEST,
  });
  try {
    const user = await forgotPassswordService(credentials);
    dispatch({
      type: CommonTypes.FORGOT_PASSWORD_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: CommonTypes.FORGOT_PASSWORD_FAILURE,
    });
  }
};
export const clearOTPState = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CommonTypes.CLEAR_OTP_STATE,
  });


};
