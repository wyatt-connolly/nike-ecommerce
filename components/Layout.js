import React from "react";
import ResponsiveAppBar from "./Nav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
