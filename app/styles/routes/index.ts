import type { CSSObject } from "tss-react";
import { makeStyles } from "tss-react/mui";
import { palette } from "themes/palette.theme";

const baseContainer: CSSObject = {
  display: "flex",
  textAlign: "center",
};

const useStyles = makeStyles()(() => ({
  container: {
    ...baseContainer,
    padding: "24px",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    ...baseContainer,
    padding: "40px 24px",
    backgroundColor: palette.grey[100],
    borderTop: `1px solid ${palette.grey[200]}`,
    flexGrow: 1,
  },
}));

export default useStyles;
