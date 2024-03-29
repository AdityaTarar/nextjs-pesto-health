"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import registergSvg from "../../../../../public/images/register.svg";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "@/app/colors";
import { medicalSpecializations } from "@/utils/medicalSpecializations";
import { useRouter } from "next/navigation";
import { doctorRegisterAction } from "@/store/actions/doctor/authActions";
export default function Page() {
  const toast = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const dispatch: any = useDispatch();
  const router = useRouter();
  const registerUser = useSelector(
    (state: any) => state?.doctorAuth?.registerUser
  );
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState({
    inClinic: true,
    onlineConsultation: false,
  });
  const onSubmit = async (data: any) => {
    if (!validatePassword(data.password)) {
      console.error("Password does not meet requirements");
      return;
    }

    const formData = {
      ...data,
      inClinic: appointmentType.inClinic,
      onlineConsultation: appointmentType.onlineConsultation,
    };
    if (step === 2) {
      await dispatch(doctorRegisterAction(formData));
    } else {
      setStep(2);
    }
  };
  useEffect(() => {
    if (registerUser?.status === 200) {
      toast({
        title: "Successfull Registration",
        status: "success",
        duration: 3000,
      });
      setStep(1);
      router.push("/auth/healthcare-provider/login");
    }
  }, [registerUser]);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };
  console.log("errors", errors);

  return (
    <SimpleGrid gap={8} h={"100vh"} dir="row" columns={{ sm: 1, md: 2 }} p={8}>
      <Box>
        <Stack gap={10}>
          <Text
            fontSize={"4xl"}
            fontWeight={"700"}
            textAlign={"center"}
            noOfLines={2}
          >
            Sign Up for your Better Health
          </Text>
          <Image src={registergSvg} alt="login-svg" />
        </Stack>
      </Box>
      <Box px={32} pb={32} maxH={"100vh"} overflowY={"scroll"}>
        <Stack w={"90%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text
              fontSize={"xl"}
              fontWeight={"700"}
              color={COLORS.primary}
              mb={8}
            >
              {step == 1 ? "Personal" : "Professional"} Details
            </Text>
            <FormControl isRequired>
              {step === 1 ? (
                <>
                  <Stack direction={"row"}>
                    <Box>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Aditya"
                        {...register("first_name", {
                          required: "This field is required",
                        })}
                        required
                      />
                    </Box>
                    <Box>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Tarar"
                        {...register("last_name", {
                          required: "This field is required",
                        })}
                      />
                    </Box>
                  </Stack>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="xyz@gmail.com"
                    {...register("email", {
                      required: "This field is required",
                    })}
                  />
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="number"
                    placeholder="+91 8412962312"
                    {...register("phone_number", {
                      required: "This field is required",
                    })}
                  />
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="*************"
                    {...register("password", {
                      required: "This field is required",
                      validate: (value: string) => {
                        if (!value) {
                          return "Password is required";
                        } else if (!validatePassword(value)) {
                          return `At least 6 characters long
Contains at least one lowercase letter (a-z)
Contains at least one uppercase letter (A-Z)
Contains at least one digit (0-9)
Contains at least one special character from these: @$!%*?&`;
                        }
                        return undefined; // No validation error
                      },
                    })}
                  />

                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      type="date"
                      placeholder="DOB"
                      {...register("dob", {
                        required: "This field is required",
                      })}
                    />
                  </FormControl>
                  <Stack direction={"row"}>
                    <Box>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        {...register("gender", {
                          required: "This field is required",
                        })}
                        bg={"#EAF0F7"}
                        width={"10vw"}
                        m={0}
                        border={1}
                        borderWidth={"1px"}
                        borderStyle={"solid"}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Select>
                    </Box>
                    <Box>
                      <FormLabel>City</FormLabel>
                      <Input
                        type="text"
                        placeholder="Amravati"
                        {...register("city", {
                          required: "This field is required",
                        })}
                      />
                    </Box>
                  </Stack>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Plot no. 44B, Arjun Nagar....."
                    {...register("address", {
                      required: "This field is required",
                    })}
                  />
                </>
              ) : (
                <>
                  <Stack direction={"row"}>
                    <Box w={"100%"} mb={4}>
                      <FormLabel>Degree</FormLabel>
                      <Select
                        {...register("degree", {
                          required: "This field is required",
                        })}
                        bg={"#EAF0F7"}
                        // width={"10vw"}
                        m={0}
                        border={1}
                        borderWidth={"1px"}
                        borderStyle={"solid"}
                      >
                        {Object.keys(medicalSpecializations).map(
                          (degree: any) => (
                            <option value={degree} key={degree}>
                              {degree}
                            </option>
                          )
                        )}
                      </Select>
                    </Box>
                    <Box w={"100%"}>
                      <FormLabel>Experience</FormLabel>
                      <Input
                        type="number"
                        placeholder="10"
                        {...register("experience", {
                          required: "This field is required",
                        })}
                        max={70}
                      />
                    </Box>
                  </Stack>
                  <Box>
                    <FormLabel>Specialization</FormLabel>
                    <Select
                      {...register("specialization", {
                        required: "This field is required",
                      })}
                      bg={"#EAF0F7"}
                      mb={4}
                      border={1}
                      borderWidth={"1px"}
                      borderStyle={"solid"}
                    >
                      {medicalSpecializations.postgraduate.MD.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <FormLabel>Registration Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="10AC123Bn"
                    {...register("licence", {
                      required: "This field is required",
                    })}
                  />

                  <FormLabel>Consultaion Fee(₹)</FormLabel>
                  <Input
                    type="number"
                    placeholder="299 ₹"
                    {...register("consultationFee", {
                      required: "This field is required",
                    })}
                  />
                  <FormControl isRequired={false}>
                    <FormLabel>Appointment type available</FormLabel>

                    <Stack spacing={1} direction="row">
                      <Checkbox
                        name="inClinic"
                        checked={appointmentType.inClinic}
                        onChange={(e) =>
                          setAppointmentType((prevAppointmentType) => ({
                            ...prevAppointmentType,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      >
                        In Clinic
                      </Checkbox>
                      <Checkbox
                        name="onlineConsultation"
                        checked={appointmentType.onlineConsultation}
                        onChange={(e) =>
                          setAppointmentType((prevAppointmentType) => ({
                            ...prevAppointmentType,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      >
                        Online Video Consultaion
                      </Checkbox>
                    </Stack>
                  </FormControl>
                </>
              )}
            </FormControl>
            <Stack mt={8}>
              <Stack direction={"row"}>
                <Button
                  variant={"outline"}
                  w={"100%"}
                  onClick={() => setStep(1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                <Button
                  variant={"solid"}
                  type={"submit"}
                  w={"100%"}
                  onClick={() => step === 1 && setStep(2)}
                >
                  {step === 1 ? "Next" : "Register"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
