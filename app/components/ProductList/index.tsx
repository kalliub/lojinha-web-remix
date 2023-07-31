import { Box, Grid, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { palette } from "themes/palette.theme";
import type { Product } from "types/List";
import { formatCurrency } from "utils/formatters";

const DetailsBox = ({ title, description }: Record<string, string>) => {
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
  return (
    <Grid container maxWidth={1200}>
      {products.map((product) => {
        return (
          <Link
            to="#"
            key={`${product.descricao}${product.valor}${product.cor}`}
            style={{ width: "100%" }}
          >
            <Box
              display="flex"
              flexGrow={1}
              p={1}
              borderBottom="1px solid rgba(255,255,255,0.2)"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: palette.primary[700],
                  transition: "200ms",
                },
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid item display="flex" alignItems="center" width="50%">
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
                    <DetailsBox
                      title="Modelo"
                      description={product.armazenamento}
                    />
                  )}

                  {product.cor && (
                    <DetailsBox title="Cor" description={product.cor} />
                  )}

                  {product.ram && (
                    <DetailsBox title="Memória RAM" description={product.ram} />
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
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProductList;
