import { Button, Grid, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import Icon from "./Icon";

interface PageTitleProps {
  title: string;
  backLink?: string;
}

const PageTitle = ({ backLink, title }: PageTitleProps) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ borderBottom: "1px solid white" }}
      mb={3}
    >
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
  );
};

export default PageTitle;
