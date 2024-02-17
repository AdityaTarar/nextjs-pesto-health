"use client";
import { COLORS } from "@/app/colors";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import success from "../../../../../public/images/success.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  postAppointmentStatusAction,
  postCancelAppointmentAction,
  postRecheduleAppointmentAction,
} from "@/store/actions/patient/appointmentActions";
import { Link } from "@chakra-ui/next-js";

export default function page({ searchParams }: any) {
  const dispatch: any = useDispatch();
  const router = useRouter();
  console.log("searchParams", searchParams);
  console.log("searchParamsId", searchParams?.id?.toString());

  const appointmentstatus = useSelector(
    (state: any) => state?.appointmentData?.appointmentStatus?.data?.data
  );
  const cancelAppointment = useSelector(
    (state: any) => state?.appointmentData?.appointmentCancellation?.data
  );
  useEffect(() => {
    handleAppointmentStatus();
  }, [searchParams]);
  const handleAppointmentStatus = async () => {
    await dispatch(
      postAppointmentStatusAction({
        appointmentId: searchParams?.id?.toString(),
      })
    );
  };
  const handleCancelAppointment = async () => {
    const payload = {
      appointmentId: searchParams?.id,
      doctorId: searchParams?.doctorId,
      date: searchParams?.date,
      time: searchParams?.time,
    };
    await dispatch(postCancelAppointmentAction(payload));
    if (cancelAppointment?.data?.status === 200) {
      handleAppointmentStatus();
    }
  };
  const recheduleAppointment = async () => {
    const payload = {
      appointmentId: searchParams?.appointmentId,
      doctorId: searchParams?.doctorId,
      date: searchParams?.selectedDate,
      oldTime: searchParams?.selectedTimeSlot,
      newTime: searchParams?.newTime,
    };
    await dispatch(postRecheduleAppointmentAction(payload));
  };
  console.log("appointmentstatus", appointmentstatus);

  return (
    <SimpleGrid
      h={"100vh"}
      dir="row"
      columns={{ sm: 1, md: 2 }}
      p={{ base: 4, sm: 16 }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // maxW={{ base: "100vw", sm: "auto" }}
      >
        <Image src={success} alt="login-svg" />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        // p={{ base: 0, md: 0, lg: 32 }}
        flexDirection={"column"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          {appointmentstatus?.status?.toLowerCase() === "confirmed" ? (
            <FaCheckCircle size={"32px"} color={COLORS.success} />
          ) : (
            <MdCancel size={"32px"} color={COLORS.error} />
          )}
          <Text fontSize={"xl"} fontWeight={"700"} textTransform={"capitalize"}>
            Appointment {appointmentstatus?.status}
          </Text>
        </Stack>
        <Text my={10} fontSize={"lg"}>
          Your appointment ID is{" "}
          <span color={COLORS.primary}>{appointmentstatus?.appointmentId}</span>
        </Text>
        <Text fontSize={"lg"}>
          We have sent you an SMS and Email with the details.
        </Text>
        <HStack my={10} gap={10}>
          <VStack gap={4} alignItems={"left"}>
            <Box>
              <Text fontSize={"sm"}>Patient Name</Text>
              <Text fontSize={"lg"}>
                {appointmentstatus?.patientInfo?.full_name}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"sm"}>Contact Number</Text>
              <Text fontSize={"lg"}>
                +91 {appointmentstatus?.patientInfo?.contact_number}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"sm"}>Email</Text>
              <Text fontSize={"lg"}>
                {appointmentstatus?.patientInfo?.email}
              </Text>
            </Box>
          </VStack>
          <VStack gap={4} alignItems={"left"}>
            <Box>
              <Text fontSize={"sm"}>Doctor Name</Text>
              <Text fontSize={"lg"}>
                {appointmentstatus?.doctorDetails?.first_name}{" "}
                {appointmentstatus?.doctorDetails?.last_name}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"sm"}>Date</Text>
              <Text fontSize={"lg"}>{appointmentstatus?.date}</Text>
            </Box>
            <Box>
              <Text fontSize={"sm"}>Time</Text>
              <Text fontSize={"lg"}>{appointmentstatus?.time}</Text>
            </Box>
          </VStack>
        </HStack>
        {/* {appointmentstatus?.status === "cancelled" ? (
          <Link
            color={COLORS.primary}
            borderBottomWidth={1}
            fontSize={"18px"}
            fontWeight={"700"}
            href={"/patient-dashboard"}
          >
            Dashboard
          </Link>
        ) : (
          <Stack direction={"row"} gap={4}>
            <Button minWidth={{ base: "50%", sm: "100%" }}>Rechedule</Button>
            <Button
              minWidth={{ base: "50%", sm: "100%" }}
              variant={"outline"}
              onClick={() => handleCancelAppointment()}
            >
              Cancel
            </Button>
          </Stack>
        )} */}
      </Box>
    </SimpleGrid>
  );
}
