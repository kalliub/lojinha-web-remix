import { Grid } from "@mui/material";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import CategoryList from "components/CategoryList";
import Navbar, { NAVBAR_HEIGHT } from "components/DesignSystem/Navbar";
import { ListProvider } from "context/ListContext";
import listLoader from "../helpers/listLoader.server";

export const loader = listLoader;

const Home = () => {
  const { listData, categories } = useLoaderData();
  const location = useLocation();
  const isCategoriesPage = useMemo(
    () => /^\/lista\/?$/.test(location.pathname),
    [location.pathname]
  );

  return (
    <>
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
    </>
  );
};

export default Home;
