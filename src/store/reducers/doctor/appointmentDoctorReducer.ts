import { AppointmentActionTypes } from "@/store/types/doctors/appointmentsTypes";

const initialState: any = {
  myUpcomingAppointment: {
    loading: false,
    error: null,
    data: null
  },
  addMedication: {
    loading: false,
    error: null,
    data: null
  }
};

export const appointmentDoctorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_REQUEST:
      return {
        ...state,
        myUpcomingAppointment: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_SUCCESS:
      return {
        ...state,
        myUpcomingAppointment: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.DOCTOR_UPCOMMING_APPOINTMENT_FAILURE:
      return {
        ...state,
        myUpcomingAppointment: {
          loading: false,
          error: true,
          data: null
        }
      };
    case AppointmentActionTypes.DOCTOR_ADD_MEDICATION_REQUEST:
      return {
        ...state,
        addMedication: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.DOCTOR_ADD_MEDICATION_SUCCESS:
      return {
        ...state,
        addMedication: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.DOCTOR_ADD_MEDICATION_FAILURE:
      return {
        ...state,
        addMedication: {
          loading: false,
          error: true,
          data: null
        }
      };
    case AppointmentActionTypes.DOCTOR_ADD_MEDICATION_FAILURE:
      return {
        ...state,
        addMedication: {
          loading: false,
          error: true,
          data: null
        }
      };
    case AppointmentActionTypes.CLEAR_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

