import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function Banner() {
  return (
    <>
      <Card
        sx={{
          mt: 2,
          p: { xs: 4, sm: 11, md: 14, lg: 17, xl: 20 },
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Nike Knockoffs
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
