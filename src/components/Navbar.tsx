"use client";
import { COLORS } from "@/app/colors";
import {
  Box,
  Divider,
  Flex,
  Link,
  MenuItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={7}
      px={16}
      bg={"#fff"}
      boxShadow="0px 4px 32px 0px rgba(0, 0, 0, 0.10)"
    >
      <Stack direction={"row"} gap={1}>
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
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Box>
          <Link
            href="/auth/patient/login"
            cursor={"pointer"}
            fontWeight={"700"}
            color={pathName.includes("patient") ? COLORS.primary : ""}
            _hover={{ border: 0 }}
          >
            For Patient
          </Link>
          <Divider
            borderBottomWidth={3}
            display={pathName.includes("patient") ? "block" : "none"}
            borderBottomColor={COLORS.primary}
          />
        </Box>
        <Box>
          <Link
            href="/auth/healthcare-provider/login"
            cursor={"pointer"}
            fontWeight={"700"}
            color={pathName.includes("patient") ? "" : COLORS.primary}
            _hover={{ border: 0 }}
          >
            For Healthcare Providers
          </Link>
          <Divider
            borderBottomWidth={3}
            borderBottomColor={COLORS.primary}
            display={pathName.includes("patient") ? "none" : "block"}
          />
        </Box>
      </Stack>
    </Flex>
  );
};

export default Navbar;
