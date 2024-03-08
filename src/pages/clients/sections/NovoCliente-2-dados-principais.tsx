import { Box, Typography, TextField } from '@mui/material';
import { Env } from '../../../shared/environment';

interface SectionDadosPrincipaisProps {
}

export const SectionDadosPrincipais: React.FC<SectionDadosPrincipaisProps> = () => {
  return (
    <Box  // content do meio
      width='100%' minHeight='200px' sx={Env.FLEX_ROW}
      justifyContent='space-between'
    //bgcolor='#efcece'
    >


      <Box width='45%' sx={Env.FLEX_COLUMN} // border='1px solid black'
        gap={2}
      >
        <Typography variant="h6">Dados Principais</Typography>

        <TextField label='Nome' />
        <TextField label='Apelido' disabled />
        <Box sx={Env.FLEX_ROW} gap={2}>
          <TextField label='Data de Nascimento' fullWidth disabled />
          <TextField label='CPF' fullWidth disabled />
        </Box>
        <TextField label='RG' disabled />
      </Box>




      <Box width='45%' sx={Env.FLEX_COLUMN} // border='1px solid black'
        gap={2}
      >
        <Typography variant="h6">Endereço</Typography>
        
        <Box sx={Env.FLEX_ROW} gap={2}>
          <TextField label='Cep' fullWidth disabled />
          <TextField label='Bairro' fullWidth disabled />
        </Box>
        <TextField label='Endereço' />
        <Box sx={Env.FLEX_ROW} gap={2}>
          <TextField label='Numero' fullWidth disabled />
          <TextField label='Complemento' fullWidth disabled />
        </Box>
        <TextField label='Cidade' disabled />
      </Box>


    </Box>
  )
}
