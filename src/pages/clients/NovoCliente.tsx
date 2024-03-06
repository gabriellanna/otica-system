import { Box, Card, Switch, TextField, Typography } from "@mui/material"
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"



export const NovoCliente: React.FC = () => {

  const flexRow = { display: 'flex', flexDirection: 'row' };
  const flexColumn = { display: 'flex', flexDirection: 'Column' };


  return (
    <LayoutBaseDePagina
      titulo="Adicionar Cliente"
      barraDeFerramentas={
        <FerramentasDeDetalhe

        />
      }
    >
      <Box sx={flexColumn} gap={12} marginTop='70px'>
        <Box width='100%' minHeight='200px'
          sx={flexRow}
          //bgcolor='#f5f5f5'
        >
          <Box width='50%' height='200px' 
            sx={flexRow} gap={4}
            //border='1px solid black'
          >
            <Card sx={{ width: '200px', height: '200px' }}>
              hola
            </Card>
            <Box
              sx={flexColumn} gap={2}
            >
              <TextField />
              <TextField />
            </Box>
          </Box>
          <Box width='50%' height='200px' 
            //border='1px solid black'
          >
            <Box display='flex' justifyContent='flex-end'>
              <Switch />
            </Box>
          </Box>
        </Box>

        <Box width='100%' minHeight='200px' sx={flexRow} 
          justifyContent='space-between'
          //bgcolor='#efcece'
        >
          <Box width='40%' sx={flexColumn} // border='1px solid black'
            gap={2}
          >
            <Typography variant="h6">Dados Principais</Typography>
            <TextField label='Nome'/>
            <TextField label='Apelido'/>
            <Box sx={flexRow} gap={2}>
              <TextField label='Data de Nascimento'/>
              <TextField label='CPF'/>
            </Box>
            <TextField label='RG'/>
          </Box>
          <Box width='40%' sx={flexColumn} // border='1px solid black'
            gap={2}
          >
            <Typography variant="h6">Endereço</Typography>
            <TextField />
            <Box sx={flexRow} gap={2}>
              <TextField />
              <TextField />
              <TextField />
            </Box>
            <TextField />
            <TextField />
          </Box>
        </Box>
      </Box>

    </LayoutBaseDePagina>
  )
}
