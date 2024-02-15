"use client";
import AppointmentModal from "@/components/AppointmentModal";
import DoctorCard from "@/components/DoctorCard";
// import Map from "@/components/Map";
import { CTX } from "@/context/context";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { COLORS } from "@/app/colors";
import { STATES } from "@/utils/states";
// import axios from "axios";
import LoadingBackdrop from "@/components/Loader";
import { getDoctorsAction } from "@/store/actions/patient/appointmentActions";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
export default function page() {
  const { isOpen, onOpen, onClose }: any = useDisclosure();
  const authContext: any = useContext(CTX);
  const { userDetails, isAuthenticated }: any = authContext;
  const [searchText, setSearchText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [city, setCity] = useState([]);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const doctorsList = useSelector(
    (state: any) => state?.appointmentData?.doctors?.data
  );
  // const [doctorsList, setdoctorsList] = useState([]);
  // useEffect(() => {
  //   setSelectedCity(userDetails?.city);
  // }, [userDetails]);
  useEffect(() => {
    let timer: any = null;
    timer = setTimeout(async () => {
      setLoading(true);
      dispatch(getDoctorsAction({ name: searchText, city: selectedCity }));
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, dispatch, selectedCity]);
  useEffect(() => {
    let timer: any = null;
    timer = setTimeout(async () => {
      setLoading(true);
      dispatch(getDoctorsAction({ name: searchText, city: selectedCity }));
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, dispatch, selectedCity, userDetails]);
  const handleSelectedDoctor = (data: any) => {
    setSelectedDoctor(data);
    onOpen();
  };
  // useEffect(() => {
  //   axios
  //     .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
  //       country: "India",
  //       state: selectedState,
  //     })
  //     .then((response: any) => {
  //       setCity(response.data.data);
  //     })
  //     .catch((error: any) => {
  //       alert(error);
  //     });
  // }, [selectedState]);

  return (
    <Box px={{ base: 4, sm: 16 }} pt={{ base: 2, sm: 8 }}>
      {loading && <LoadingBackdrop />}
      <Box
        mb={8}
        display={"flex"}
        alignItems={"center"}
        flexDirection={["column", null, "row"]}
        gap={4}
      >
        <InputGroup alignItems={"center"}>
          <Input
            placeholder="Search by doctor name or specialization"
            borderRadius={100}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            mb={0}
            height={"3rem"}
            type="text"
          />
          <InputRightElement
            pointerEvents="none"
            fontSize="1.2em"
            height={"3rem"}
          >
            <FaSearch color={COLORS.primary} />
          </InputRightElement>
        </InputGroup>
        <Select
          placeholder="States"
          maxW={{ base: "100%", sm: "20vw" }}
          borderRadius={100}
          defaultValue={"Maharashtra"}
          onChange={(e: any) => setSelectedState(e)}
          height={"3rem"}
          bg={"#eaf0f6"}
          iconSize="24px"
          iconColor={COLORS.primary}
        >
          {STATES.map((state: any) => {
            return <option value={state.state}>{state.name}</option>;
          })}
        </Select>
        <Select
          placeholder="City"
          maxW={{ base: "100%", sm: "20vw" }}
          borderRadius={100}
          onChange={(e: any) => setSelectedCity(e.target.value)}
          defaultValue={"Pune"}
          height={"3rem"}
          bg={"#eaf0f6"}
          iconColor={COLORS.primary}
          iconSize="24px"
        >
          {city?.length > 0 &&
            city.map((item: any) => {
              return <option value={item}>{item}</option>;
            })}
        </Select>
      </Box>
      <Text fontSize={"2xl"} fontWeight={"700"}>
        {/* Doctors in {userDetails?.city} */}
      </Text>
      <SimpleGrid h={"95vh"} dir="row" columns={{ sm: 1, md: 2 }}>
        <Box maxH={"95vh"} overflowY={"scroll"}>
          {doctorsList?.length > 0 ? (
            doctorsList?.map((Doctor: { id: React.Key | null | undefined }) => (
              <div key={Doctor.id}>
                <DoctorCard
                  data={Doctor}
                  handleSelectedDoctor={handleSelectedDoctor}
                />
              </div>
            ))
          ) : (
            <Text fontSize={"large"} mt={8}>
              No doctor found in your city, please try with different city.
            </Text>
          )}
        </Box>
        <Box maxH={"95vh"}>
          <MapWithNoSSR />
        </Box>
      </SimpleGrid>
      <AppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        additionalData={selectedDoctor}
      />
    </Box>
  );
}
