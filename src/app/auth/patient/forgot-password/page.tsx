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
import forgotPassword from "../../../../../public/images/forgotpassword.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginUserState } from "@/store/interface/patients/authInterface";
import { setCookie } from "cookies-next";
import { CTX } from "@/context/context";
import LoadingBackdrop from "@/components/Loader";
import {
  clearStateAction,
  patientLoginAction,
} from "@/store/actions/patient/authActions";
// var CryptoJS = require("crypto-js");
import { useToast } from "@chakra-ui/react";
import {
  clearOTPState,
  forgotPassswordAction,
  sendOTPAction,
} from "@/store/actions/commonActions";
const page = () => {
  const toast = useToast();

  const router = useRouter();
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const [loading, setLoading] = useState(false);
  const { _authenticate, _logout, _startGlobalNavigation } = authContext;
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const [otpSuccess, setotpSuccess] = React.useState(false);
  const [mobileNumber, setmobileNumber] = React.useState("");
  const [formErrors, setFormErrors] = useState({
    otp: "",
    password: "",
  });
  useEffect(() => {
    _logout();
  }, []);
  const authState = useSelector((state: any) => state?.patientAuth);
  const otpData = useSelector(
    (state: any) => state?.commonReducerData?.sendOTP?.data
  );
  const forgotPasswordData = useSelector(
    (state: any) => state?.commonReducerData?.forgotPasssword?.data
  );
  console.log("otpData", otpData);

  const validateForm = () => {
    let isValid = true;
    const errors = { otp: "", password: "" };

    if (!formData.otp) {
      isValid = false;
      errors.otp = "otp is required";
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
    const payload = {
      mobileNumber: mobileNumber,
      userType: "patient",
      otp: formData.otp,
      password: formData.password,
    };
    dispatch(forgotPassswordAction(payload));
  };

  useEffect(() => {
    return () => {
      dispatch(clearStateAction());
    };
  }, []);
  const otpHandler = () => {
    dispatch(sendOTPAction({ mobileNumber: mobileNumber }));
  };
  useEffect(() => {
    if (otpData?.status === 200) {
      setotpSuccess(true);
      toast({
        title: "OTP has been send successfully",
        status: "success",
        duration: 3000,
      });
    } else {
      setotpSuccess(false);
    }
  }, [otpData]);
  useEffect(() => {
    if (forgotPasswordData?.status === 200) {
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
      });
      _startGlobalNavigation();
      router.replace("/auth/patient/login");
    } else {
      setLoading(false);
    }
  }, [forgotPasswordData]);
  useEffect(() => {
    return () => {
      dispatch(clearOTPState());
    };
  }, []);

  return (
    <>
      {authState?.loading && <LoadingBackdrop />}
      <SimpleGrid gap={8} h={"100vh"} dir="row" columns={{ sm: 1, md: 2 }}>
        {/* {isLoading && <LoadingBackdrop />} */}
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Image src={forgotPassword} alt="forgotPassword-svg" />
        </Box>
        {!otpSuccess && (
          <Box p={{ base: 0, md: 0, lg: 32 }}>
            <FormControl isRequired isInvalid={!!formErrors.password}>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={"number"}
                  placeholder="Please enter register mobile number"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setmobileNumber(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button onClick={() => otpHandler()}>Send OTP</Button>
          </Box>
        )}
        {otpSuccess && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={{ base: 0, md: 0, lg: 32 }}
          >
            <Stack w={"80%"}>
              <FormControl isRequired isInvalid={!!formErrors.password}>
                <FormLabel>OTP</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="******"
                    onChange={(e) =>
                      setFormData((prevPassword) => {
                        return {
                          ...prevPassword,
                          otp: e.target.value,
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
              <FormControl isRequired isInvalid={!!formErrors.password}>
                <FormLabel>New Password</FormLabel>
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
                Submit
              </Button>
            </Stack>
          </Box>
        )}
      </SimpleGrid>
    </>
  );
};

export default page;
