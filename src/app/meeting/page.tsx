"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import Meetings from "@/components/Meetings";
import { useDispatch } from "react-redux";
import { clearVideoConferenceDetails } from "@/store/actions/patient/appointmentActions";
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjE0YjMwN2M5LTRiYmUtNDIzNS04MmFmLWIzYzllOTM1ODc4NiIsIm1lZXRpbmdJZCI6ImJiYjI3YTI3LTg4NjctNDE1Mi1iNjliLTg5ODU0YWY2MjJmYiIsInBhcnRpY2lwYW50SWQiOiJhYWFhZWIzYS00MzA0LTQzZmUtYWQwZi04NzAwNWZkZGUyMjkiLCJwcmVzZXRJZCI6IjBkNjlkZWFhLWEyYjgtNDIxOS1hYjAxLWVjZjE0M2ZiOTNhMSIsImlhdCI6MTcwNjcwNzUwMSwiZXhwIjoxNzE1MzQ3NTAxfQ.GckiqI3YOUnO-gXXsMveH700d2wtckFJHGudrJKxEBJg7NQecjrfM2O7siPFNnXGcgFbkOcIRDpUroTpI-Hnu6ZQOKSILC91GxkOjpsRzwKtoPG4hxlDXAWqY1mxTB_oSsFYcq1IrxxJLUcQMYfB88kGRuPamkbT325DrYV2phh8tO2JB8wVgldg-Aoi9SNX854ZRicw8gCMvNcu1-5uO70jtqzGP4Z1MDaRnH2XRzEahB7YHvfIFzZ679T7-MHhGpB5OLhh_LbzkKiIHvFjI5hidyUr2KvCi7lhfG9WOK4Afnqmur1QWpgi0Zqy8Qv8_Vd5BaUOtgN6J5R0YgnKtA";
const page = () => {
  const [searchParams]: any = useSearchParams();
  const [meeting, initMeeting] = useDyteClient();

  const [authToken, setAuthToken] = useState(token);
  const meetingId: any = searchParams[0];
  const dispatch: any = useDispatch();
  // useEffect(() => {
  //   getAuthToken();
  //   return () => {};
  // }, [meetingId]);
  useEffect(() => {
    dispatch(clearVideoConferenceDetails());
  }, []);
  // const getAuthToken = () => {
  //   const options = {
  //     method: "POST",
  //     url: `https://api.dyte.io/v2/meetings/${meetingId}/participants`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Basic MTRiMzA3YzktNGJiZS00MjM1LTgyYWYtYjNjOWU5MzU4Nzg2OmZkODQ5ZjliZjQ2MGJmY2E2NmU0",
  //     },
  //     data: {
  //       name: "Aditya Tarar",
  //       picture: "https://i.imgur.com/test.jpg",
  //       preset_name: "patient",
  //       custom_participant_id: "123",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       if (response.data.success) {
  //         setAuthToken(response?.data?.data?.token);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };
  useEffect(() => {
    if (authToken !== "") {
      initMeeting({
        authToken: authToken,
        defaults: {
          audio: false,
          video: false,
        },
      });
    }
  }, [authToken]);

  console.log("authToken", authToken);

  return (
    <DyteProvider value={meeting}>
      <Meetings />
    </DyteProvider>
  );
};

export default page;
