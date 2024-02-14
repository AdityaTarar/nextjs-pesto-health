import { COLORS } from "@/app/colors";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
  Image,
  HStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

function DoctorCard({ data, handleSelectedDoctor }: any) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      p={4}
      boxShadow="0px 4px 15px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
      mb={4}
      borderRadius={10}
      maxW={{ base: "100%", sm: "541px" }}
      maxH={{ base: "100%", sm: "215px" }}
    >
      <Box display={"flex"} flexDirection={"row"}>
        <Image
          objectFit="cover"
          maxW={{ base: "30%", sm: "250px" }}
          maxH={{ base: "120px", sm: "195px" }}
          src={
            "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png"
          }
          alt="Caffe Latte"
          borderRadius={10}
        />
        <Stack>
          <CardBody py={0}>
            <Text size="md" fontWeight={"700"} color={COLORS.secondary}>
              Dr. {data.first_name} {data?.last_name}
            </Text>
            <Text py="1">
              {data?.rating} {data?.specialisation}
            </Text>
            <HStack>
              <FaStar color={COLORS.golden} />
              <Text py="1" textTransform={"capitalize"}>
                4.9
              </Text>
            </HStack>

            <Text py="1" textTransform={"capitalize"}>
              {data?.specialization}| {data?.experience} Years Experience
            </Text>
            <Text size="md" fontWeight={"700"} color={COLORS.secondary}>
              ${data?.consultationFee}
            </Text>
          </CardBody>
          <CardFooter py={0} display={{ base: "none", sm: "block" }}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => handleSelectedDoctor(data)}
            >
              Book Appointment
            </Button>
          </CardFooter>
        </Stack>
      </Box>
      <CardFooter p={0} mt={2} display={{ base: "block", sm: "none" }}>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => handleSelectedDoctor(data)}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DoctorCard;
