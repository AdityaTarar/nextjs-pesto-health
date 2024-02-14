import { AppointmentActionTypes } from '@/store/types/patient/bookAppointmentTypes';

const initialState: any = {
  doctors: {
    loading: false,
    error: null,
    data: null
  },
  doctorsAvailability: {
    loading: false,
    error: null,
    data: null
  },
  appointmentBooking: {
    loading: false,
    error: null,
    data: null
  },
  appointmentCancellation: {
    loading: false,
    error: null,
    data: null
  },
  appointmentReschedule: {
    loading: false,
    error: null,
    data: null
  },
  appointmentStatus: {
    loading: false,
    error: null,
    data: null
  },
  appointmentsByPatient: {
    loading: false,
    error: null,
    data: null
  },
  videoConferenceDetails: {
    loading: false,
    error: null,
    data: null
  },
  allDoctorsList: {
    loading: false,
    error: null,
    data: null
  }
};

export const appointmentPatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AppointmentActionTypes.PATIENT_GET_DOCTORS_REQUEST:
      return {
        ...state,
        doctors: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_GET_DOCTORS_FAILURE:
      return {
        ...state,
        doctors: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_REQUEST:
      return {
        ...state,
        doctorsAvailability: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_SUCCESS:
      return {
        ...state,
        doctorsAvailability: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_DOCTORS_AVAILABILITY_FAILURE:
      return {
        ...state,
        doctorsAvailability: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_REQUEST:
      return {
        ...state,
        appointmentBooking: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_SUCCESS:
      return {
        ...state,
        appointmentBooking: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_BOOKING_FAILURE:
      return {
        ...state,
        appointmentBooking: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_REQUEST:
      return {
        ...state,
        appointmentCancellation: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_SUCCESS:
      return {
        ...state,
        appointmentCancellation: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_CANCEL_FAILURE:
      return {
        ...state,
        appointmentCancellation: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_REQUEST:
      return {
        ...state,
        appointmentReschedule: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_SUCCESS:
      return {
        ...state,
        appointmentReschedule: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_RECHEDULE_FAILURE:
      return {
        ...state,
        appointmentReschedule: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_REQUEST:
      return {
        ...state,
        appointmentStatus: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_SUCCESS:
      return {
        ...state,
        appointmentStatus: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_STATUS_FAILURE:
      return {
        ...state,
        appointmentStatus: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_REQUEST:
      return {
        ...state,
        appointmentsByPatient: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_SUCCESS:
      return {
        ...state,
        appointmentsByPatient: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_APPOINTMENT_BY_PATIENT_FAILURE:
      return {
        ...state,
        appointmentsByPatient: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_REQUEST:
      return {
        ...state,
        videoConferenceDetails: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_SUCCESS:
      return {
        ...state,
        videoConferenceDetails: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT_FAILURE:
      return {
        ...state,
        videoConferenceDetails: {
          loading: false,
          error: true,
          data: null
        }
      };
    case AppointmentActionTypes.DELETE_PATIENT_VIDEO_CONFERENCE_DETAILS_PATIENT:
      return {
        ...state,
        videoConferenceDetails: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_REQUEST:
      return {
        ...state,
        allDoctorsList: {
          loading: true,
          error: null,
          data: null
        }
      };
    case AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctorsList: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case AppointmentActionTypes.PATIENT_GET_ALL_DOCTORS_FAILURE:
      return {
        ...state,
        allDoctorsList: {
          loading: false,
          error: true,
          data: null
        }
      };

    case AppointmentActionTypes.CLEAR_APPOINTMENT_DETAILS:
      return {
        ...state,
        appointmentBooking: {
          loading: false,
          error: true,
          data: null
        }
      }
    default:
      return state;
  }
};
