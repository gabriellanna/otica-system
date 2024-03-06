import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";


export const ListagemDeClientes: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, true);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
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
      PessoasService.getAll(pagina, busca)
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

  const handleDelete = (id: number) => {
    if (window.confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => {

              return [
                ...oldRows.filter(oldRow => oldRow.id !== id),
              ]
            });
            alert("Registro apagado com sucesso!");
          }
        });
    }
  };

  const styleTableCell = { display: 'flex', flexDirection: 'column', justifyContent: 'center' };
  const styleCell = { display: 'flex', flexDirection: 'row', alignItems: 'center' };
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
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>

            <TableRow>
              <TableCell width={10}></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Email</TableCell>
              <TableCell width={70}>Ações</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>

            {rows?.map(row => (
              <TableRow key={row.id}>
                <TableCell><Avatar><Icon>people</Icon></Avatar></TableCell>
                <TableCell sx={styleTableCell}>
                  <Typography>{row.nomeCompleto}</Typography>
                  <Typography component={Box} fontSize={12} sx={styleCell}>
                    <Icon >location_city</Icon>Otica Rosi
                  </Typography>
                </TableCell>
                <TableCell>(21) 9 9999-9999</TableCell>
                <TableCell><Icon>location_on</Icon>Av. teste teste, 00 / RJ - Nova Iguaçu </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/clientes/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} // <--- colSpan( qntdade de colunas vai ocupar de espaço )
                >
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  )
}