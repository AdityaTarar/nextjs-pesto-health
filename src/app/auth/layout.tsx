"use client";
import LoadingBackdrop from "@/components/Loader";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      {children}
    </section>
  );
}
