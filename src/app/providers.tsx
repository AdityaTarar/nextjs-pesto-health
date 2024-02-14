// app/providers.tsx
"use client";
import { ChakraProvider, ToastProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Provider } from "react-redux";
import ContextProvider, { CTX } from "../context/context";
import store from "@/store/store";
import LoadingBackdrop from "@/components/Loader";
import { useContext } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const authContext: any = useContext(CTX);
  const { navigationLoading } = authContext;
  console.log("navigationLoading", navigationLoading);

  return (
    <Provider store={store}>
      <ContextProvider>
        <ChakraProvider theme={theme}>
          {navigationLoading && <LoadingBackdrop />}
          {children}
        </ChakraProvider>
      </ContextProvider>
    </Provider>
  );
}
