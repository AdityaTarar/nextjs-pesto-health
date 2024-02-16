"use client";
import { CTX } from "@/context/context";
import { getPaymentHistoryAction } from "@/store/actions/commonActions";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardBody,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { COLORS } from "@/app/colors";
const page = () => {
  const authContext: any = useContext(CTX);
  const { userDetails, userType }: any = authContext;
  const dispatch: any = useDispatch();
  const paymentHistory = useSelector(
    (state: any) => state.commonReducerData?.paymentHistory?.data?.data
  );
  useEffect(() => {
    dispatch(
      getPaymentHistoryAction({ userType: userType, id: userDetails?._id })
    );
  }, [userDetails?._id]);
  return (
    <div>
      <Box p={2} pt={4} overflow={"scroll"}>
        <Text fontSize={"2xl"} fontWeight={"700"} color={COLORS.primary} mb={8}>
          Order History
        </Text>
        <Card backgroundColor={"#fff"}>
          <Box>
            <CardBody>
              {paymentHistory?.length > 0 && (
                <Table variant="simple" overflow={"scroll"}>
                  <Thead>
                    <Tr>
                      <Th>Recipt ID</Th>
                      <Th>Amount</Th>
                      <Th>Mode</Th>
                      <Th>Status</Th>
                      <Th>Consultation</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paymentHistory?.map((prescription: any, index: any) => (
                      <Tr key={index}>
                        <Td>{prescription?.reciptId}</Td>
                        <Td>{prescription?.consultationFee}</Td>
                        <Td>{prescription?.paymentMode}</Td>
                        <Td>{prescription?.paymentStatus}</Td>
                        <Td>{prescription?.consultationMode}</Td>
                        <Td>{prescription?.paymentDate}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </CardBody>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default page;
