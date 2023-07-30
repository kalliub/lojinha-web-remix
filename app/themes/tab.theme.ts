import type { ThemeOptions } from "@mui/material";
import { palette } from "./palette.theme";

export default {
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: 0,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        color: palette.grey[700],
        padding: "8px 6px",
        minHeight: 0,
        textTransform: "none",
        transition: "200ms",
        "&.Mui-disabled": {
          cursor: "no-drop",
          pointerEvents: "all",
        },
        "&.Mui-selected": {
          color: palette.primary[500],
          borderColor: palette.primary[500],
        },
        "&:hover:not(.Mui-selected):not(.Mui-disabled)": {
          transition: "200ms",
          color: palette.grey[900],
          boxShadow: `inset 0 -2px 0 ${palette.primary[200]}`,
        },
      },
    },
  },
} as ThemeOptions["components"];
