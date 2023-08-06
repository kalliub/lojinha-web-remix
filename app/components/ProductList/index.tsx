import { Button, Grid } from "@mui/material";
import { useMemo, useState } from "react";
import ProductModal from "components/ProductModal";
import type { Product } from "types/List";
import ProductListItem from "./ProductListItem";

const ITEMS_PER_PAGE = 15;

const ProductList = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const renderedItems = useMemo(() => {
    return products.slice(0, page * ITEMS_PER_PAGE);
  }, [page, products]);

  return (
    <Grid container maxWidth={1080} mb={2}>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {renderedItems.map((product) => {
        return (
          <ProductListItem
            key={`${product.descricao}${product.valor}${product.cor}`}
            onClick={() => setSelectedProduct(product)}
            {...{ product }}
          />
        );
      })}
      {products.length > ITEMS_PER_PAGE &&
        renderedItems.length < products.length && (
          <Button
            onClick={() => setPage(page + 1)}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              p: 3,
            }}
          >
            Ver mais
          </Button>
        )}
    </Grid>
  );
};

export default ProductList;
