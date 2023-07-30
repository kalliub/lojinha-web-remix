import type { ThemeOptions } from "@mui/material";
import { palette } from "./palette.theme";

export default {
  MuiLink: {
    styleOverrides: {
      root: {
        color: palette.primary[500],
        textDecorationColor: palette.primary[500],
        "&:visited": {
          color: palette.primary[900],
          textDecorationColor: palette.primary[900],
        },
        "&:hover": {
          color: palette.primary[700],
          textDecorationColor: palette.primary[700],
        },
      },
    },
  },
} as ThemeOptions["components"];
