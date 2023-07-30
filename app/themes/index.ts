import { createTheme } from "@mui/material/styles";
import breakpointsTheme from "./breakpoints.theme";
import buttonTheme from "./button.theme";
import paletteTheme from "./palette.theme";
import typographyTheme from "./typography.theme";

const theme = () =>
  createTheme({
    // Foundation
    ...paletteTheme,
    ...typographyTheme,
    ...breakpointsTheme,

    components: {
      ...buttonTheme,
    },
  });

export default theme;
