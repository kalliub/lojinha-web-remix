import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { palette } from "themes/palette.theme";
import type { Product } from "types/List";
import { formatCurrency } from "utils/formatters";
import type { Nullable } from "utils/types";
import useStyles from "./styles";

const ProductDetailsContainer = ({
  title,
  description,
}: Record<string, string>) => {
  const { classes } = useStyles();
  return (
    <Grid item className={classes.detailsContainer} px={2}>
      <Typography variant="body3" color={palette.primary[200]}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Grid>
  );
};

const ProductName = ({
  marca,
  descricao,
}: Record<string, Nullable<string>>) => {
  const { classes } = useStyles();
  return (
    <Grid item className={classes.productName} mb={2}>
      <ProductDetailsContainer
        title={`[${marca}]`}
        description={descricao || "-"}
      />
    </Grid>
  );
};

const ProductInfo = ({
  armazenamento,
  cor,
  ram,
}: Record<string, Nullable<string>>) => {
  const { classes } = useStyles();
  return (
    <Grid item className={classes.productInfo}>
      {armazenamento && (
        <ProductDetailsContainer title="Modelo" description={armazenamento} />
      )}
      {cor && <ProductDetailsContainer title="Cor" description={cor} />}
      {ram && <ProductDetailsContainer title="Memória RAM" description={ram} />}
    </Grid>
  );
};

const ProductValue = ({ value }: Record<string, string>) => {
  const { classes } = useStyles();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("tablet"));
  return (
    <Grid item className={classes.productValue}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight={isMobile ? "bold" : "400"}
        color={palette.yellow[500]}
      >
        {value}
      </Typography>
    </Grid>
  );
};

interface ProductListItemProps {
  product: Product;
  onClick: () => void;
}

const ProductListItem = ({ product, onClick }: ProductListItemProps) => {
  const { classes } = useStyles();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("tablet"));

  return (
    <Box p={1} className={classes.tableRow} onClick={onClick}>
      {isMobile ? (
        <Grid container flexDirection="column">
          <ProductName marca={product.marca} descricao={product.descricao} />
          <Grid item display="flex">
            <ProductInfo
              armazenamento={product.armazenamento}
              cor={product.cor}
              ram={product.ram}
            />

            <ProductValue value={formatCurrency(product.valor)} />
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between">
          <ProductName marca={product.marca} descricao={product.descricao} />

          <ProductInfo
            armazenamento={product.armazenamento}
            cor={product.cor}
            ram={product.ram}
          />

          <ProductValue value={formatCurrency(product.valor)} />
        </Grid>
      )}
    </Box>
  );
};

export default ProductListItem;
