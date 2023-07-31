import { Grid } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { getProductsCategory } from "api/sheet.server";
import CategoryList from "components/CategoryList";
import Navbar, { NAVBAR_HEIGHT } from "components/Navbar";
import getJson from "config/sheetFromCSV";
import { ListProvider } from "context/ListContext";

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
      <Navbar />

      <ListProvider value={listData}>
        <Grid container mt={`${NAVBAR_HEIGHT}px`} justifyContent="center">
          {isCategoriesPage ? (
            <CategoryList categories={categories} />
          ) : (
            <Outlet />
          )}
        </Grid>
      </ListProvider>
    </Grid>
  );
};

export default Home;
