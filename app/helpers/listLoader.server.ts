import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as memjs from "memjs";
import { getProductsCategory } from "api/sheet.server";
import getJson from "config/sheetFromCSV";

const listaLoader: LoaderFunction = async ({ request }) => {
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

export default listaLoader;
