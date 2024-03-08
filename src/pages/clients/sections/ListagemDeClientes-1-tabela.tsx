import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Icon, Typography, Box, IconButton, TableFooter, LinearProgress, Pagination } from "@mui/material";
import { SetURLSearchParams, useNavigate } from "react-router-dom";

import { ClientesService, IListagemCliente } from "../../../shared/services/api/clientes/ClientesService";
import { Environment } from "../../../shared/environment";

interface SectionTableProps {
  rows: IListagemCliente[];
  setRows: React.Dispatch<React.SetStateAction<IListagemCliente[]>>;
  isLoading: boolean;
  totalCount: number;
  setSearchParams: SetURLSearchParams;
  busca: string;
  pagina: number;
}

export const SectionTable: React.FC<SectionTableProps> = ({ rows, setRows, isLoading, totalCount, setSearchParams, busca, pagina }) => {
  const navigate = useNavigate();
  
  const styleCell = { display: 'flex', flexDirection: 'row', alignItems: 'center' };

  const handleDelete = (id: number) => {
    if (window.confirm('Realmente deseja apagar?')) {
      ClientesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows((oldRows: IListagemCliente[]) => {

              return [
                ...oldRows.filter(oldRow => oldRow.id !== id),
              ]
            });
            alert("Registro apagado com sucesso!");
          }
        });
    }
  };

  return (
    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto', overflow: 'auto' }}>
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
                <TableCell>
                  <Avatar>
                    <Icon>people</Icon>
                  </Avatar>
                </TableCell>

                <TableCell>
                  <Typography>{row.name}</Typography>
                  <Typography component={Box} fontSize={12} sx={styleCell}>
                    <Icon >location_city</Icon>
                    Otica Rosi
                  </Typography>
                </TableCell>

                <TableCell>
                  {row.cellphones[0].number}
                </TableCell>

                <TableCell>
                  <Icon>location_on</Icon>
                  {row.address}
                </TableCell>

                <TableCell>
                  {row.email}
                </TableCell>

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
  )
}
