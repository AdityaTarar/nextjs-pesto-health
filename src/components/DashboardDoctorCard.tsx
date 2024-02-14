import { COLORS } from "@/app/colors";
import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const DashboardDoctorCard = ({ data }: any) => {
  return (
    <Card maxW={"220px"} maxH={"280px"}>
      <CardBody>
        <Stack>
          <FaUserDoctor size={"72px"} opacity={0.5} color={COLORS.primary} />
          <Text
            fontSize={"lg"}
            fontWeight={"700"}
          >{`${data?.first_name} ${data?.last_name}`}</Text>
          <Text>{data?.specialization}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default DashboardDoctorCard;
