import {
  Button,
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  Card,
  List,
  ListItem,
  Container,
} from "@mui/material";
import Layout from "../components/Layout";
import React, { useContext } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Store } from "../lib/Store";
import Link from "next/link";
import urlFor from "../lib/imageUrlBuilder";
import axios from "axios";
import { useSnackbar } from "notistack";

function CartScreen() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <>
      <Typography component="h1" variant="h4">
        Shopping Cart
      </Typography>
      <Grid container>
        <Grid item md={9} xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._key}>
                    <TableCell>
                      <Link href={`/product/${item.slug}`}>
                        <a>
                          <Image
                            src={urlFor(item.image)}
                            height={50}
                            width={50}
                          />
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/product/${item.slug}`}>
                        <Typography>{item.name}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>${item.price}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeItemHandler(item)}
                      >
                        x
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h5">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items) : ${" "}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </Typography>
              </ListItem>
              <ListItem>
                <Button fullWidth color="primary" variant="contained">
                  Checkout
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
