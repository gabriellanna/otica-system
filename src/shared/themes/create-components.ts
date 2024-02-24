import { paperClasses } from "@mui/material";
import { eduFlex } from "./colors";

export function createComponents(/*config*/) {
  // const { palette } = config;
  const colorShadow = eduFlex.bodyColor;

  return {

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0px 5px 30px 2px ${colorShadow}`,
          borderRadius: 25,
          [`&.${paperClasses.elevation2}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
          }
        }
      }
    },

    

  };
};

export function createComponents2() {

  return {

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          [`&.${paperClasses.elevation2}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
          }
        }
      }
    },
  };
};