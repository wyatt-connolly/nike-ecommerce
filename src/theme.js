import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#546e7a",
    },
    secondary: {
      main: "#d81b60",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
