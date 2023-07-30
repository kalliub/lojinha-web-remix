import type { ThemeOptions } from "@mui/material";
import { palette } from "./palette.theme";

export default {
  MuiInput: {
    styleOverrides: {
      root: {
        border: `1px solid ${palette.grey[200]}`,
        borderRadius: "4px",
        opacity: 1,
        cursor: "inherit",
        outline: "none",
        transition: "200ms",
        "::placeholder": {
          color: palette.grey[500],
          opacity: 1,
        },
        "&:hover": {
          borderColor: palette.grey[700],
          transition: "200ms",
        },
        "&.Mui-error": {
          borderColor: palette.error[500],
          transition: "200ms",
        },
        "&:focus-within:not(.Mui-error)": {
          borderColor: palette.primary[500],
          transition: "200ms",
        },
        "&.Mui-disabled": {
          borderColor: palette.grey[200],
          backgroundColor: palette.grey[200],
          color: palette.grey[500],
          opacity: 0.5,
          cursor: "no-drop",
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        height: 20,
        padding: "6px 6px",
        fontSize: "14px",
        cursor: "inherit",
      },
    },
  },
} as ThemeOptions["components"];
