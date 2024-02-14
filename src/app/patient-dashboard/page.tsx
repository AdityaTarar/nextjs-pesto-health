"use client";
import Charts from "@/components/Charts";
import VitalsForm from "@/components/VitalsForm";
import { CTX } from "@/context/context";
// import { getAllVitalsByPatient } from "@/store/slices/patients/vitalSlice";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import moment, { MomentInput } from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../colors";
import { getAppointmentsByPatientAction } from "@/store/actions/patient/appointmentActions";
import {
  getAllVitalsByPatientAction,
  updateVitalsAction,
} from "@/store/actions/patient/vitalActions";

const page = () => {
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const { userDetails }: any = authContext;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [vitals, setVitals]: any = useState([]);
  const upcommingAppointments = useSelector(
    (state: any) =>
      state?.appointmentData?.appointmentsByPatient?.data?.data
        ?.upcomingAppointments
  );
  const updatedVitals = useSelector(
    (state: any) => state?.vitalsData?.updateVitals?.data
  );
  const vitalsData = useSelector((state: any) => state?.vitalsData);
  console.log("upcommingAppointments", upcommingAppointments);

  useEffect(() => {
    if (userDetails?._id !== undefined) {
      handleGetVitals();
      fetchAppointments();
    }
  }, [userDetails?._id]);
  const handleUpdateVitals = async (formdata: any) => {
    const payload = {
      patientId: userDetails?._id,
      patientVitals: { ...formdata, date: dayjs().toISOString() },
    };
    await dispatch(updateVitalsAction(payload));
  };
  const handleGetVitals = async () => {
    await dispatch(
      getAllVitalsByPatientAction({ patientId: userDetails?._id })
    );
    // if (res?.payload?.status === 200) {
    //   const vitalsCopy = [res?.payload?.data];
    //   const sortedVitals = vitalsCopy.sort(
    //     (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    //   );
    //   const sortedVitalsCopy = [...sortedVitals];
    //   setVitals(sortedVitalsCopy);
    // }
  };

  function extractVitalProperty(vitals: any, propertyName: any): any {
    const flattenedVitals = vitals.flat();

    const filteredVitals = flattenedVitals.filter(
      (vital: { hasOwnProperty: (arg0: any) => any }) =>
        vital.hasOwnProperty(propertyName)
    );

    const mappedVitals = filteredVitals.map((vital: { [x: string]: any }) => ({
      [propertyName]: vital[propertyName],
    }));

    return mappedVitals;
  }
  const extractBloodPressureProperty = (
    vitals: any[],
    lb: string | number,
    hb: string | number
  ) => {
    return vitals.flat().map((vital: { [x: string]: any }) => ({
      [lb]: vital[lb],
      [hb]: vital[hb],
    }));
  };
  const calculateBMI = (heightInInches: number, weightInKg: number) => {
    const heightInMeters = heightInInches * 0.0254;

    const bmi = weightInKg / Math.pow(heightInMeters, 2);
    let classification = "";
    if (bmi < 18.5) {
      classification = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      classification = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      classification = "Overweight";
    } else {
      classification = "Obesity";
    }

    return { bmi, classification };
  };
  const fetchAppointments = async () => {
    try {
      await dispatch(
        getAppointmentsByPatientAction({
          id: userDetails?._id,
          userType: "patient",
        })
      );
      // setUpcommingAppointments(res?.payload?.data?.upcomingAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  console.log(
    'extractVitalProperty(vitals, "heartRate")',
    extractVitalProperty(vitals, "heartRate")
  );

  return (
    <>
      <SimpleGrid
        gap={8}
        h={"100vh"}
        dir="row"
        columns={{ sm: 1, md: 2 }}
        p={4}
      >
        <Box>
          <Link
            onClick={() => onOpen()}
            color={COLORS.primary}
            fontWeight={"700"}
          >
            Update Vitals
          </Link>
          {vitals?.length > 0 && (
            <SimpleGrid
              gap={8}
              mt={8}
              h={"50vh"}
              dir="row"
              columns={{ sm: 1, md: 2 }}
            >
              <Charts
                chartData={extractVitalProperty(vitals, "heartRate")}
                chartType="heartRate"
                latestVital={
                  extractVitalProperty(vitals, "heartRate")[
                    extractVitalProperty(vitals, "heartRate").length - 1
                  ]?.heartRate
                }
              />
              <Charts
                chartData={extractVitalProperty(vitals, "oxygenLevel")}
                latestVital={
                  extractVitalProperty(vitals, "oxygenLevel")[
                    extractVitalProperty(vitals, "oxygenLevel").length - 1
                  ]?.oxygenLevel
                }
                chartType="oxygenLevel"
              />
              <Charts
                chartData={extractBloodPressureProperty(vitals, "lBp", "hBp")}
                chartType="bp"
                latestVital={`${
                  extractBloodPressureProperty(vitals, "lBp", "hBp")[
                    extractBloodPressureProperty(vitals, "lBp", "hBp").length -
                      1
                  ]?.hBp
                }/${
                  extractBloodPressureProperty(vitals, "lBp", "hBp")[
                    extractVitalProperty(vitals, "heartRate").length - 1
                  ]?.lBp
                }`}
              />
              <Charts
                chartData={extractVitalProperty(vitals, "bodyTemp")}
                chartType="bodyTemp"
                latestVital={
                  extractVitalProperty(vitals, "bodyTemp")[
                    extractVitalProperty(vitals, "bodyTemp").length - 1
                  ]?.bodyTemp
                }
              />
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Box p={4} borderRadius={20} bg={"rgba(108, 99, 255, 0.3)"}>
            <HStack gap={8} alignItems={"start"}>
              <Box>
                <Box p={4} bg={"#F8DEBD"} mb={4} borderRadius={10}>
                  <Text>
                    Height {extractVitalProperty(vitals, "height")[0]?.height}{" "}
                    inch
                  </Text>
                </Box>
                <Box p={4} bg={"#F8DEBD"} borderRadius={10}>
                  <Text>
                    Weight {extractVitalProperty(vitals, "weight")[0]?.weight}{" "}
                    kg
                  </Text>
                </Box>
              </Box>
              <Box bg={COLORS.primary} p={4} color={"white"} borderRadius={10}>
                <Text fontSize={"xl"}>Body Mass Index(BMI)</Text>
                <Text fontSize={"lg"} my={2} fontWeight={"700"}>
                  {calculateBMI(
                    extractVitalProperty(vitals, "height")[0]?.height,
                    extractVitalProperty(vitals, "weight")[0]?.weight
                  ).bmi.toFixed(2)}
                </Text>
                <Text fontSize={"md"}>
                  {
                    calculateBMI(
                      extractVitalProperty(vitals, "height")[0]?.height,
                      extractVitalProperty(vitals, "weight")[0]?.weight
                    ).classification
                  }
                </Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={"white"}>
            <Text
              fontSize={"lg"}
              fontWeight={"700"}
              color={COLORS.primary}
              my={8}
            >
              Upcomming Appointments
            </Text>
            <Box maxH={"49vh"} overflowY={"scroll"}>
              {upcommingAppointments?.length > 0 &&
                upcommingAppointments?.map((items: any, index: any) => {
                  return (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      p={4}
                      backgroundColor={
                        index === 0 ? COLORS.primary : "rgba(108, 99, 255, 0.5)"
                      }
                      color={index === 0 ? "white" : COLORS.secondary}
                      borderRadius={20}
                      // boxShadow={" 0px 4px 32px 0px rgba(0, 0, 0, 0.10)"}
                      mb={4}
                      cursor={"pointer"}
                      justifyContent={"space-evenly"}
                      onClick={() => {}}
                    >
                      <Avatar
                        name={items?.patientInfo?.full_name}
                        size={"sm"}
                      />
                      <Text fontWeight={index === 0 ? "700" : "500"}>
                        {items?.patientInfo?.full_name}
                      </Text>
                      <Text fontWeight={index === 0 ? "700" : "500"}>
                        {items?.time}
                      </Text>
                      <Text fontWeight={index === 0 ? "700" : "500"}>
                        {items?.onlineConsultation ? "Online" : "In Clinic"}
                      </Text>
                    </Stack>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </SimpleGrid>
      <VitalsForm
        isOpen={isOpen}
        onClose={onClose}
        handleUpdateVitals={(data: any) => handleUpdateVitals(data)}
      />
    </>
  );
};

export default page;
