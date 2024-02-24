import { createTheme } from "@mui/material";
import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { eduFlex } from "./colors";

const components = createComponents();
const palette = createPalette();

export const LightTheme = createTheme({
  palette,
  components,

  typography: {
    allVariants: {
      color: eduFlex.titleColor,
      fontFamily: 'Montserrat, sans-serif',
    }
  },

});