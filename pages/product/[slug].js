import react, { useContext, useState } from "react";
import client from "../../utils/client";
import Image from "next/image";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  Container,
  Grid,
  Rating,
  Snackbar,
} from "@mui/material";
import { urlFor, urlForThumbnail } from "../../utils/image";
import { Store } from "../../utils/Store";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

function ProductInfo({ product }) {
  const router = useRouter();
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/cart");
  };

  console.log(product);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 4, lg: 6 }}>
        <Grid item xs={12} md={6}>
          <Image
            src={urlFor(product.image)}
            layout="responsive"
            width={640}
            height={640}
            priority="true"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ placeSelf: "center" }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {product.category}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ my: 3 }}>
              {product.description}
            </Typography>
            <Typography variant="subtitle1">
              Reviews ({product.numReviews})
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={product.rating}
              precision={0.25}
              readOnly
            />
            <Box>
              <Button onClick={addToCartHandler} variant="contained">
                add to cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const pageSlug = context.params.slug;
  const query = `*[_type == "product" && slug.current == $pageSlug][0]`;
  const product = await client.fetch(query, { pageSlug });
  return { props: { product } };
}

export default ProductInfo;
