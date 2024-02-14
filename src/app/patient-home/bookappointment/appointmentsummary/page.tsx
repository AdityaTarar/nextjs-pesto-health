"use client";
import { COLORS } from "@/app/colors";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserDoctor, FaMapLocationDot } from "react-icons/fa6";
import { CTX } from "@/context/context";
import {
  clearAppointmentDetails,
  postBookAppointmentAction,
  postRecheduleAppointmentAction,
} from "@/store/actions/patient/appointmentActions";
import axios from "axios";
import LoadingBackdrop from "@/components/Loader";
const CryptoJS = require("crypto-js");
var crypto = require("crypto");
function page({ searchParams }: any) {
  const dispatch: any = useDispatch();
  const authContext: any = useContext(CTX);
  const { userDetails, isAuthenticated }: any = authContext;
  const appointmentData = useSelector(
    (state: any) => state?.appointmentData?.appointmentBooking?.data
  );
  const appointmentLoader = useSelector(
    (state: any) => state?.appointmentData?.appointmentBooking?.loading
  );
  const router = useRouter();
  // const searchParams: any = router?.query;
  const [bookFor, setBookFor]: any = useState("1");
  const [paymentMethod, setPaymentMethod]: any = useState("1");
  const [patientInfo, setPatientInfo] = useState({
    full_name: "",
    email: "",
    contact_number: "",
  });
  const [loading, setLoading] = useState(false);

  const [issue, setIssue] = useState("");
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setPatientInfo((info: any) => ({
      ...info,
      full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
      email: userDetails?.email,
      contact_number: userDetails?.phone_number,
    }));
  }, [isAuthenticated]);
  const handleBookAppointment = async ({ orderId }: any) => {
    setLoading(true);
    const payload = {
      doctorId: searchParams?.doctorId,
      patientId: userDetails?._id,
      date: searchParams?.selectedDate,
      time: searchParams?.selectedTimeSlot,
      onlineConsultation:
        searchParams?.onlineConsultation === "true" ? true : false,
      location: searchParams?.location,
      status: "Confirmed",
      patientInfo: patientInfo,
      paymentMode: paymentMethod === "1" ? "Online" : "pay_later",
      consultationFee: searchParams?.consultationFee,
      issue: issue,
      paymentId: orderId,
    };
    var encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      "pestohealth"
    ).toString();
    await dispatch(
      postBookAppointmentAction({ appointmentData: encryptedData })
    );
  };

  const loadRazorpay = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const handleCheckout = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Failed to load Razorpay SDK. Are you online?");
      return;
    }
    const { data } = await axios.post(
      "https://node-pesto-health.onrender.com/api/payment/checkout",
      {
        amount: searchParams?.consultationFee,
      }
    );
    console.log("data", data);

    var options = {
      key: "rzp_test_5Jwy12U4I4bVdD", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Pesto Health",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        const body =
          response.razorpay_order_id + "|" + response.razorpay_payment_id;
        const generated_signature = crypto
          .createHmac("sha256", "0yBvx3BPsmqXm9oQtQ5869Wb")
          .update(body.toString())
          .digest("hex");
        if (generated_signature == response.razorpay_signature) {
          setOrderId(response.razorpay_order_id);
          handleBookAppointment({ orderId: response.razorpay_order_id });
        } else {
          console.log("response", "payment failed");
        }
      },
      prefill: {
        name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        email: userDetails?.email,
        contact: userDetails?.phone_number,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: COLORS.primary,
      },
    };
    // @ts-ignore
    var rzp1 = new window.Razorpay(options);
    // @ts-ignore
    rzp1.open();
  };
  useEffect(() => {
    if (appointmentData?.status === 201) {
      router.replace(
        `/patient-home/bookappointment/appointmentstatus?id=${appointmentData?.data?.data?.appointmentId}&date=${appointmentData?.data?.data?.date}&time=${appointmentData?.data?.data?.time}&doctorId=${appointmentData.data?.data?.doctorId}`
      );
      setLoading(false);
      // router.push({
      //   pathname: "/dashboard/patient/appointments/appointmentstatus",
      //   query: { appointmentId: res?.data?.data?.appointmentId },
      // });
    }
    return () => {
      dispatch(clearAppointmentDetails());
    };
  }, [appointmentData]);
  console.log("paymentMethod", typeof paymentMethod);

  return (
    <Box p={{ base: 4, sm: 16 }} pt={{ base: 2, sm: 8 }}>
      {appointmentLoader && <LoadingBackdrop />}
      <Text fontSize={"2xl"} fontWeight={"700"}>
        Booking Summary
      </Text>
      <SimpleGrid
        gap={8}
        h={"100vh"}
        dir="row"
        columns={{ sm: 1, md: 2 }}
        mt={8}
      >
        <GridItem>
          <Card
            maxW={"md"}
            borderRadius={20}
            boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
          >
            <CardHeader borderBottomWidth={1}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                alignItems={{ base: "flex-start", sm: "center" }}
                gap={10}
              >
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  size={"xl"}
                />
                <Box>
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"700"}
                    color={COLORS.secondary}
                  >
                    Dr. {searchParams?.doctorName}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    // my={2}
                    color={COLORS.text_gray}
                    fontWeight={"400"}
                  >
                    {searchParams?.specialization}
                  </Text>
                </Box>
              </Stack>
            </CardHeader>
            <CardBody>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={{ base: 5, sm: 10 }}
              >
                <FaRegCalendarAlt size={"27px"} color={COLORS.primary} />
                <Stack direction={"row"} alignItems={"center"}>
                  <Text>{searchParams?.selectedDate}</Text>
                  <Text>{searchParams?.selectedTimeSlot}</Text>
                </Stack>
              </Stack>
              <Divider orientation="horizontal" my={8} />
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={{ base: 5, sm: 10 }}
              >
                <FaUserDoctor size={"27px"} color={COLORS.primary} />
                <Text>
                  {searchParams?.onlineConsultation === "true"
                    ? "Online Consultation"
                    : "In Clinic"}
                </Text>
              </Stack>
              <Divider orientation="horizontal" my={8} />
              <Stack direction={"row"} alignItems={"center"} gap={10}>
                <FaMapLocationDot size={"27px"} color={COLORS.primary} />
                <Text>{searchParams?.address}</Text>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem
          maxH={"100vh"}
          overflowY={"scroll"}
          borderRadius={20}
          boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
          p={{ base: 4, sm: 8 }}
        >
          <RadioGroup defaultValue={bookFor} onChange={(e) => setBookFor(e)}>
            <Stack spacing={5}>
              <Radio value="1" size={"lg"}>
                Book for myself
              </Radio>
              <Radio value="2" size={"lg"}>
                Book for someone else
              </Radio>
            </Stack>
          </RadioGroup>
          <Divider orientation="horizontal" borderBottomWidth={2} my={8} />
          <FormControl>
            <FormLabel> Describe Your Health Issue</FormLabel>
            <Input
              placeholder="Fever, Diziness ....."
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </FormControl>
          <Divider orientation="horizontal" borderBottomWidth={2} my={8} />
          <Text size={"md"} mb={4}>
            Confirm your details
          </Text>
          <FormControl isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Aditya D Tarar"
              type="text"
              value={patientInfo.full_name}
              onChange={(e) =>
                setPatientInfo((value) => ({
                  ...value,
                  full_name: e.target.value,
                }))
              }
            />
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="aditya@gmail.com"
              type="email"
              value={patientInfo.email}
              onChange={(e) =>
                setPatientInfo((value) => ({
                  ...value,
                  email: e.target.value,
                }))
              }
            />
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="+91 8412962312"
              type="number"
              value={patientInfo.contact_number}
              onChange={(e) =>
                setPatientInfo((value) => ({
                  ...value,
                  contact_number: e.target.value,
                }))
              }
            />
          </FormControl>
          <Divider orientation="horizontal" borderBottomWidth={2} my={8} />
          <RadioGroup
            defaultValue={paymentMethod}
            onChange={(e) => setPaymentMethod(e)}
          >
            <Text size={"md"} mb={4}>
              Choose payment method
            </Text>
            <Stack spacing={5}>
              <Radio value="1" size={"lg"}>
                Pay online {searchParams?.consultationFee} ₹
              </Radio>
              <Radio value="2" size={"lg"}>
                Pay {searchParams?.consultationFee} ₹ later at clinic
              </Radio>
            </Stack>
          </RadioGroup>
          <Button
            style={{ width: "70%" }}
            mt={8}
            onClick={() =>
              paymentMethod === "1"
                ? handleCheckout()
                : handleBookAppointment({ orderId: "" })
            }
          >
            Confirm Visit
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default page;
