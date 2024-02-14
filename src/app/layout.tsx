// app/layout.tsx
"use client";
import { CTX } from "@/context/context";
import { useContext } from "react";
import { fonts } from "./fonts";
import { Providers } from "./providers";
import LoadingBackdrop from "@/components/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext: any = useContext(CTX);
  const { navigationLoading } = authContext;

  return (
    <html lang="en" className={fonts.poppins.variable}>
      <body>
        {navigationLoading && <LoadingBackdrop />}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
