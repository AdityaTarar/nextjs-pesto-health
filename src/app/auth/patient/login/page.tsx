"use client";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import loginSvg from "../../../../../public/images/login.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginUserState } from "@/store/interface/patients/authInterface";
import { setCookie } from "cookies-next";
import { CTX } from "@/context/context";
import LoadingBackdrop from "@/components/Loader";
import { patientLoginAction } from "@/store/actions/patient/authActions";
// var CryptoJS = require("crypto-js");

export default function Page() {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const [loading, setLoading] = useState(false);
  const { _authenticate, _logout, _startGlobalNavigation } = authContext;
  const [formData, setFormData] = useState<LoginUserState>({
    email: "",
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    _logout();
  }, []);
  const authState = useSelector((state: any) => state?.patientAuth);

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

  const handleSubmit = () => {
    setLoading(true);
    if (!validateForm()) {
      return;
    }
    // var encryptedData = CryptoJS.AES.encrypt(
    //   JSON.stringify(formData),
    //   "secret key 123"
    // ).toString();

    dispatch(patientLoginAction({ formData: formData }));
    if (authState?.user?.status === 200) {
      _startGlobalNavigation();
      setCookie("isAuthenticated", "true");
      setCookie("user_type", "patient");
      setCookie("user_details", authState?.user?.data?.data);
      setCookie("access_token", authState?.user?.data?.token);
      _authenticate(authState?.user?.data, "patient");
      router.replace("/patient-home");

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {authState?.loading && <LoadingBackdrop />}
      <SimpleGrid gap={8} h={"100vh"} dir="row" columns={{ sm: 1, md: 2 }}>
        {/* {isLoading && <LoadingBackdrop />} */}
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
            <Image src={loginSvg} alt="login-svg" />
          </Stack>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={{ base: 0, md: 0, lg: 32 }}
        >
          <Stack w={"80%"}>
            <Text fontSize={"3xl"} fontWeight={"700"} mb={8}>
              Welcome Back
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
              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="***********"
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
                _startGlobalNavigation();
                router.push("/auth/patient/register");
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
}
