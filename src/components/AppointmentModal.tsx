"use client";
import { COLORS } from "@/app/colors";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Avatar,
  Stack,
  Box,
  IconButton,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getDoctorsAvailabilityAction } from "@/store/actions/patient/appointmentActions";
import { CTX } from "@/context/context";
import LoadingBackdrop from "./Loader";

function AppointmentModal({
  isOpen,
  onClose,
  additionalData,
  rechedule,
  bookedData,
  handleRechedule,
}: any) {
  const authContext: any = useContext(CTX);
  const { navigationLoading, _startGlobalNavigation } = authContext;
  const dispatch: any = useDispatch();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    rechedule ? bookedData?.time : ""
  );
  console.log("bookedData", bookedData);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [onlineConsultation, setOnlineConsultaion] = useState(false);
  const doctorsAvailability = useSelector(
    (state: any) => state?.appointmentData?.doctorsAvailability?.data
  );
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 3);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };
  const [selectedDate, setSelctedDate] = useState(
    rechedule ? bookedData?.date : ""
  );
  useEffect(() => {
    fetchDoctorsAvailability();
  }, [isOpen, additionalData]);
  const fetchDoctorsAvailability = async () => {
    dispatch(getDoctorsAvailabilityAction({ doctorId: additionalData?._id }));
  };
  const getFormattedDate = (date: any) => {
    const options: any = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // function generateTimeSlots(
  //   date: any,
  //   availableTimeSlots: any[],
  //   duration: number,
  //   unavailableTimeSlots: any
  // ) {
  //   let availableResult: string[] = [];

  //   if (Array.isArray(availableTimeSlots)) {
  //     availableTimeSlots.forEach((slot) => {
  //       const [startTime, endTime] = slot.split(" - ");

  //       const startDate = new Date(`${date} ${startTime}`);
  //       const endDate = new Date(`${date} ${endTime}`);

  //       let currentTime = startDate;

  //       while (currentTime < endDate) {
  //         const formattedStartTime = currentTime.toLocaleTimeString("en-US", {
  //           hour: "numeric",
  //           minute: "2-digit",
  //         });
  //         const nextTime = new Date(currentTime.getTime() + duration * 60000);
  //         const formattedEndTime = nextTime.toLocaleTimeString("en-US", {
  //           hour: "numeric",
  //           minute: "2-digit",
  //         });

  //         availableResult.push(`${formattedStartTime} - ${formattedEndTime}`);

  //         currentTime = nextTime;
  //       }
  //     });
  //   }

  //   let unavailableResult: any = [];

  //   if (Array.isArray(unavailableTimeSlots)) {
  //     unavailableTimeSlots.forEach(
  //       (slot: { split: (arg0: string) => [any, any] }) => {
  //         const [startTime, endTime] = slot.split(" - ");

  //         const startDate = new Date(`${date} ${startTime}`);
  //         const endDate = new Date(`${date} ${endTime}`);

  //         let currentTime = startDate;

  //         while (currentTime < endDate) {
  //           const formattedStartTime = currentTime.toLocaleTimeString("en-US", {
  //             hour: "numeric",
  //             minute: "2-digit",
  //           });
  //           const nextTime = new Date(currentTime.getTime() + duration * 60000);
  //           const formattedEndTime = nextTime.toLocaleTimeString("en-US", {
  //             hour: "numeric",
  //             minute: "2-digit",
  //           });

  //           unavailableResult.push(
  //             `${formattedStartTime} - ${formattedEndTime}`
  //           );

  //           currentTime = nextTime;
  //         }
  //       }
  //     );
  //   } else {
  //   }

  //   return {
  //     date,
  //     availableTimeSlots,
  //     generatedAvailableTimeSlots: availableResult,
  //     unavailableTimeSlots,
  //     generatedUnavailableTimeSlots: unavailableResult,
  //   };
  // }

  // useEffect(() => {
  //   if (!isOpen) {
  //     return;
  //   }
  //   // if (doctorsAvailability?.length > 0 && Array.isArray(doctorsAvailability)) {
  //   //   const processedData = doctorsAvailability.map(
  //   //     (item: {
  //   //       date: any;
  //   //       availableTimeSlots: any[];
  //   //       duration: number;
  //   //       unavailableTimeSlots: string | string[];
  //   //     }) =>
  //   //       generateTimeSlots(
  //   //         item.date,
  //   //         item.availableTimeSlots,
  //   //         item.duration,
  //   //         item.unavailableTimeSlots
  //   //       )
  //   //   );
  //   //   setAvailableSlotsMaster(processedData);
  //   // }
  // }, [isOpen, doctorsAvailability, selectedDate]);

  const renderDateBox = (date: any, availableSlots: any) => (
    <Box
      key={Math.random()}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      borderWidth={selectedDate === date ? 2 : 0}
      padding={2}
      borderRadius={10}
      borderColor={COLORS.primary}
      cursor={"pointer"}
      onClick={() => setSelctedDate(date)}
    >
      <Text color={COLORS.primary}>{getFormattedDate(date)}</Text>
      <Text>{availableSlots} Slots available</Text>
    </Box>
  );
  const handleRecheduleAppointment = () => {
    const payload = {
      appointmentId: bookedData?.appointmentId,
      oldDate: bookedData?.date,
      newDate: selectedDate,
      newTime: selectedTimeSlot,
      oldTime: bookedData?.time,
      doctorId: bookedData?.doctorId,
    };
    handleRechedule(payload);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        {navigationLoading && <LoadingBackdrop />}

        <ModalContent>
          <ModalHeader>
            <Stack
              direction={{ base: "column", sm: "row" }}
              gap={30}
              w={"100%"}
              display={"flex"}
              alignItems={{ base: "flex-start", sm: "center" }}
              justifyContent={"space-between"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={"row"}
                gap={10}
              >
                <Box>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                    size={"xl"}
                  />
                </Box>
                <Stack
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"700"}
                    color={COLORS.secondary}
                  >
                    Dr. {additionalData?.first_name} {additionalData?.last_name}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    // my={2}
                    color={COLORS.text_gray}
                    fontWeight={"400"}
                  >
                    {additionalData?.specialization}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    color={COLORS.text_gray}
                    fontWeight={"400"}
                  >
                    {additionalData?.experience} years of experience
                  </Text>
                </Stack>
              </Box>
              <Box>
                {rechedule ? (
                  <Button onClick={() => handleRecheduleAppointment()}>
                    Rechedule
                  </Button>
                ) : (
                  <Link
                    href={{
                      pathname:
                        "/patient-home/bookappointment/appointmentsummary",
                      query: {
                        selectedDate: selectedDate,
                        selectedTimeSlot: selectedTimeSlot,
                        onlineConsultation: onlineConsultation,
                        location: "Pune",
                        doctorId: additionalData?._id,
                        doctorName: `${additionalData?.first_name} ${additionalData?.last_name}`,
                        specialization: additionalData?.specialization,
                        address: additionalData?.address,
                        consultationFee: additionalData?.consultationFee,
                      },
                    }}
                    color={COLORS.primary}
                    aria-disabled={true}
                    onClick={() => _startGlobalNavigation()}
                  >
                    Book Now
                  </Link>
                )}
              </Box>
            </Stack>
          </ModalHeader>
          <ModalBody>
            {!rechedule && (
              <Stack
                direction={{ base: "column", sm: "row" }}
                alignItems={{ base: "flex-start", sm: "center" }}
                borderTopWidth={2}
                p={{ base: 2, sm: 4 }}
              >
                <Text fontSize={"medium"} fontWeight={"600"}>
                  Appointment type:
                </Text>
                <RadioGroup
                  defaultValue="false"
                  onChange={(e) =>
                    setOnlineConsultaion(e === "false" ? false : true)
                  }
                >
                  <Stack spacing={5} direction="row">
                    <Radio value="false">In Clinic</Radio>
                    <Radio value="true">Online Consultaion</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            )}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              p={4}
              alignItems={"center"}
              borderStyle={"solid"}
              borderTopWidth={2}
              borderBottomWidth={2}
              mb={4}
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Previous"
                icon={<FaChevronLeft />}
                onClick={handlePrev}
              />
              {doctorsAvailability
                ?.slice(currentIndex, currentIndex + 3)
                ?.map((date: any) =>
                  renderDateBox(
                    date?.date,
                    date?.generatedAvailableTimeSlots?.length
                  )
                )}
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Next"
                icon={<FaChevronRight />}
                onClick={handleNext}
              />
            </Stack>

            <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
              {doctorsAvailability?.length > 0 &&
                doctorsAvailability
                  .filter((date: any) => date.date === selectedDate)
                  .map((date: any) => {
                    const unavailableTimeSlots =
                      date?.generatedUnavailableTimeSlots;
                    const generatedSlots =
                      date?.generatedAvailableTimeSlots.filter(
                        (time: any) => !unavailableTimeSlots.includes(time)
                      ) || [];

                    return (
                      generatedSlots?.length > 0 && (
                        <React.Fragment key={date.date}>
                          {generatedSlots?.map((slot: any, index: any) => (
                            <Button
                              key={index}
                              variant={
                                selectedTimeSlot === slot ? "filled" : "outline"
                              }
                              onClick={() => setSelectedTimeSlot(slot)}
                              color={
                                selectedTimeSlot === slot
                                  ? "white"
                                  : COLORS.secondary
                              }
                            >
                              {slot}
                            </Button>
                          ))}
                        </React.Fragment>
                      )
                    );
                  })}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppointmentModal;
