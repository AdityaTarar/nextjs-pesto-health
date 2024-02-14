import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import MedicinesForm from "./MedicineFrom";
import { CTX } from "@/context/context";

const Meetings = () => {
  const { meeting } = useDyteMeeting();
  const authContext: any = useContext(CTX);
  const { userType }: any = authContext;

  return (
    <Box height={"100vh"}>
      {userType === "doctor" ? (
        <SimpleGrid gap={8} h={"100vh"} dir="row" columns={{ sm: 1, md: 2 }}>
          <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={true} />
          <Box>
            <MedicinesForm />
          </Box>
        </SimpleGrid>
      ) : (
        <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={true} />
      )}
    </Box>
  );
};

export default Meetings;
