import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import PageTitle from "components/PageTitle";
import { useList } from "context/ListContext";

const Category = () => {
  const navigate = useNavigate();
  const { category: selectedCategory } = useParams();
  const listProducts = useList();
  const categoryProducts = useMemo(() => {
    const items = listProducts.productList.filter(
      ({ categoria }) =>
        categoria?.toLowerCase() === selectedCategory?.toLowerCase()
    );
    return items;
  }, [listProducts, selectedCategory]);

  /* Checks if the category exists in the list of products, if not, redirects to the list page */
  useEffect(() => {
    if (
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
      <PageTitle title={selectedCategory || ""} />

      {categoryProducts.map((product) => {
        return (
          <Box
            key={`${product.descricao}${product.valor}${product.cor}`}
            width="100%"
          >
            <Typography color="white">{product.descricao}</Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default Category;
