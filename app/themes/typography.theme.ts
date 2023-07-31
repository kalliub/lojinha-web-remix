import type { ThemeOptions } from "@mui/material";

// Allowing MaterialUI Typography Component to accept custom "body3" variant on it's types.
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

export const typographyVariants = {
  h1: {
    fontWeight: 600,
    fontSize: "2.5rem",
    lineHeight: "3.75rem",
    color: "white",
  },
  h2: {
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: "3rem",
    color: "white",
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "2.25rem",
    color: "white",
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
    color: "white",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "white",
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "white",
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    color: "white",
  },
  caption: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    color: "white",
  },
  body1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "white",
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "white",
  },
  body3: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    color: "white",
  },
};

export default {
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body3",
          },
          style: typographyVariants.body3,
        },
      ],
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    allVariants: {
      color: "white",
    },
    ...typographyVariants,
  },
} as ThemeOptions;
