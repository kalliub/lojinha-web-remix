import { Grid } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import * as memjs from "memjs";
import { useMemo } from "react";
import { getProductsCategory } from "api/sheet.server";
import CategoryList from "components/CategoryList";
import Navbar, { NAVBAR_HEIGHT } from "components/DesignSystem/Navbar";
import getJson from "config/sheetFromCSV";
import { ListProvider } from "context/ListContext";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const cacheClient = memjs.Client.create();
  const noCache = url.searchParams.get("no-cache");

  if (noCache !== "true") {
    try {
      const cachedData = (await cacheClient.get("listData")).value?.toString();
      if (cachedData) {
        const parsedCacheData = JSON.parse(cachedData);
        const categories = getProductsCategory(parsedCacheData?.productList);
        return json({ listData: parsedCacheData, categories });
      }
    } catch (cacheErr) {
      console.error(`Failed to get data from cache: ${cacheErr}`);
    }
  }

  const listData = await getJson();
  if (!listData) return redirect("", { status: 503 });

  cacheClient.set(
    "listData",
    JSON.stringify(listData),
    { expires: ENV.CACHE_EXPIRATION_TIME || 60 * 5 },
    (err, val) => {
      if (err) {
        console.error(`[Cache] Failed to save data: ${err}`);
      } else {
        console.log(`[Cache] Data saved successfully: ${val}`);
      }
    }
  );

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
