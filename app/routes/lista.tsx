import { Box, Button, Grid, Typography } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { getProductsCategory } from "api/sheet.server";
import LogoLojinha from "assets/logoLojinha.png";
import Icon from "components/Icon";
import PageTitle from "components/PageTitle";
import getJson from "config/sheetFromCSV";
import { ListProvider } from "context/ListContext";
import { palette } from "themes/palette.theme";

const NAVBAR_HEIGHT = 75;

export const loader: LoaderFunction = async () => {
  const listData = await getJson();
  if (!listData) return redirect("", { status: 503 });
  const categories = getProductsCategory(listData?.productList);
  return json({ listData, categories });
};

const Home = () => {
  const { listData, categories } = useLoaderData();
  const location = useLocation();
  const isCategoriesPage = useMemo(
    () => /^\/lista\/?$/.test(location.pathname),
    [location.pathname]
  );

  return (
    <Grid container>
      <Box
        style={{
          position: "fixed",
          top: 0,
          height: NAVBAR_HEIGHT,
          zIndex: 99,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: palette.primary.main,
        }}
      >
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
        <img src={LogoLojinha} alt="Lojinha Importados" height={35} />
      </Box>

      <ListProvider value={listData}>
        <Grid container mt={`${NAVBAR_HEIGHT}px`} justifyContent="center">
          {isCategoriesPage ? (
            <>
              <PageTitle title="Categorias" />
              <Grid container justifyContent="center">
                {categories.map((cat: string) => (
                  <Link
                    to={`/lista/${cat}`}
                    style={{ width: "100%" }}
                    key={cat}
                  >
                    <Box
                      borderBottom="1px solid rgba(0,0,0,0.1)"
                      sx={{
                        "&:hover": {
                          backgroundColor: palette.primary[200],
                          transition: "200ms",
                          "& p": {
                            color: palette.primary.main,
                            fontWeight: "bold",
                          },
                        },
                      }}
                      p={2}
                      width="100%"
                    >
                      <Typography
                        variant="body1"
                        color="white"
                        textAlign="center"
                      >
                        {cat}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Grid>
            </>
          ) : (
            <Outlet />
          )}
        </Grid>
      </ListProvider>
    </Grid>
  );
};

export default Home;
