import type { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    smartphone: true; // will not be used
    tablet: true;
    smallPc: true;
    largePc: true;
  }
}

export default {
  breakpoints: {
    values: {
      smartphone: 0,
      tablet: 768,
      smallPc: 1280,
      largePc: 1600,
    },
  },
} as ThemeOptions;
