"use client";
import {
  Box,
  Button,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import dahsbaordImage1 from "../../../public/images/dahsbaordImage1.svg";
import lab from "../../../public/images/lab.svg";
import { COLORS } from "../colors";
import { useRouter } from "next/navigation";
import { helathcareLogout } from "@/store/slices/healthcare/authSlice";
import { useContext, useEffect, useState } from "react";
import DashboardDoctorCard from "@/components/DashboardDoctorCard";
import {
  clearAppointmentDetails,
  getAllDoctorListAction,
} from "@/store/actions/patient/appointmentActions";
import { Dispatch } from "redux";
import { CTX } from "@/context/context";
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  const authContext: any = useContext(CTX);
  const { _startGlobalNavigation } = authContext;
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState([]);
  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = async () => {
    // await dispatch(getAllDoctorListAction());
    // if (res?.payload?.status === 200) {
    //   setDoctorsList(res?.payload?.data);
    // }
  };
  console.log(doctorsList);

  return (
    <Box>
      <SimpleGrid gap={8} dir="row" columns={{ sm: 1, md: 2 }} p={8}>
        <Box>
          <Text fontSize={"6xl"} fontWeight={"700"} mb={4}>
            Your online <Text color={COLORS.primary}>healthcare solution </Text>
            platform.
          </Text>
          <Button
            borderRadius={100}
            onClick={() => {
              _startGlobalNavigation(),
                router.push("/patient-home/bookappointment");
            }}
          >
            Book Appointment
          </Button>
        </Box>
        <Box>
          <Image src={dahsbaordImage1} alt="dahsbaordImage1" />
        </Box>
      </SimpleGrid>
      {/* <Divider />
      <Box my={{ base: 2, sm: 8 }} px={8}>
        <Text fontWeight={"700"} fontSize={"3xl"} color={COLORS.primary} mb={8}>
          Doctors near you
        </Text>
        <HStack maxW={"90vw"} overflowX={"scroll"}>
          <Text
            color={COLORS.primary}
            fontSize={"3xl"}
            fontWeight={"700"}
          ></Text>
          {doctorsList?.length > 0 &&
            doctorsList?.map((item: any) => {
              return <DashboardDoctorCard data={item} />;
            })}
        </HStack>
      </Box>
      <Divider /> */}

      <SimpleGrid dir="row" columns={{ sm: 1, md: 2 }}>
        <Box>
          <Image src={lab} alt="lab" />
        </Box>
        <Box width={"100%"}>
          <Text fontSize={"6xl"} fontWeight={"700"} mb={4}>
            Secure your <Text color={COLORS.primary}>health</Text> with a simple
            click
          </Text>
          {/* <Text fontSize={"2xl"} flexDirection={"row"}>
            Book your<Text color={COLORS.primary}> lab test </Text>now for peace
            of mind.
          </Text> */}
          <HStack fontSize={"2xl"} mb={8}>
            <Text>Book you</Text>
            <Text color={COLORS.primary}> lab test </Text>
            <Text>now for peace of mind.</Text>
          </HStack>
          <Button
            borderRadius={100}
            onClick={() => dispatch(helathcareLogout())}
          >
            Book Lab Test
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
