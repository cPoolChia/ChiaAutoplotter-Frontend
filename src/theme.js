import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#000",
      contrastText: "#fff",
    },
    primary: {
      main: "#36AD58",
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "white",
      },
    },
  },
});
