import type { Color, ThemeOptions } from "@mui/material";

// Allowing MaterialUI Theme to accept custom colors on palette
declare module "@mui/material/styles" {
  interface Palette {
    yellow: Color;
  }
  interface PaletteOptions {
    yellow?: Partial<Color>;
  }
}

export const palette = {
  primary: {
    main: "#5d36ab",
    700: "#462783",
    500: "#5d36ab",
    200: "#dbbdf7",
  },
  grey: {
    900: "#01000f",
    700: "#393847",
    500: "#71708f",
    200: "#b9b8c7",
    100: "#e9ecef",
  },
  success: {
    900: "#0f6b30",
    500: "#36c268",
    200: "#dbfbe6",
  },
  warning: {
    900: "#794006",
    500: "#f08519",
    200: "#FBD9B6",
  },
  error: {
    900: "#6b150f",
    500: "#c23f36",
    200: "#fbdddb",
  },
  yellow: {
    900: "#785702",
    500: "#ffc107",
    200: "#ffe8ac",
  },
};

export default {
  palette,
} as ThemeOptions;
