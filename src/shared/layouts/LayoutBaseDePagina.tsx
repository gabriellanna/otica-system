import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    children: ReactNode;
    titulo: string;
    barraDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { toggleDrawerOpen } = useDrawerContext();

    return (                                       // marginX => movimenta todo o corpo dos filhos da aplicação
        <>
            <Box display={'flex'} gap={1} alignItems={'center'}  height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
                marginTop={2}
                maxWidth={'1200px'} 
              //  bgcolor='#44b0b8'
                borderRadius={3}
            >
                {mdDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h4'}
                    overflow={'hidden'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    fontFamily='Montserrat, sans-serif'
                    fontWeight={700}
                >
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box paddingTop={1} flex={1} height='min-content' // flex={1} ==> ocupar todo o espaço disponível 
               // overflow={'auto'}
               // bgcolor='#171547'
            >
                {children}
            </Box>

        </>
    );
};