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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import registergSvg from "../../../../../public/images/register.svg";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { patientRegisterAction } from "@/store/actions/patient/authActions";
export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  }: any = useForm();
  const dispatch: any = useDispatch();
  const router = useRouter();
  const userRegister = useSelector((state: any) => state?.patientAuth);
  const onSubmit = async (data: any) => {
    console.log("errors", errors);
    if (!validatePassword(data.password)) {
      console.error("Password does not meet requirements");
      return;
    }
    await dispatch(patientRegisterAction(data));
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };
  useEffect(() => {
    if (userRegister?.registerUser?.status) {
      router.replace("/auth/patient/login");
    }
  }, [userRegister]);
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
            <FormControl isRequired>
              <Stack direction={"row"}>
                <Box>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Aditya"
                    {...register("first_name", {
                      required: "This field is required",
                    })}
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
                {...register("email", { required: "This field is required" })}
              />
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="number"
                placeholder="+91 8412962312"
                {...register("phone_number", {
                  required: "This field is required",
                })}
              />
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                placeholder="DOB"
                {...register("dob", {
                  required: "This field is required",
                })}
              />

              {/* <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={date}
                  render={({ field }) => (
                    <SingleDatepicker
                      date={date}
                      onDateChange={(date) => {
                        setDate(date as Date);
                        field.onChange(date);
                      }}
                    />
                  )}
                />
              </FormControl> */}
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
              {errors.password && (
                <Text color="red">{errors.password.message}</Text>
              )}
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Plot no. 44B, Arjun Nagar....."
                {...register("address", {
                  required: "This field is required",
                })}
              />
              <Stack direction={"row"}>
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
              </Stack>
              <Stack direction={"row"}>
                <Box>
                  <FormLabel>Height</FormLabel>
                  <Input
                    type="text"
                    placeholder={"6.5 feet"}
                    {...register("height", {
                      required: "This field is required",
                    })}
                  />
                </Box>
                <Box>
                  <FormLabel>Weight</FormLabel>
                  <Input
                    type="text"
                    placeholder={"64 Kg"}
                    {...register("weight", {
                      required: "This field is required",
                    })}
                  />
                </Box>
              </Stack>
              <Button variant={"solid"} type="submit" w={"100%"} mt={8}>
                Register
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
