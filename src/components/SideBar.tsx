"use client";
import { Box, Stack, Text, Button, Link, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import { GiMedicines } from "react-icons/gi";
import { HiCurrencyRupee } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";

import { MENU } from "../utils/Menu";
import { usePathname, useRouter } from "next/navigation";
import { COLORS } from "@/app/colors";
import { CTX } from "@/context/context";
import { IoLogOut } from "react-icons/io5";

const SideBar = () => {
  const authContext: any = useContext(CTX);
  const { userType, _logout, _startGlobalNavigation } = authContext;
  const pathName = usePathname();
  const router = useRouter();
  console.log("pathName", pathName);

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box
      height={{ base: "auto", sm: "100vh" }}
      width={{ base: "100vw", sm: "20%" }}
      bg={"white"}
      borderWidth={1}
      borderRightWidth={1}
      borderStyle={"solid"}
      boxShadow={"0px 3.125px 35.156px 0px rgba(0, 0, 0, 0.08)"}
      display={"flex"}
      flexDirection={{ base: "row", sm: "column" }}
      overflowX={"scroll"}
    >
      {userType === "patient"
        ? MENU.patient.map((menu: any) => {
            return (
              <Stack
                direction={"row"}
                alignItems={"center"}
                p={4}
                py={6}
                cursor={"pointer"}
                onClick={() => {
                  _startGlobalNavigation();
                  router.push(menu.path);
                }}
              >
                {menu.id === 1 ? (
                  <FaHome
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 2 ? (
                  <FaUserDoctor
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 3 ? (
                  <ImLab
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 4 ? (
                  <GiMedicines
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 5 ? (
                  <HiCurrencyRupee
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : (
                  <IoSettingsSharp
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                )}
                <Text
                  fontSize={"medium"}
                  color={
                    pathName === menu.path ? COLORS.primary : COLORS.secondary
                  }
                  fontWeight={pathName === menu.path ? "700" : "400"}
                >
                  {menu.title}
                </Text>
              </Stack>
            );
          })
        : MENU.doctor.map((menu: any) => {
            return (
              <Stack
                direction={"row"}
                alignItems={"center"}
                p={4}
                py={6}
                cursor={"pointer"}
                onClick={() => {
                  _startGlobalNavigation();
                  router.push(menu.path);
                }}
              >
                {menu.id === 1 ? (
                  <FaHome
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 2 ? (
                  <FaUserDoctor
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 3 ? (
                  <ImLab
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 4 ? (
                  <GiMedicines
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : menu.id === 5 ? (
                  <HiCurrencyRupee
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                ) : (
                  <IoSettingsSharp
                    size={"24px"}
                    color={
                      pathName === menu.path ? COLORS.primary : COLORS.secondary
                    }
                  />
                )}
                <Text
                  fontSize={"medium"}
                  color={
                    pathName === menu.path ? COLORS.primary : COLORS.secondary
                  }
                  fontWeight={pathName === menu.path ? "700" : "400"}
                >
                  {menu.title}
                </Text>
              </Stack>
            );
          })}
      <HStack
        px={{ base: 4, sm: 4 }}
        mt={{ base: 2, sm: 4 }}
        onClick={() => {
          _logout(), router.replace("/auth/patient/login");
        }}
        cursor={"pointer"}
      >
        <Link color={COLORS.primary} fontWeight={"700"}>
          LogOut
        </Link>
        <IoLogOut size={"24px"} color={COLORS.primary} />
      </HStack>
    </Box>
  );
};

export default SideBar;
