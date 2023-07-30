import { Box, Grid, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import PageTitle from "components/PageTitle";
import useStyles from "./styles";

const Category = ({
  categoryTitle,
  route,
}: {
  categoryTitle: string;
  route: string;
}) => {
  const { classes } = useStyles();
  return (
    <Link to={`/lista/${route}`} style={{ width: "100%" }}>
      <Box className={classes.category} p={2}>
        <Typography variant="body1" color="white" textAlign="center">
          {categoryTitle}
        </Typography>
      </Box>
    </Link>
  );
};

interface CategoryListProps {
  categories: string[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <>
      <PageTitle title="Categorias" />
      <Grid container justifyContent="center">
        <Category route="all" categoryTitle="Todos os Produtos" />
        {categories.map((category) => (
          <Category key={category} categoryTitle={category} route={category} />
        ))}
      </Grid>
    </>
  );
};

export default CategoryList;
