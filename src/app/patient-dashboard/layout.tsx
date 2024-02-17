"use client";
import LoadingBackdrop from "@/components/Loader";
import PatientNavbar from "@/components/PatientNav";
import SideBar from "@/components/SideBar";
import { CTX } from "@/context/context";
import { Box, Stack } from "@chakra-ui/react";
import { useContext } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext: any = useContext(CTX);
  const { navigationLoading } = authContext;
  return (
    <section>
      <PatientNavbar />
      {navigationLoading && <LoadingBackdrop />}
      <Stack direction={{ base: "column", sm: "row" }}>
        <SideBar />
        <Box maxH={"90vh"} maxW={"80vw"} overflow={"scroll"}>
          {children}
        </Box>
      </Stack>
    </section>
  );
}
