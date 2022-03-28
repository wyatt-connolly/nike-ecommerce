import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import urlFor from "../lib/imageUrlBuilder";
import { styled } from "@mui/system";
import Link from "next/link";

function ProductItem({ product, handleAddToCart }) {
  return (
    <Link href={`/product/${product.slug.current}`}>
      <Card
        sx={{
          height: 520,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          alignItems: "center",
          textAlign: "center",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia component="img" image={urlFor(product.image)} height={320} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            ${product.price}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {product.category}
          </Typography>

          <Link href={`/product/${product.slug.current}`}>
            <Button onClick={() => handleAddToCart(product)}>
              Add to cart
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductItem;
