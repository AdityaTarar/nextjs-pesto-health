import { COLORS } from "@/app/colors";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Avatar,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";

const AppointmentDetails = ({
  isOpen,
  onClose,
  patientInfo,
  appointmentDetails,
  handleJoin,
}: any) => {
  const joinConsultaionButtonEnabled = (
    appointmentDate: any,
    appointmentTime: string
  ) => {
    const format = "YYYY-MM-DD HH:mm";
    const startTimeString = `${appointmentDate} ${
      appointmentTime.split(" - ")[0]
    }`; // Assuming appointmentTime is "9:40 AM - 10:00 AM"
    const endTimeString = `${appointmentDate} ${
      appointmentTime.split(" - ")[1]
    }`;

    const now = dayjs();
    const startTime = dayjs(startTimeString, format);
    const endTime = dayjs(endTimeString, format);

    return now.isAfter(startTime) && now.isBefore(endTime);
  };
  console.log("appointmentDetails", appointmentDetails);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size={"xl"}
            />
            <Text
              fontSize={"large"}
              fontWeight={"700"}
              color={COLORS.secondary}
            >
              {appointmentDetails?.patientInfo?.full_name}
            </Text>
            {appointmentDetails?.onlineConsultation && (
              <Button
                onClick={() => handleJoin(appointmentDetails?._id)}
                // isDisabled={
                //   appointmentDetails?.status === "cancelled"
                //     ? true
                //     : joinConsultaionButtonEnabled(
                //         appointmentDetails?.date,
                //         appointmentDetails?.time
                //       )
                //     ? false
                //     : true
                // }
              >
                Join
              </Button>
            )}
          </Stack>
        </ModalHeader>
        <ModalBody>
          <Box borderBottomWidth={2} borderTopWidth={2} py={4}>
            <Stack direction={"row"} gap={4} alignItems={"center"}>
              <Text color={COLORS.primary}>Phone Number :</Text>
              <Text>{appointmentDetails?.patientInfo?.contact_number}</Text>
            </Stack>
            <Stack direction={"row"} gap={4} alignItems={"center"}>
              <Text color={COLORS.primary}>Email :</Text>
              <Text>{appointmentDetails?.patientInfo?.email}</Text>
            </Stack>
            <Stack direction={"row"} gap={4} alignItems={"center"}>
              <Text color={COLORS.primary}>Appointment Type :</Text>
              <Text>
                {appointmentDetails?.onlineConsultation
                  ? "Online Consultation"
                  : "In Clinic Visit"}
              </Text>
            </Stack>
            <Stack direction={"row"} gap={4} alignItems={"center"}>
              <Text color={COLORS.primary}>Time and Date :</Text>
              <Text>
                {appointmentDetails?.date} / {appointmentDetails?.time}
              </Text>
            </Stack>
            <Stack direction={"row"} gap={4} alignItems={"center"}>
              <Text color={COLORS.primary}>Payment type : </Text>
              <Text>
                {appointmentDetails?.paymentMode === "pay_later"
                  ? "Pay at clinic"
                  : "Online"}
              </Text>
            </Stack>
          </Box>
          <Stack direction={"row"} mt={4}>
            <Button>Request Rechedule</Button>
            <Button variant={"outline"}>Request Cancel</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentDetails;
