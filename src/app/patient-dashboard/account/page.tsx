import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Text>Profile Settings</Text>
      <Box p={8} borderRadius={20} bg={"white"}>
        <HStack>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input name="first_name" value={"formData.symptons"} />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input name="first_name" value={"formData.symptons"} />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="first_name" value={"formData.symptons"} />
        </FormControl>
        <FormControl>
          <FormLabel>Mobile Number</FormLabel>
          <Input name="first_name" value={"formData.symptons"} />
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
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
        </FormControl>
      </Box>
    </>
  );
};

export default page;
