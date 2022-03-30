import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../lib/Store";
import cart from "../pages/cart";
import { Badge } from "@mui/material";
import { useSnackbar } from "notistack";
import { AccountCircle } from "@mui/icons-material";

const pages = ["Shop", "About"];

const ResponsiveAppBar = () => {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
              <Link href="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{pages[0]}</Typography>
                </MenuItem>
              </Link>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{pages[1]}</Typography>
              </MenuItem>
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/">
              <Button
                key={pages[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[0]}
              </Button>
            </Link>
            <Button
              key={pages[1]}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[1]}
            </Button>
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
              <Link href="/profile">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
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
