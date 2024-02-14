"use client";
import { COLORS } from "@/app/colors";
import { CTX } from "@/context/context";
import { getMedicationbyPatientAction } from "@/store/actions/patient/medicationActions";
import {
  Box,
  Button,
  Card,
  CardBody,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch: any = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authContext: any = useContext(CTX);
  const { userDetails }: any = authContext;
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const prescriptions = useSelector(
    (state: any) => state?.medicationData?.medicationByPatient?.data?.data
  );

  useEffect(() => {
    fetchMedications();
  }, [userDetails]);
  const fetchMedications = async () => {
    await dispatch(
      getMedicationbyPatientAction({ patientId: userDetails?._id })
    );
  };
  const calculateRemainingDays = (inputDate: any, numberOfDays: any) => {
    if (inputDate && numberOfDays > 0) {
      const inputDateTime = new Date(inputDate).getTime();
      const currentDate = new Date().getTime();
      const remainingMilliseconds =
        inputDateTime -
        currentDate +
        Number(numberOfDays) * 24 * 60 * 60 * 1000;

      if (remainingMilliseconds > 0) {
        const remainingDays = Math.ceil(
          remainingMilliseconds / (24 * 60 * 60 * 1000)
        );
        return remainingDays;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  };
  const handleOpenMedicineModal = (data: any) => {
    setSelectedMedicine(data);
    onOpen();
  };
  return (
    <>
      <Box p={2} pt={4} overflow={"scroll"}>
        <Card backgroundColor={"#fff"}>
          <Box>
            <CardBody>
              {prescriptions?.length > 0 && (
                <Table variant="simple" overflow={"scroll"}>
                  <Thead>
                    <Tr>
                      <Th>Prescribed By</Th>
                      <Th>Symptoms</Th>
                      <Th>Medicine</Th>
                      <Th>Prescribed Date</Th>
                      <Th>Days Remaining</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {prescriptions?.map((prescription: any, index: any) => (
                      <Tr key={index}>
                        <Td>{prescription?.doctorName}</Td>
                        <Td maxW={"300px"}>{prescription?.symptons}</Td>
                        <Td>
                          <Link
                            color={COLORS.primary}
                            onClick={() =>
                              handleOpenMedicineModal(prescription?.medication)
                            }
                          >
                            View Medicines
                          </Link>
                        </Td>
                        <Td>
                          {dayjs(prescription?.prescribedDate).format(
                            "MMMM D, YYYY"
                          )}
                        </Td>
                        <Td>
                          {calculateRemainingDays(
                            prescription?.prescribedDate,
                            prescription?.courseDuration
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </CardBody>
          </Box>
        </Card>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prescribed Medications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Dosage</Th>
                    <Th>Intake</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedMedicine?.length > 0 &&
                    selectedMedicine?.map((medicine: any) => {
                      return (
                        <>
                          <Tr id={medicine?.id}>
                            <Td>{medicine?.medicine}</Td>
                            <Td>{medicine?.intake}</Td>
                            <Td>{medicine?.intakeType}</Td>
                          </Tr>
                        </>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default page;
