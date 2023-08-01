import { Grid, Typography } from "@mui/material";
import { useList } from "context/ListContext";
import { palette } from "themes/palette.theme";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  const { updateDate } = useList();
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h2" color="white" textAlign="center">
          {title}
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Typography
          variant="h6"
          color="white"
          p={2}
          sx={{ backgroundColor: palette.primary.main }}
          zIndex={1}
          textAlign="center"
        >
          Lista atualizada em: {updateDate}
        </Typography>
        <div
          style={{
            borderBottom: "1px solid white",
            width: "100%",
            position: "absolute",
            zIndex: 0,
          }}
        />
      </Grid>
    </>
  );
};

export default PageTitle;
