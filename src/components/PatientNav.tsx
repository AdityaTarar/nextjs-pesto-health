"use client";
import { COLORS } from "@/app/colors";
import { CTX } from "@/context/context";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  MenuItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useContext } from "react";

const PatientNavbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const authContext: any = useContext(CTX);
  const { _startGlobalNavigation } = authContext;
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={4}
      px={{ base: 4, sm: 16 }}
      bg={"#fff"}
      boxShadow="0px 4px 32px 0px rgba(0, 0, 0, 0.10)"
    >
      <Stack
        direction={"row"}
        gap={1}
        cursor={"pointer"}
        onClick={() => router.replace("/")}
      >
        <Text display="block" fontSize={"lg"} fontWeight={"800"}>
          PESTO
        </Text>
        <Text
          display="block"
          fontSize={"lg"}
          fontWeight={"800"}
          color={COLORS.primary}
        >
          HEALTH
        </Text>
      </Stack>
      <Avatar
        cursor={"pointer"}
        src="https://bit.ly/broken-link"
        onClick={() => {
          _startGlobalNavigation(), router.push("/patient-dashboard");
        }}
      />
    </Flex>
  );
};

export default PatientNavbar;
