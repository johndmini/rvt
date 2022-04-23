import { createTheme } from '@mui/material';

export const themeDark = createTheme({
  palette: {
    background: {
      default: '#262624',
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },
});

export const themeLight = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },
});
