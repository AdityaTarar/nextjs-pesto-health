"use client";
import AppointmentCard from "@/components/AppointmentCard";
import { CTX } from "@/context/context";
import {
  getAppointmentsByPatientAction,
  getVideoConferenceDetailsAction,
} from "@/store/actions/patient/appointmentActions";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const { userDetails }: any = authContext;
  const [appointmentList, setAppointmentList] = useState([]);
  const [pastappointmentList, setPastAppointmentList] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");

  const upcommingAppointments = useSelector(
    (state: any) => state?.appointmentData?.appointmentsByPatient?.data
  );
  const videoConferenceDetails = useSelector(
    (state: any) => state?.appointmentData?.videoConferenceDetails?.data
  );
  useEffect(() => {
    fetchAppointments();
  }, [userDetails]);

  const fetchAppointments = async () => {
    try {
      await dispatch(
        getAppointmentsByPatientAction({
          id: userDetails?._id,
          userType: "doctor",
        })
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    if (upcommingAppointments?.status === 200) {
      setPastAppointmentList(upcommingAppointments?.data?.pastAppointments);
      setAppointmentList(upcommingAppointments?.data?.upcomingAppointments);
    }
  }, [upcommingAppointments]);
  const handleJoinConsultaion = async () => {
    await dispatch(
      getVideoConferenceDetailsAction({ appointmentId: appointmentId })
    );
  };
  useEffect(() => {
    if (videoConferenceDetails?.status === 200) {
      router.push(`/meeting?${videoConferenceDetails?.data?.meetingInfo?.id}`);
    } else {
    }
  }, [videoConferenceDetails]);
  console.log("appointmentList", upcommingAppointments);

  return (
    <Box px={{ base: 4, sm: 16 }} pt={{ base: 2, sm: 8 }} w={"100%"}>
      <Tabs w={"100%"}>
        <TabList>
          <Tab w={"100%"}>Upcomming Appointments</Tab>
          <Tab w={"100%"}>Past Appointments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel maxH={"100vh"} overflowY={"scroll"}>
            {appointmentList?.length > 0 ? (
              appointmentList?.map((item: any) => {
                return (
                  <AppointmentCard
                    data={item}
                    joinConsultaion={handleJoinConsultaion}
                    past={false}
                    // handleCancelAppointment={handleCancelAppointment}
                  />
                );
              })
            ) : (
              <Text fontSize={"2xl"} textAlign={"center"}>
                No upcomming appointments
              </Text>
            )}
          </TabPanel>
          <TabPanel maxH={"100vh"} overflowY={"scroll"}>
            {pastappointmentList?.length > 0 ? (
              pastappointmentList?.map((item: any) => {
                return <AppointmentCard data={item} past={true} />;
              })
            ) : (
              <Text fontSize={"2xl"} textAlign={"center"}>
                No upcomming appointments
              </Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default page;
