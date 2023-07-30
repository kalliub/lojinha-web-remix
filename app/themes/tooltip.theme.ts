import type { ThemeOptions } from "@mui/material";

export default {
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "black",
        maxWidth: 240,
        marginTop: 8,
      },
      arrow: {
        color: "black",
      },
    },
  },
} as ThemeOptions["components"];
