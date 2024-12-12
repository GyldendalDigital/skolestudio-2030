import { createTheme } from "@mui/material/styles";

export const bgColor = "#fdf9f9";
export const textColor = "#481125";
export const textColorLight = "#691837";

export const theme = createTheme({
  palette: {
    primary: {
      light: textColorLight,
      main: textColor,
      dark: "#28000E",
      contrastText: bgColor,
    },
    secondary: {
      light: "#ff7961",
      main: textColor,
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: bgColor,
      paper: bgColor,
    },
    text: {
      primary: textColor,
      secondary: "#A35E70",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
