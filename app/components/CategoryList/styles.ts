import { makeStyles } from "tss-react/mui";
import { palette } from "themes/palette.theme";

const useStyles = makeStyles()(() => ({
  category: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: palette.primary[200],
      transition: "200ms",
      "& p": {
        color: palette.primary.main,
        fontWeight: "bold",
      },
    },
  },
}));

export default useStyles;
