import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ProductModal from "components/ProductModal";
import { palette } from "themes/palette.theme";
import type { Product } from "types/List";
import { formatCurrency } from "utils/formatters";

const ProductDetailsContainer = ({
  title,
  description,
}: Record<string, string>) => {
  return (
    <Grid item display="flex" flexDirection="column" px={2}>
      <Typography variant="body3" color={palette.primary[200]}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Grid>
  );
};

const ProductList = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Grid container maxWidth={1200}>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {products.map((product) => {
        return (
          <Box
            key={`${product.descricao}${product.valor}${product.cor}`}
            display="flex"
            p={1}
            borderBottom="1px solid rgba(255,255,255,0.2)"
            width="100%"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: palette.primary[700],
                transition: "200ms",
              },
            }}
            onClick={() => setSelectedProduct(product)}
          >
            <Grid container justifyContent="space-between">
              <Grid item display="flex" alignItems="center" width="33%">
                <Typography
                  color={palette.primary[200]}
                  variant="caption"
                  mr={1}
                >
                  [{product.marca}]
                </Typography>
                <Typography variant="body1">{product.descricao}</Typography>
              </Grid>

              <Grid item display="flex" flexGrow={1}>
                {product.armazenamento && (
                  <ProductDetailsContainer
                    title="Modelo"
                    description={product.armazenamento}
                  />
                )}

                {product.cor && (
                  <ProductDetailsContainer
                    title="Cor"
                    description={product.cor}
                  />
                )}

                {product.ram && (
                  <ProductDetailsContainer
                    title="Memória RAM"
                    description={product.ram}
                  />
                )}
              </Grid>

              <Grid item display="flex" alignItems="center">
                <Typography
                  variant="h4"
                  fontWeight="400"
                  color={palette.yellow[500]}
                >
                  {formatCurrency(product.valor)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ProductList;
