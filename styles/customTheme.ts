import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface ThemeOptions {
    [key: string]: any;
  }
}

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 40,
    }
  },
});