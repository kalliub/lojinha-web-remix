import { makeStyles } from "tss-react/mui";
import { palette } from "themes/palette.theme";

const useStyles = makeStyles()(({ breakpoints }) => ({
  tableRow: {
    display: "flex",
    borderBottom: `1px solid ${palette.grey[500]}`,
    width: "100%",
    cursor: "pointer",
    transition: "200ms",
    "&:hover": {
      backgroundColor: palette.primary[700],
      transition: "200ms",
    },
  },
  productName: {
    [breakpoints.up("tablet")]: {
      width: "33%",
    },
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
