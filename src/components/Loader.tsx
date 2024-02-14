"use client";
import { COLORS } from "@/app/colors";
import { Box, Spinner } from "@chakra-ui/react";

const LoadingBackdrop = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="90000000"
    >
      <Box textAlign="center" color="white">
        <Spinner size="xl" color={COLORS.primary} thickness="4px" mr={2} />
      </Box>
    </Box>
  );
};

export default LoadingBackdrop;
