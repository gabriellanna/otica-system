import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Icon, Typography } from "@mui/material";

import { IListagemCliente, ClientesService } from "../../shared/services/api/clientes/ClientesService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { SectionTable } from "./sections";


export const ListagemDeClientes: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, true);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

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
        display='flex' flexDirection='row' justifyContent='space-between'
      >
        <Button variant="contained" endIcon={<Icon>add</Icon>}>
          Exportar Clientes
        </Button>
        <Typography variant="h5">Foram encontrados um total de {totalCount} clientes</Typography>
      </Box>

      <SectionTable 
        pagina={pagina}
        busca={busca}
        isLoading={isLoading}
        rows={rows}
        setRows={setRows}
        setSearchParams={setSearchParams}
        totalCount={totalCount}
      />
      
    </LayoutBaseDePagina>
  )
}