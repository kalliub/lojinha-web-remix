import type { ThemeOptions } from "@mui/material";
import { palette } from "./palette.theme";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    teal: true;
  }

  export interface ButtonPropsVariantOverrides {
    primaryIcon: true;
    secondaryIcon: true;
  }
}

export default {
  MuiButton: {
    variants: [
      {
        props: {
          variant: "primaryIcon",
        },
        style: {
          padding: "6px",
          minWidth: 0,
          color: palette.primary.main,
          "&:hover": {
            backgroundColor: palette.primary[200],
          },
          "&:active": {
            backgroundColor: palette.primary[200],
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            color: palette.primary.main,
            opacity: 0.5,
          },
        },
      },
      {
        props: {
          variant: "secondaryIcon",
        },
        style: {
          padding: "6px",
          minWidth: 0,
          color: palette.grey[700],
          "&:hover": {
            backgroundColor: palette.grey[100],
          },
          "&:active": {
            backgroundColor: palette.grey[200],
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            color: palette.grey[700],
            opacity: 0.5,
          },
        },
      },
    ],
    defaultProps: {
      variant: "contained",
      color: "primary",
    },
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none",
        borderRadius: "4px",
        minHeight: "32px",
        padding: "6px 12px",

        lineHeight: "20px",
        fontWeight: 600,
        fontSize: "14px",

        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
        "&.Mui-disabled": {
          cursor: "no-drop",
          pointerEvents: "all",
        },
      },
      contained: {
        "&:hover": {
          backgroundColor: palette.primary[700],
        },
        "&:active": {
          backgroundColor: palette.primary[700],
        },
        "&.Mui-disabled": {
          backgroundColor: palette.primary[500],
          color: "white",
          opacity: 0.5,
        },
      },
      containedSuccess: {
        color: "white",
        "&:hover": {
          backgroundColor: palette.success[900],
        },
      },
      containedError: {
        color: "white",
        "&:hover": {
          backgroundColor: palette.error[900],
        },
      },
      containedWarning: {
        color: "white",
        "&:hover": {
          backgroundColor: palette.warning[900],
        },
      },
      outlined: {
        borderColor: palette.grey[200],
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: palette.primary[200],
          borderColor: palette.grey[200],
        },
        "&:active": {
          backgroundColor: palette.primary[200],
          borderColor: palette.primary[500],
        },
        "&.Mui-disabled": {
          backgroundColor: "white",
          color: `${palette.primary[500]}80`,
          border: `1px solid ${palette.grey[200]}`,
        },
      },
      text: {
        "&:hover": {
          backgroundColor: palette.primary[200],
          border: "none",
        },
        "&:active": {
          backgroundColor: palette.primary[200],
          borderColor: palette.primary[500],
        },
        "&.Mui-disabled": {
          color: palette.primary[500],
          opacity: 0.5,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
} as ThemeOptions["components"];
