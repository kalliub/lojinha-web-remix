import type { ModalProps } from "@mui/material";
import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Icon from "components/DesignSystem/Icon";
import { palette } from "themes/palette.theme";
import type { Product } from "types/List";
import { formatCurrency } from "utils/formatters";

interface ProductModalProps extends Omit<ModalProps, "children"> {
  product: Product;
}

const ProductDetailsContainer = ({
  title,
  description,
}: Record<string, string>) => {
  return (
    <Grid item display="flex" flexDirection="column">
      <Typography variant="body3" color={palette.primary.main}>
        {title}
      </Typography>
      <Typography variant="h6" color={palette.primary.main}>
        {description}
      </Typography>
    </Grid>
  );
};

const ProductModal = ({ product, sx, ...modalProps }: ProductModalProps) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("tablet"));

  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      {...modalProps}
    >
      <Box
        sx={{
          backgroundColor: "white",
          "&:focus-visible": {
            outline: "none",
          },
        }}
        p={2}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        width={isMobile ? "90vw" : "400px"}
      >
        <Grid
          container
          flexDirection="column"
          position="relative"
          justifyContent="center"
        >
          <Button
            variant="secondaryIcon"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={() => modalProps.onClose?.({}, "escapeKeyDown")}
          >
            <Icon name="multiply" />
          </Button>
          <img
            alt=""
            src={String(product.linkFoto)}
            style={{ height: 300, width: "100%", objectFit: "scale-down" }}
          />
          <Button
            onClick={() => window.open(String(product.linkFoto), "_blank")}
            variant="text"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: palette.yellow[500],
                borderColor: palette.yellow[500],
              },
            }}
          >
            <Typography variant="body1" fontWeight="bold" color="primary">
              Visualizar Produto
            </Typography>
            <Icon name="external-link-alt" style={{ marginLeft: "4px" }} />
          </Button>
        </Grid>

        <Grid
          container
          width="100%"
          mt={2}
          pb={2}
          justifyContent="space-between"
          borderBottom="1px solid rgba(0,0,0,0.1)"
        >
          <div style={{ width: "60%" }}>
            <ProductDetailsContainer
              title={product.marca || "-"}
              description={product.descricao || "-"}
            />
          </div>

          <Box
            p={1}
            borderRadius={2}
            height="fit-content"
            sx={{
              backgroundColor: palette.yellow[500],
              border: `2px dashed ${palette.primary[500]}`,
            }}
          >
            <Typography
              variant="h4"
              color={palette.primary[500]}
              width="40%"
              textAlign="right"
            >
              {product.valor ? formatCurrency(product.valor) : "-"}
            </Typography>
          </Box>
        </Grid>

        <Grid container mt={2} justifyContent="space-between">
          {product.armazenamento && (
            <ProductDetailsContainer
              title="Modelo"
              description={product.armazenamento}
            />
          )}
          {product.cor && (
            <ProductDetailsContainer title="Cor" description={product.cor} />
          )}

          {product.ram && (
            <ProductDetailsContainer
              title="Memória RAM"
              description={product.ram}
            />
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductModal;
