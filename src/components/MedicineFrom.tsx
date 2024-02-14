import { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
  Link,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { COLORS } from "@/app/colors";
import { IoMdAddCircle } from "react-icons/io";
import { CTX } from "@/context/context";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { addMeddication } from "@/store/slices/healthcare/appointmentSlice";

const MedicinesForm = () => {
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const { userDetails, isAuthenticated, appointmentId, patientId }: any =
    authContext;
  const [formData, setFormData] = useState({
    symptons: "",
    prescribedDate: "",
    courseDuration: 0,
  });
  const [medication, setMedication] = useState([
    {
      id: 1,
      medicine: "",
      intake: "mfn",
      intakeType: "Before Meal",
    },
  ]);
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddMedication = () => {
    setMedication((prevState: any) => [
      ...prevState,
      {
        id: prevState.length + 1,
        medicine: "",
        intake: "Morning - Afternoon - Night",
        intakeType: "beforeMeal",
      },
    ]);
  };
  const handleRemoveMedication = (id: any) => {
    if (medication.length > 1) {
      const filteredArray = medication.filter((item) => item.id !== id);
      setMedication(filteredArray);
    }
  };
  const handleSumbitMedicines = async () => {
    const payload = {
      doctorId: userDetails?._id,
      doctorName: `${userDetails?.first_name} ${userDetails?.last_name}`,
      appointmentId: appointmentId,
      patientId: patientId,
      symptons: formData?.symptons,
      medication: medication,
      prescribedDate: dayjs().toString(),
      courseDuration: formData.courseDuration,
    };
    const res = await dispatch(addMeddication(payload));
    console.log("handleSumbitMedicines", res);
  };
  return (
    <VStack spacing={4} align="stretch" px={4}>
      <FormControl>
        <FormLabel>Symptoms</FormLabel>
        <Textarea
          name="symptons"
          value={formData.symptons}
          onChange={handleInputChange}
        />
      </FormControl>
      {medication?.length > 0 &&
        medication?.map((item: any, index: any) => {
          return (
            <HStack alignItems={"end"}>
              <FormControl>
                <FormLabel>Medication</FormLabel>
                <Input
                  name="medication"
                  onChange={(e) =>
                    setMedication((prevState) => {
                      const updatedTickets: any = [...prevState];
                      updatedTickets[index] = {
                        ...updatedTickets[index],
                        medicine: e.target.value,
                      };
                      return updatedTickets;
                    })
                  }
                  m={0}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Intake</FormLabel>
                <Select
                  onChange={(e) =>
                    setMedication((prevState) => {
                      const updatedTickets: any = [...prevState];
                      updatedTickets[index] = {
                        ...updatedTickets[index],
                        intake: e.target.value,
                      };
                      return updatedTickets;
                    })
                  }
                  bg={"#EAF0F7"}
                  // width={"10vw"}
                  m={0}
                  border={1}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                >
                  <option value={"Morning - Afternoon - Night"}>
                    Morning - Afternoon - Night
                  </option>
                  <option value={"Morning - Night"}>Morning - Night</option>
                  <option value={"Afternoon - Night"}>Afternoon - Night</option>
                  <option value={"Morning"}>Morning </option>
                  <option value={"Afternoon"}>Afternoon </option>
                  <option value={"Night"}>Night </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Intake Type</FormLabel>
                <Select
                  onChange={(e) =>
                    setMedication((prevState) => {
                      const updatedTickets: any = [...prevState];
                      updatedTickets[index] = {
                        ...updatedTickets[index],
                        intakeType: e.target.value,
                      };
                      return updatedTickets;
                    })
                  }
                  bg={"#EAF0F7"}
                  // width={"10vw"}
                  m={0}
                  border={1}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                >
                  <option value={"Before Meal"}>Before Meal </option>
                  <option value={"After Meal"}>After Meal </option>
                </Select>
              </FormControl>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Send email"
                disabled
                onClick={() => handleRemoveMedication(item?.id)}
                icon={<MdDeleteForever />}
              />
            </HStack>
          );
        })}
      <HStack>
        <Link onClick={() => handleAddMedication()} color={COLORS.primary}>
          Add Medicines
        </Link>
        <IoMdAddCircle color={COLORS.primary} />
      </HStack>
      <FormControl>
        <FormLabel>Course Duration (in days)</FormLabel>
        <Input
          type="number"
          name="courseDuration"
          value={formData.courseDuration}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        onClick={() => handleSumbitMedicines()}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default MedicinesForm;
