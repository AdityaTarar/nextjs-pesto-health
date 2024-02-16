import React, { useState, useEffect, createContext } from "react";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";

const sampleAppContext = {
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  navigationLoading: false,
  userDetails: {},
  userType: "",
  role: "",
  appointmentId: "",
  patientId: "",
  _authenticate: () => {},
  updateUserDetailsToContext: () => {},
  _logout: () => {},
  _meetingDetails: () => {},
  _clearMeetingDetails: () => {},
  _startGlobalNavigation: () => {},
};

export const CTX = createContext(sampleAppContext);

export default function Store(props: any) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");
  const [token, setToken]: any = useState(null);
  const [refreshToken, setRefreshToken]: any = useState(null);
  const [userDetails, setUserDetails]: any = useState(null);
  const [isAuthenticated, setIsAuthenticated]: any = useState(false);
  const [userType, setUserType]: any = useState("");
  const [role, setRole]: any = useState("");
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [navigationLoading, setNavigationLoading] = useState(false);
  useEffect(() => {
    _authenticateOnRefresh();
  }, []);

  useEffect(() => {
    setNavigationLoading(true);
    // You might need additional logic here to determine when to set it false.
    // For demonstration, let's assume it's set to false after a delay (not ideal in real scenarios).
    const timer = setTimeout(() => {
      setNavigationLoading(false);
    }, 1000); // Adjust based on your needs

    return () => clearTimeout(timer);
  }, [pathname]);

  const _startGlobalNavigation = () => {
    setNavigationLoading(true);
  };

  const _stopGlobalNavigation = () => {
    setNavigationLoading(false);
  };
  const _authenticateOnRefresh: any = async () => {
    let user_details: any = localStorage.getItem("user_details");
    let user_type: any = localStorage.getItem("user_type");
    let access_token: any = localStorage.getItem("access_token");
    let refresh_token: any = localStorage.getItem("refresh_token");

    if (user_details !== undefined) {
      setUserDetails(JSON.parse(user_details));
      setIsAuthenticated(true);
      setUserType(JSON.parse(user_type));
      setToken(access_token);
      setRefreshToken(refresh_token);
    } else {
      setUserDetails(null);
      setIsAuthenticated(false);
      setUserType("");
      setToken(null);
      setRefreshToken(null);
    }
  };

  const _authenticate: any = async (params: any, userType: any) => {
    localStorage.setItem("user_type", JSON.stringify(userType));
    localStorage.setItem("user_details", JSON.stringify(params?.data));
    localStorage.setItem("access_token", JSON.stringify(params?.token));
    localStorage.setItem("refresh_token", params?.refreshToken);
    setUserType(userType);
    setUserDetails(params?.data);
    setToken(params?.token);
    setIsAuthenticated(true);
  };

  const updateUserDetailsToContext: any = (userData: any) => {
    localStorage.setItem("user_details", JSON.stringify(userData));
    setUserDetails(userData);
  };

  const _logout: any = async () => {
    localStorage.clear();
    setUserDetails(null);
    setToken(null);
    setIsAuthenticated(false);
    setRole("");
    setRefreshToken(null);
    setUserType("");
    deleteCookie("isAuthenticated");
    deleteCookie("user_type");
    deleteCookie("user_details");
    deleteCookie("access_token");
  };
  const _meetingDetails: any = async (params: any) => {
    setAppointmentId(params?.appointmentId);
    setPatientId(params?.patientId);
  };
  const _clearMeetingDetails: any = async () => {
    setAppointmentId("");
    setPatientId("");
  };
  return (
    <CTX.Provider
      value={{
        token,
        refreshToken,
        userDetails,
        isAuthenticated,
        userType,
        role,
        appointmentId,
        patientId,
        navigationLoading,
        _authenticate,
        updateUserDetailsToContext,
        _logout,
        _meetingDetails,
        _clearMeetingDetails,
        _startGlobalNavigation,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
}
