import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import LogoLojinha from "assets/logoLojinha.png";
import Icon from "components/Icon";
import { palette } from "themes/palette.theme";

export const NAVBAR_HEIGHT = 75;

const Navbar = () => {
  const location = useLocation();
  return (
    <Box
      position="fixed"
      top={0}
      height={NAVBAR_HEIGHT}
      zIndex={99}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      sx={{
        backgroundColor: palette.primary.main,
      }}
    >
      {location.pathname !== "/lista" && (
        <div
          style={{
            position: "absolute",
            left: "20px",
          }}
        >
          <Link to="/lista">
            <Button variant="text" sx={{ color: "white" }}>
              <Icon name="angle-left" size="large" />
              <Typography variant="caption" color="white">
                Voltar
              </Typography>
            </Button>
          </Link>
        </div>
      )}
      <img src={LogoLojinha} alt="Lojinha Importados" height={35} />
    </Box>
  );
};

export default Navbar;
