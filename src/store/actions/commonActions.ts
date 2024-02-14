import { Dispatch } from "redux";
import { fetchDoctorDetailsService, getPaymentHistoryService } from "../services/commonService";
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
