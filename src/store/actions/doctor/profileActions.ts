import { postCreateAvailabiltyServices } from "@/store/services/healthcare/profileServices";
import { ProfileActionTypes } from "@/store/types/doctors/profileTypes";
import { Dispatch } from "redux";

export const postCreateAvailabiltyActions = (credentials: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_REQUEST,
  });
  try {
    const user = await postCreateAvailabiltyServices(credentials);
    dispatch({
      type: ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: ProfileActionTypes.DOCTOR_CREATE_AVAILABILITY_FAILURE,
    });
  }
};