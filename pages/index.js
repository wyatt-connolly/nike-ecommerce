import * as React from "react";
import Banner from "../components/Banner";
import client from "../utils/client.js";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/Nav";
import { Box, Paper, Grid, Typography } from "@mui/material/";
import ProductItem from "../components/ProductItem";
import { Store } from "../utils/Store";
import { useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import urlForThumbnail from "../utils/image";

export default function Index() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
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

  return (
    <>
      <Banner />
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={{ xs: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          {products.map((product) => (
            <Grid item xs={2} sm={4} key={product._id}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
