import * as React from "react";
import Container from "@mui/material/Container";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Products from "../components/Products";
import client from "../lib/sanity.js";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/Nav";

export default function Index({ products }) {
  return (
    <>
      <Container maxWidth="xl">
        <Banner />
        <Products products={products} />
        {/* Footer */}
      </Container>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  return {
    props: { products },
  };
};
