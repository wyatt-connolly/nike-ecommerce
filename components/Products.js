import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, Paper, Grid, Typography } from "@mui/material/";
import ProductItem from "./ProductItem";

export default function Products({ products }) {
  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Grid container spacing={{ xs: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {products.map((product) => (
          <Grid item xs={2} sm={4} key={product._id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
