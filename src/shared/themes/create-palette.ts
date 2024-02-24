import { cyan } from '@mui/material/colors';
import { eduFlex } from './colors';

export const createPalette = () => {
  return {


    primary: {
      main: eduFlex.titleColor,
      dark: eduFlex.activeColor,
      light: eduFlex.bodyColor,
      contrastText: "#ffffff",
    },

    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },

    background: {
      paper: "#ffffff",
      default: eduFlex.bodyColor
    },



    // action: {
    //   active: neutral[500],
    //   disabled: alpha(neutral[900], 0.38),
    //   disabledBackground: alpha(neutral[900], 0.12),
    //   focus: alpha(neutral[900], 0.16),
    //   hover: alpha(neutral[900], 0.04),
    //   selected: alpha(neutral[900], 0.12)
    // },


    // mode: 'light',
    // neutral,
    // text: {
    //   primary: neutral[900],
    //   secondary: neutral[500],
    //   disabled: alpha(neutral[900], 0.38)
    // },
  };
}
