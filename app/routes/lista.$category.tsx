import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import PageTitle from "components/PageTitle";
import { useList } from "context/ListContext";

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const listProducts = useList();
  const categoryItems = useMemo(() => {
    const items = listProducts.productList.filter(
      (item) => item.categoria.toLowerCase() === category?.toLowerCase()
    );
    return items;
  }, [listProducts, category]);

  /* Checks if the category exists in the list of products, if not, redirects to the list page */
  useEffect(() => {
    if (
      !listProducts.productList.some(
        (item) => item.categoria.toLowerCase() === category?.toLowerCase()
      )
    ) {
      navigate("/lista");
    }
  }, [listProducts, category, navigate]);

  return (
    <Grid container justifyContent="center">
      <PageTitle backLink="/lista" title={category || ""} />

      {categoryItems.map((item) => {
        return (
          <Box key={`${item.descricao}${item.valor}${item.cor}`} width="100%">
            <Typography color="white">{item.descricao}</Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default Category;
