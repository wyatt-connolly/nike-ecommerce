import React from "react";
import ResponsiveAppBar from "./Nav";

function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
