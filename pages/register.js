import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "../components/Layout";
import Link from "../src/Link";
import { useSnackbar } from "notistack";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { getError } from "../utils/error";

function RegisterScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title="Register">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="name"
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
                id="name"
                label="Name"
                inputProps={{ type: "name" }}
                error={Boolean(errors.name)}
                name="name"
                autoComplete="name"
                autoFocus
                helperText={
                  errors.name
                    ? errors.name.type === "pattern"
                      ? "Name length is more than 1"
                      : "Name is required"
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                inputProps={{ type: "email" }}
                error={Boolean(errors.email)}
                name="email"
                autoComplete="email"
                helperText={
                  errors.email
                    ? errors.email.type === "pattern"
                      ? "Email is not valid"
                      : "Email is required"
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{ type: "password" }}
                error={Boolean(errors.password)}
                autoComplete="current-password"
                helperText={
                  errors.password
                    ? errors.password.type === "minLength"
                      ? "Password length is more than 5"
                      : "Password is required"
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="confirmPassword"
                id="confirmPassword"
                inputProps={{ type: "confirmPassword" }}
                error={Boolean(errors.confirmPassword)}
                autoComplete="current-confirmPassword"
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.type === "minLength"
                      ? "Confirm Password length is more than 5"
                      : "Confirm Password is required"
                    : ""
                }
                {...field}
              />
            )}
          ></Controller>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href={`/login?redirect=${redirect || "/"}`} variant="body2">
                {"Already have an account? Sign in."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}

export default RegisterScreen;
