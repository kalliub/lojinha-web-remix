import { Grid } from "@mui/material";
import { useNavigate, useParams } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import PageTitle from "components/DesignSystem/PageTitle";
import ProductList from "components/ProductList";
import { useList } from "context/ListContext";

const Category = () => {
  const navigate = useNavigate();
  const { category: selectedCategory } = useParams();
  const listProducts = useList();
  const categoryProducts = useMemo(() => {
    const items = listProducts.productList.filter(
      ({ categoria }) =>
        categoria?.toLowerCase() === selectedCategory?.toLowerCase() ||
        selectedCategory === "all"
    );
    return items;
  }, [listProducts, selectedCategory]);

  /* Checks if the category exists in the list of products, if not, redirects to the list page */
  useEffect(() => {
    if (
      selectedCategory !== "all" &&
      !listProducts.productList.some(
        ({ categoria }) =>
          categoria?.toLowerCase() === selectedCategory?.toLowerCase()
      )
    ) {
      navigate("/lista");
    }
  }, [listProducts, selectedCategory, navigate]);

  return (
    <Grid container justifyContent="center">
      <PageTitle
        title={
          selectedCategory === "all"
            ? "Todos os produtos"
            : selectedCategory || ""
        }
      />

      <ProductList products={categoryProducts} />
    </Grid>
  );
};

export default Category;
