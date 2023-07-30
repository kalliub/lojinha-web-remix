import fetch from "node-fetch";
import * as XLSX from "xlsx";
import type { Product } from "types/List";

const getInfo = async () => {
  return fetch(ENV.GOOGLE_SHEETS_URL)
    .then((res) => {
      /* get the data as a Blob */
      if (!res.ok) throw new Error("fetch failed");
      return res.arrayBuffer();
    })
    .then((ab) => {
      /* parse the data when it is received */
      const data = new Uint8Array(ab);
      const workbook = XLSX.read(data, { type: "array" });

      return xlsxResultToJSON(workbook);
    })
    .catch((e) => {
      console.error("Ocorreu um erro ao baixar os dados da lista", e);
    });
};

const xlsxResultToJSON = (workbook: XLSX.WorkBook) => {
  const result: Record<string, any> = {};
  workbook.SheetNames.forEach((sheetName) => {
    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, undefined, 2);
};

const transformDatasetIntoJSON = (list: [][]) => {
  if (!list || list.length === 0) return null;

  const keys = list[0];
  const elements = list.slice(1);

  const finalArray = elements.map((element) => {
    if (!element.find((e) => e !== null)) return null;

    const result = {};
    for (let i = 0; i <= keys.length; i += 1) {
      if (i === keys.length) break;
      Object.assign(result, { [keys[i]]: element[i] });
    }

    return result;
  });

  return finalArray.filter((e) => e !== null);
};

/** Handles data on the product list, by filtering and adapting some values. */
const handleProductList = (productList: Product[]) => {
  let filteredList = productList
    // Removing inactive products
    .filter((product) => product.inativo !== true)
    // Removing products that don't have the description or value keys
    .filter((product) => product.descricao && product.valor);

  // Exception for cases where the product doesn't have a brand
  filteredList = filteredList.map((product) => {
    if (!product.marca) {
      return {
        ...product,
        marca: "-",
      };
    }
    return product;
  });

  return filteredList;
};

export default async () => {
  return getInfo().then((infos) => {
    if (!infos) return null;
    const json = JSON.parse(infos);
    const arrayProdutos = transformDatasetIntoJSON(json["1 Produtos"]);
    if (!arrayProdutos || arrayProdutos.length === 0) return null;
    const { listaAtualizadaEm } = arrayProdutos[0] as any;
    const arrayTaxas = transformDatasetIntoJSON(json["2 Taxas"]);
    const arrayLinks = transformDatasetIntoJSON(json["3 Links externos"]);

    return {
      productList: handleProductList(arrayProdutos as Product[]),
      updateDate: listaAtualizadaEm,
      taxes: arrayTaxas,
      links: arrayLinks,
    };
  });
};
