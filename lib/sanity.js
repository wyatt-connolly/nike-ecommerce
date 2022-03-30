import sanityClient from "@sanity/client";
import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import config from "./config";

const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: "2022-03-15",
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
