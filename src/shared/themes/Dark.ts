import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";
import { createComponents2 } from "./create-components";

const components = createComponents2();

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },

        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },

        background: {
            //paper: '#303134',
            paper: 'transparent',
            default: '#202124'
        }
    },

    components,

    typography: {
        allVariants: {
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
        }
    }
});