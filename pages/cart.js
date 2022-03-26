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
  Select,
  MenuItem,
} from "@mui/material";
import Layout from "../components/Layout";
import React from "react";
import Image from "next/image";

function CartScreen() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
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
                <ListItem></ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default cart;
