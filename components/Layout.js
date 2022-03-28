import React from "react";
import ResponsiveAppBar from "./Nav";
import { Container } from "@mui/material";

function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <main>{children}</main>
      </Container>
    </>
  );
}

export default Layout;
