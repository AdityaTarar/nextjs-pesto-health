import { COLORS } from "@/app/colors";
import { CTX } from "@/context/context";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { FaUserDoctor } from "react-icons/fa6";

const AppointmentCard = ({
  data,
  joinConsultaion,
  past,
  handleCancelAppointment,
  fetchMedications,
  handleRechedule,
}: any) => {
  const authContext: any = useContext(CTX);
  const { userType }: any = authContext;

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

  console.log("enabled", joinConsultaionButtonEnabled(data?.date, data?.time));

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        boxShadow="0px 4px 15px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
        mb={4}
        borderRadius={10}
      >
        <CardBody>
          <Stack
            direction={{ base: "column", sm: "row" }}
            alignItems={{ base: "flex-start", sm: "center" }}
            gap={8}
          >
            <HStack alignItems={"flex-start"}>
              <FaUserDoctor
                size={"72px"}
                opacity={0.5}
                color={COLORS.primary}
              />
              <Box display={{ base: "block", sm: "none" }}>
                <Stack>
                  {userType === "doctor" ? (
                    <Text
                      fontSize={"lg"}
                      fontWeight={"700"}
                      color={COLORS.secondary}
                    >
                      {data?.patientInfo?.full_name}
                    </Text>
                  ) : (
                    <Text
                      fontSize={"lg"}
                      fontWeight={"700"}
                      color={COLORS.secondary}
                    >
                      Dr.Amit shah
                    </Text>
                  )}
                  <Text fontSize={"sm"}>
                    {data?.onlineConsultation
                      ? "Online Consultation"
                      : "In Clinic"}
                  </Text>
                </Stack>
              </Box>
            </HStack>
            {/* <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size={"xl"}
            /> */}
            <Box>
              <Stack
                display={"flex"}
                flexDirection={"row"}
                alignItems={"top"}
                gap={4}
              >
                <Stack
                  display={{ base: "none", sm: "flex" }}
                  alignItems={"baseline"}
                  // pt={2}
                >
                  {userType === "doctor" ? (
                    <Text
                      fontSize={"lg"}
                      fontWeight={"700"}
                      color={COLORS.secondary}
                    >
                      {data?.patientInfo?.full_name}
                    </Text>
                  ) : (
                    <Text
                      fontSize={"lg"}
                      fontWeight={"700"}
                      color={COLORS.secondary}
                    >
                      Dr.Amit shah
                    </Text>
                  )}
                  <Text fontSize={"sm"}>
                    {data?.onlineConsultation
                      ? "Online Consultation"
                      : "In Clinic"}
                  </Text>
                </Stack>

                <Stack direction={{ base: "column", sm: "row" }}>
                  <Text
                    fontSize={"md"}
                    color={COLORS.secondary}
                    fontWeight={"700"}
                  >
                    {data?.date}
                  </Text>
                  <Text
                    fontSize={"md"}
                    color={COLORS.primary}
                    fontWeight={"700"}
                  >
                    {data?.time}
                  </Text>
                </Stack>
                {data?.onlineConsultation ? (
                  <>
                    {!past && (
                      <Button
                        onClick={() => joinConsultaion(data?._id)}
                        isDisabled={data?.status === "cancelled" ? true : false}
                        display={{ base: "none", sm: "flex" }}
                      >
                        Join Consultaion
                      </Button>
                    )}
                  </>
                ) : (
                  <Text></Text>
                )}
                <Text
                  fontSize={"md"}
                  color={
                    data?.status === "cancelled" ? COLORS.error : COLORS.success
                  }
                  fontWeight={"700"}
                  textTransform={"capitalize"}
                >
                  {data?.status}
                </Text>
              </Stack>
              <Stack direction={"row"} mt={4} alignItems={"center"} gap={20}>
                {past ? (
                  <Link
                    color={COLORS.primary}
                    _hover={{ borderBottomWidth: 0 }}
                    onClick={() => {}}
                  >
                    <Text
                      borderBottomWidth={1}
                      borderBottomColor={COLORS.primary}
                      borderStyle={"solid"}
                    >
                      View Medications
                    </Text>
                  </Link>
                ) : (
                  <>
                    {data?.status !== "cancelled" && (
                      <>
                        <Button onClick={() => handleRechedule(data)}>
                          Rechedule
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() => handleCancelAppointment(data)}
                        >
                          Cancel
                        </Button>
                        <Link
                          color={COLORS.primary}
                          _hover={{ borderBottomWidth: 0 }}
                        >
                          <Text
                            borderBottomWidth={1}
                            borderBottomColor={COLORS.primary}
                            borderStyle={"solid"}
                          >
                            Attach Reports
                          </Text>
                        </Link>
                      </>
                    )}
                  </>
                )}
                {(data?.status !== "cancelled" || userType !== "doctor") && (
                  <Link
                    color={COLORS.primary}
                    _hover={{ borderBottomWidth: 0 }}
                  >
                    <Text
                      borderBottomWidth={1}
                      borderBottomColor={COLORS.primary}
                      borderStyle={"solid"}
                    >
                      Chat with Dr. Amit
                    </Text>
                  </Link>
                )}
              </Stack>
            </Box>
          </Stack>
          {data?.onlineConsultation ? (
            <>
              {!past && (
                <Button
                  onClick={() => joinConsultaion(data?._id)}
                  isDisabled={
                    data?.status === "cancelled"
                      ? true
                      : dayjs().isAfter(dayjs(data?.date))
                      ? false
                      : true
                  }
                  display={{ base: "flex", sm: "none" }}
                >
                  Join Consultaion
                </Button>
              )}
            </>
          ) : (
            <Text></Text>
          )}
        </CardBody>
        {/* <CardFooter display={{ base: "block", sm: "none" }}> */}

        {/* </CardFooter> */}
      </Card>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to cancel the Appoinment?
          </ModalHeader>
          <ModalBody>
            <HStack>
              <Button onClick={() => handleCancel(data?._id)}>
                Yes, Cancel
              </Button>
              <Button onClick={onClose} variant={"outline"}>
                No
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default AppointmentCard;
