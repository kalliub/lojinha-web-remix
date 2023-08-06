import { Grid } from "@mui/material";
import { useState } from "react";
import ProductModal from "components/ProductModal";
import type { Product } from "types/List";
import ProductListItem from "./ProductListItem";

const ProductList = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Grid container maxWidth={1080}>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {products.slice(0, 5).map((product) => {
        return (
          <ProductListItem
            key={`${product.descricao}${product.valor}${product.cor}`}
            onClick={() => setSelectedProduct(product)}
            {...{ product }}
          />
        );
      })}
    </Grid>
  );
};

export default ProductList;
