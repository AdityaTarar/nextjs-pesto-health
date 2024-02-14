"use client";
import LoadingBackdrop from "@/components/Loader";
import PatientNavbar from "@/components/PatientNav";
import { CTX } from "@/context/context";
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
      {navigationLoading && <LoadingBackdrop />}
      <PatientNavbar />
      {children}
    </section>
  );
}
