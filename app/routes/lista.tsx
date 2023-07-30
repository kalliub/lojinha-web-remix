import { Box, Grid, Typography } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { getProductsCategory } from "api/sheet.server";
import LogoLojinha from "assets/logoLojinha.png";
import PageTitle from "components/PageTitle";
import getJson from "config/sheetFromCSV";
import { ListProvider } from "context/ListContext";
import { palette } from "themes/palette.theme";

const NAVBAR_HEIGHT = 75;

export const loader: LoaderFunction = async () => {
  const listData = await getJson();
  if (!listData) return redirect("", { status: 503 });
  const categories = getProductsCategory(listData?.productList);
  return json({ data: listData, categories });
};

const Home = () => {
  const { data, categories } = useLoaderData();
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
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: palette.primary.main,
        }}
      >
        <img src={LogoLojinha} alt="Lojinha Importados" height={35} />
      </Box>

      <ListProvider value={data}>
        <Grid container mt={`${NAVBAR_HEIGHT}px`} justifyContent="center">
          {isCategoriesPage ? (
            <>
              <PageTitle title="Categorias" />
              {categories.map((cat: string) => (
                <Grid item key={cat} width="100%">
                  <Link to={`/lista/${cat}`}>
                    <Box
                      borderBottom="1px solid rgba(0,0,0,0.1)"
                      p={1.5}
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
                    >
                      <Typography variant="body1" color="white">
                        {cat}
                      </Typography>
                    </Box>
                  </Link>
                </Grid>
              ))}
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
