"use client";
import AppointmentCard from "@/components/AppointmentCard";
import { CTX } from "@/context/context";
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VitalsForm from "@/components/VitalsForm";
import { updateVitals } from "@/store/slices/patients/vitalSlice";
import dayjs from "dayjs";
import LoadingBackdrop from "@/components/Loader";
import {
  clearVideoConferenceDetails,
  getAppointmentsByPatientAction,
  getVideoConferenceDetailsAction,
  postCancelAppointmentAction,
  postRecheduleAppointmentAction,
} from "@/store/actions/patient/appointmentActions";
import { getMedicationsByAppointmentIdAction } from "@/store/actions/patient/medicationActions";
import { updateVitalsAction } from "@/store/actions/patient/vitalActions";
import AppointmentModal from "@/components/AppointmentModal";
import { fetchDoctorDetailsAction } from "@/store/actions/commonActions";
import { COLORS } from "@/app/colors";
import Link from "next/link";

const page = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const authContext: any = useContext(CTX);
  const {
    isOpen: vitalModalOpen,
    onClose: vitalModalOnClose,
    onOpen: vitalModalOnOpen,
  } = useDisclosure();
  const {
    isOpen: recheduleModalOpen,
    onClose: recheduleModalOnClose,
    onOpen: recheduleModalOnOpen,
  } = useDisclosure();
  const { userDetails, _startGlobalNavigation, navigationLoading }: any =
    authContext;
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const [pastappointmentList, setPastAppointmentList] = useState([]);
  const [selectedApppointment, setSelectedApppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const upcommingAppointments = useSelector(
    (state: any) => state?.appointmentData?.appointmentsByPatient?.data
  );
  const videoConferenceDetails = useSelector(
    (state: any) => state?.appointmentData?.videoConferenceDetails?.data
  );
  const cancelAppointment = useSelector(
    (state: any) => state?.appointmentData?.appointmentCancellation?.data
  );
  const appointmentReschedule = useSelector(
    (state: any) => state?.appointmentData?.appointmentReschedule?.data
  );
  const prescriptions = useSelector(
    (state: any) => state?.medicationData?.medicationByPatient?.data?.data
  );
  const updatedVitals = useSelector(
    (state: any) => state?.vitalsData?.updateVitals
  );
  const doctorDetails = useSelector(
    (state: any) => state?.commonReducerData?.doctorDetails?.data?.data
  );
  console.log("doctorDetails", doctorDetails);
  useEffect(() => {
    setLoading(true);
    fetchAppointments();
  }, [userDetails, appointmentReschedule]);

  const fetchAppointments = async () => {
    try {
      await dispatch(
        getAppointmentsByPatientAction({
          id: userDetails?._id,
          userType: "patient",
        })
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (upcommingAppointments?.status === 200) {
      setPastAppointmentList(upcommingAppointments?.data?.pastAppointments);
      setAppointmentList(upcommingAppointments?.data?.upcomingAppointments);
    }
  }, [upcommingAppointments]);
  const handleUpdateVitals = async (formdata: any) => {
    const payload = {
      patientId: userDetails?._id,
      patientVitals: { ...formdata, date: dayjs().toISOString() },
    };

    await dispatch(updateVitalsAction(payload));
  };

  useEffect(() => {
    if (updatedVitals?.data?.status === 200) {
      _startGlobalNavigation();
      handleJoinConsultaion();
    }
  }, [updatedVitals]);
  const handleJoinConsultaion = async () => {
    _startGlobalNavigation();
    setLoading(true);
    vitalModalOnClose();
    await dispatch(
      getVideoConferenceDetailsAction({ appointmentId: appointmentId })
    );
  };
  useEffect(() => {
    if (videoConferenceDetails?.status === 200) {
      setLoading(false);
      router.push(`/meeting?${videoConferenceDetails?.data?.meetingInfo?.id}`);
    } else {
      setLoading(false);
    }
  }, [videoConferenceDetails]);
  const handleOpenVitalModal = (id: any) => {
    vitalModalOnOpen(), setAppointmentId(id);
  };

  const handleCancelAppointment = async (data: any) => {
    console.log("handleCancelAppointment", data);
    const payload = {
      appointmentId: data?.appointmentId,
      doctorId: data?.doctorId,
      date: data?.date,
      time: data?.time,
    };
    await dispatch(postCancelAppointmentAction(payload));
  };
  const fetchMedications = async (appointmentId: any) => {
    await dispatch(
      getMedicationsByAppointmentIdAction({
        patientId: userDetails?._id,
        appointmentId: appointmentId,
      })
    );
  };
  const handleRechedule = async (currentAppointment: any) => {
    setSelectedApppointment(currentAppointment);
    await dispatch(fetchDoctorDetailsAction(currentAppointment?.doctorId));
    recheduleModalOnOpen();
  };
  const handleRecheduleAppointment = async (data: any) => {
    await dispatch(postRecheduleAppointmentAction(data));
    recheduleModalOnClose();
  };
  useEffect(() => {
    if (cancelAppointment?.status === 200) {
      setLoading(true);
      fetchAppointments();
    }
  }, [cancelAppointment]);
  console.log("upcommingAppointments", upcommingAppointments);

  return (
    <Box px={{ base: 4, sm: 16 }} pt={{ base: 2, sm: 8 }} w={"100%"}>
      {(loading || updatedVitals?.loader || navigationLoading) && (
        <LoadingBackdrop />
      )}
      <Tabs w={"100%"}>
        <TabList>
          <Tab w={"100%"}>Upcomming Appointments</Tab>
          <Tab w={"100%"}>Past Appointments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel maxH={"100vh"} overflowY={"scroll"} w={"100%"}>
            {appointmentList?.length > 0 ? (
              appointmentList?.map((item: any) => {
                return (
                  <AppointmentCard
                    data={item}
                    joinConsultaion={handleOpenVitalModal}
                    past={false}
                    handleCancelAppointment={handleCancelAppointment}
                    handleRechedule={handleRechedule}
                  />
                );
              })
            ) : (
              <HStack minW={"80vw"}>
                <Text textAlign={"center"} color={COLORS.error} fontSize={"md"}>
                  There are no upcomming appointments.
                </Text>
                <Link href={"/patient-home/bookappointment"}>
                  <Text color={COLORS.primary} textDecoration={"underline"}>
                    Book Appointment
                  </Text>
                </Link>
              </HStack>
            )}
          </TabPanel>
          <TabPanel maxH={"100vh"} overflowY={"scroll"} minW={"100%"}>
            {pastappointmentList?.length > 0 ? (
              pastappointmentList?.map((item: any) => {
                return (
                  <AppointmentCard
                    data={item}
                    joinConsultaion={handleOpenVitalModal}
                    past={true}
                    handleCancelAppointment={handleCancelAppointment}
                    fetchMedications={fetchMedications}
                  />
                );
              })
            ) : (
              <Box minW={"80vw"}>
                <Text>No Past appointments found</Text>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <VitalsForm
        isOpen={vitalModalOpen}
        onClose={vitalModalOnClose}
        handleUpdateVitals={handleUpdateVitals}
        handleJoinConsultaion={handleJoinConsultaion}
      />
      <AppointmentModal
        isOpen={recheduleModalOpen}
        onClose={recheduleModalOnClose}
        additionalData={doctorDetails}
        rechedule={true}
        bookedData={selectedApppointment}
        handleRechedule={handleRecheduleAppointment}
      />
    </Box>
  );
};

export default page;
