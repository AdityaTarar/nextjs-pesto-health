"use client";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import doctorSvg from "../../../../../public/images/doctor.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserState } from "@/store/interface/patients/authInterface";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { CTX } from "@/context/context";
import { setCookie } from "cookies-next";
import { doctorLoginAction } from "@/store/actions/doctor/authActions";

export default function Page() {
  const toast = useToast();

  const router = useRouter();
  const dispatch: any = useDispatch();
  const [formData, setFormData] = useState<LoginUserState>({
    email: "",
    password: "",
  });
  const isLoading = useSelector((state: any) => state);
  console.log("isLoading", isLoading);
  const doctorAuth = useSelector((state: any) => state?.doctorAuth);

  const authContext: any = useContext(CTX);
  const { _authenticate, _startGlobalNavigation, _stopGlobalNavigation } =
    authContext;
  const [show, setShow] = React.useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = { email: "", password: "" };

    if (!formData.email) {
      isValid = false;
      errors.email = "Email is required";
    }

    if (!formData.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    await dispatch(doctorLoginAction(formData));
  };
  useEffect(() => {
    if (doctorAuth?.user?.status === 200) {
      toast({
        title: "Successfull login",
        status: "success",
        duration: 3000,
      });
      _startGlobalNavigation();
      router.replace("/doctor-dashboard");
      setCookie("isAuthenticated", "true");
      setCookie("user_type", "doctor");
      setCookie("user_details", doctorAuth?.user?.data?.data);
      setCookie("access_token", doctorAuth?.user?.data?.token);
      _authenticate(doctorAuth?.user?.data, "doctor");
    }
  }, [doctorAuth, router]);
  return (
    <SimpleGrid gap={8} h={"100vh"} dir="row" columns={{ sm: 1, md: 2 }} p={8}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Stack gap={10}>
          <Text
            fontSize={"4xl"}
            fontWeight={"700"}
            textAlign={"center"}
            noOfLines={2}
          >
            Sign In for your Better Health
          </Text>
          <Image src={doctorSvg} alt="login-svg" />
        </Stack>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        px={24}
      >
        <Stack w={"80%"}>
          <Text fontSize={"3xl"} fontWeight={"700"} mb={8}>
            Welcome Back Doctor
          </Text>
          {/* <Input variant='filled' placeholder='Enter Email' type='email' />
          <Input variant='filled' placeholder='Enter Password' type='password' /> */}
          <FormControl isRequired isInvalid={!!formErrors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={formData.email}
              placeholder="xyz@gmail.com"
              onChange={(e) =>
                setFormData((prevEmail) => {
                  return {
                    ...prevEmail,
                    email: e.target.value,
                  };
                })
              }
            />
            <FormErrorMessage mt={"-8px"} mb={4}>
              {formErrors.email}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="************"
                onChange={(e) =>
                  setFormData((prevPassword) => {
                    return {
                      ...prevPassword,
                      password: e.target.value,
                    };
                  })
                }
              />
              <InputRightElement
                width="4.5rem"
                onClick={() => setShow(!show)}
                cursor={"pointer"}
              >
                {show ? (
                  <ViewIcon boxSize={"20px"} />
                ) : (
                  <ViewOffIcon boxSize={"20px"} />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage mt={"-8px"} mb={4}>
              {formErrors.password}
            </FormErrorMessage>
          </FormControl>
          <Link href={"/"} style={{ marginBottom: 8 }}>
            Forgot Password ?
          </Link>
          <Button variant={"solid"} onClick={handleSubmit}>
            Sign In
          </Button>
          <Box position="relative" my={8}>
            <Divider style={{ borderBottomWidth: 2 }} />
            <AbsoluteCenter bg="white" px="4">
              Not a user ?
            </AbsoluteCenter>
          </Box>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/auth/healthcare-provider/register");
            }}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
