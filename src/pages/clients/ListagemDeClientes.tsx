import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Icon, Paper, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

import { IListagemCliente, ClientesService } from "../../shared/services/api/clientes/ClientesService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { SectionCardTableMobile, SectionTable } from "./sections";
import { Env } from "../../shared/environment";


export const ListagemDeClientes: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, true);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const theme = useTheme();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ClientesService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result!.data);

            setTotalCount(result!.totalCount);
            setRows(result!.data);
          }
        });
    });
  }, [busca, pagina, debounce]);


 // const mdDown = useMediaQuery(theme.breakpoints.down('md')); /////////////////////  sm = 600px / md = 900px lg = 1200px
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg')); //   sm = 600px  //  md = 900px  //  lg = 1200px
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')); //   sm = 600px  //  md = 900px  //  lg = 1200px

  const color =  theme.palette.primary.main;

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Clientes"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Novo Cliente"
          aoClicarEmNovo={() => navigate('/clientes/novo')}
          aoMudarTextDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >


      <Box marginY={2}
        sx={lgDown ? Env.FLEX_COLUMN : Env.FLEX_ROW}
        justifyContent='space-between'
        gap={2}
      >
        <Button variant="contained" endIcon={<Icon>add</Icon>} sx={{ width: '220px' }}>
          Exportar Clientes
        </Button>
        <Typography
          variant="h6"
          sx={smDown ? { fontSize: '15px' } : {}}
        >
          Foram encontrados um total de {totalCount} clientes
        </Typography>
      </Box>

      {!smDown && (
        <SectionTable
          pagina={pagina}
          busca={busca}
          isLoading={isLoading}
          rows={rows}
          setRows={setRows}
          setSearchParams={setSearchParams}
          totalCount={totalCount}
        />)
      }

      {
        smDown && (
          <SectionCardTableMobile
            rows={rows}
          />
        )
      }

    </LayoutBaseDePagina>
  )
}