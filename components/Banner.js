import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function Banner() {
  return (
    <>
      <Card
        sx={{
          mt: 2,
          p: 6,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Nike Store
          </Typography>
          <Typography variant="subtitle1">
            Your best source for cheap Nikes.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Banner;
