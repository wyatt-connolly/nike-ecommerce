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

function CartScreen() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const updateCartHandler = async (item, quantity) => {};
  const removeItemHandler = (item) => {};

  return (
    <Container maxWidth="xl">
      <Typography component="h1" variant="h4">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          <Typography>
            Cart is empty.
            <Link href="/">Go shopping</Link>
          </Typography>
        </Box>
      ) : (
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
                  {cartItems.map((item) => {
                    <TableRow key={item._key}>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <Typography>{item.name}</Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        <Typography>${item.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        ></Button>
                      </TableCell>
                    </TableRow>;
                  })}
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
      )}
    </Container>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
