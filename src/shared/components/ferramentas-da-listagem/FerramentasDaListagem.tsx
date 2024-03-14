import { Box, Button, Icon, Paper, TextField, useMediaQuery, useTheme } from "@mui/material";

import { Env, Environment } from "../../environment";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}



export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
}) => {

    const theme = useTheme();

    const smDown = useMediaQuery(() => theme.breakpoints.down('sm'));

    return (
        <Box
            minHeight={theme.spacing(5)}
            marginX={0}
            padding={1}
            paddingX={2}
            sx={smDown ? Env.FLEX_COLUMN : Env.FLEX_ROW}
            gap={1}
            alignItems={'start'}
            component={Paper}
        >
            {mostrarInputBusca && (
                <TextField
                    size="small"
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextDeBusca?.(e.target.value)}
                    placeholder={Environment.INPUT_DE_BUSCA}
                />
            )}

            <Box flex={1} display={'flex'} justifyContent={'end'}>
                {mostrarBotaoNovo && (
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>
        </Box>
    );
}