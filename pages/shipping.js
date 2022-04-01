import React, { useContext, useEffect } from "react";
import { Store } from "../lib/Store";
import CheckoutWizard from "../components/CheckoutWizard";
import {
  Box,
  List,
  ListItem,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";

export default function ShippingScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login?redirect=/shipping");
    }

    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [router, setValue, shippingAddress, userInfo]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    jsCookie.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push("/payment");
  };

  return (
    <>
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <Box
        sx={{ my: 4 }}
        component="form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography component="h1" variant="h5">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: "fullName" }}
                  error={Boolean(errors.fullName)}
                  name="fullName"
                  autoComplete="fullName"
                  autoFocus
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "pattern"
                        ? "fullName length is more than 1"
                        : "fullName is required"
                      : ""
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: "address" }}
                  error={Boolean(errors.address)}
                  name="address"
                  autoComplete="address"
                  autoFocus
                  helperText={
                    errors.address
                      ? errors.address.type === "pattern"
                        ? "Address length is more than 1"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: "city" }}
                  error={Boolean(errors.city)}
                  name="city"
                  autoComplete="city"
                  autoFocus
                  helperText={
                    errors.city
                      ? errors.city.type === "pattern"
                        ? "City length is more than 1"
                        : "City is required"
                      : ""
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: "postalCode" }}
                  error={Boolean(errors.postalCode)}
                  name="postalCode"
                  autoComplete="postalCode"
                  autoFocus
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "pattern"
                        ? "Postal Code length is more than 1"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  inputProps={{ type: "country" }}
                  error={Boolean(errors.country)}
                  name="country"
                  autoComplete="country"
                  autoFocus
                  helperText={
                    errors.country
                      ? errors.country.type === "pattern"
                        ? "Country length is more than 1"
                        : "Country is required"
                      : ""
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
