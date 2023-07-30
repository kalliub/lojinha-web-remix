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
          padding: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={LogoLojinha} alt="Lojinha Importados" height={35} />
      </Box>

      {isCategoriesPage ? (
        <Grid container justifyContent="center">
          <PageTitle title="Categorias" />
          {categories.map((cat: string) => (
            <Grid item key={cat} width="100%">
              <Link to={`/lista/${cat}`}>
                <Box
                  borderBottom={`1px solid ${palette.grey[200]}`}
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
        </Grid>
      ) : (
        <ListProvider value={data}>
          <Outlet />
        </ListProvider>
      )}
    </Grid>
  );
};

export default Home;
