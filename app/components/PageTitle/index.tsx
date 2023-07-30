import { Button, Grid, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { useList } from "context/ListContext";
import { palette } from "themes/palette.theme";
import Icon from "./Icon";

interface PageTitleProps {
  title: string;
  backLink?: string;
}

const PageTitle = ({ backLink, title }: PageTitleProps) => {
  const { updateDate } = useList();
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        {backLink && (
          <div
            style={{
              position: "absolute",
              left: "20px",
            }}
          >
            <Link to={backLink}>
              <Button variant="secondaryIcon" sx={{ color: "white" }}>
                <Icon name="angle-left" size="large" />
              </Button>
            </Link>
          </div>
        )}
        <Typography variant="h2" color="white">
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
