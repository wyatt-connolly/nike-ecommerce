import sanityClient from "@sanity/client";
import React from "react";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "nzez02dl",
  dataset: "production",
  apiVersion: "2022-03-15",
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
