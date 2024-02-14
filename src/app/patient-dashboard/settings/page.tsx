"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { COLORS } from "@/app/colors";
import { CTX } from "@/context/context";
import { useDispatch } from "react-redux";
import { updatePatientProfileAction } from "@/store/actions/patient/authActions";
import { Dispatch } from "redux";

const ProfileSettingsPage = () => {
  const authContext = useContext(CTX); // Assuming CTX is your Auth Context
  const userDetails: any = authContext.userDetails; // Assuming this is where you get your user details from
  const dispatch: any = useDispatch();
  // Initial state for the form, populated with userDetails
  const [formData, setFormData] = useState({
    id: userDetails?._id,
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
    email: userDetails?.email || "",
    phone_number: userDetails?.phone_number || "",
    address: userDetails?.address || "",
    city: userDetails?.city || "",
    gender: userDetails?.gender || "",
  });

  // Handle change in form inputs
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(updatePatientProfileAction(formData));
    // Here you would typically dispatch an action or call an API to update the user details
  };

  return (
    <Box p={8}>
      <Text fontSize={"lg"} fontWeight={"700"} mb={8} color={COLORS.primary}>
        Profile Settings
      </Text>
      <form onSubmit={handleSubmit}>
        <Box
          p={4}
          borderRadius={10}
          bg={"white"}
          maxH={"80vh"}
          overflowY={"scroll"}
        >
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>City</FormLabel>
            <Input name="city" value={formData.city} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4} isDisabled>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              bg={"#EAF0F7"}
              width={"full"}
              border={1}
              borderWidth={"1px"}
              borderStyle={"solid"}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="blue" type="submit">
            Update Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileSettingsPage;
