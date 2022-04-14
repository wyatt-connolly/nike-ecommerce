import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { InputBase } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Link from "next/link";
import { Store } from "../lib/Store";
import cart from "../pages/cart";
import { Badge } from "@mui/material";
import { useSnackbar } from "notistack";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import axios from "axios";
import { getError } from "../lib/error";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["Shop", "About"];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex", cursor: "pointer" },
              }}
            >
              Nike Knockoffs
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {categories.map((category, index) => (
                <Box>
                  <Link key={category} href={`/search?category=${category}`}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{category}</Typography>
                    </MenuItem>
                  </Link>
                </Box>
              ))}
            </Menu>
          </Box>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", cursor: "pointer" },
              }}
            >
              Nike Knockoffs
            </Typography>
          </Link>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            component="form"
            onSubmit={submitHandler}
          >
            {" "}
            <InputBase
              name="query"
              placeholder="Search products"
              onChange={queryChangeHandler}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            <Link href="cart">
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  {" "}
                  <LocalMallIcon sx={{ cursor: "pointer" }} />
                </Badge>
              ) : (
                <LocalMallIcon sx={{ cursor: "pointer" }} />
              )}
            </Link>
            {userInfo ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={loginClickHandler}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Link href="/login">
                <Button sx={{ ml: 1 }} color="inherit">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
