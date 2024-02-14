// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { COLORS } from "./colors";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "capitalize",
        borderRadius: 100,
        bg: COLORS.primary,
      },
      sizes: {
        sm: {
          fontSize: "sm",
          px: 4,
          py: 3,
        },
        md: {
          fontSize: "md",
          px: 6,
          py: 4,
        },
      },
      variants: {
        outline: {
          border: "2px solid",
          borderColor: COLORS.primary,
          color: COLORS.primary,
          bg: "white",
        },
        solid: {
          bg: COLORS.primary,
          color: "white",
          _hover: {
            boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.2)",
            bg: COLORS.primary, // Set the color to be the same as baseStyle
            _disabled: {
              bg: COLORS.text_gray, // Set the color to be the same as baseStyle
            },
          },
          _disabled: {
            bg: COLORS.text_gray,
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "solid",
      },
    },
    Input: {
      variants: {
        backgroundFix: {
          field: {
            bg: "#EAF0F7",
            border: "1px solid",
            borderColor: "gray",
            mb: 4,
          },
        },
      },
      defaultProps: {
        variant: "backgroundFix",
      },
    },
  },
  Text: {
    baseStyle: {
      color: "red",
    },
  },
});

export default theme;
