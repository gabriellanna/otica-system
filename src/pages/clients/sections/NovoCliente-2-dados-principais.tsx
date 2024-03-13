import { Box, Typography, TextField } from '@mui/material';
import { Env } from '../../../shared/environment';

interface SectionDadosPrincipaisProps {
  name: string;
  address: string;
  errorName: boolean;
  clientType: boolean;
  errorAddress: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const SectionDadosPrincipais: React.FC<SectionDadosPrincipaisProps> = ({
  name,
  setName,
  address,
  setAddress,
  clientType,

  errorName,
  errorAddress
}) => {

  const handleChangeSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeSetAddres = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

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

        <TextField 
          label='Nome' 
          value={name}
          onChange={handleChangeSetName} 
          error={errorName}
          required
          helperText={errorName && ('O nome deve conter ao menos 3 caracteres')}
        />
        <TextField label='Apelido' disabled />
        <Box sx={Env.FLEX_ROW} gap={2}>
          <TextField label='Data de Nascimento' fullWidth disabled />

          {clientType && <TextField label='CPF' fullWidth disabled />}
          {!clientType && <TextField label='CNPJ' fullWidth disabled />}

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
        <TextField 
          label='Endereço' 
          value={address} 
          onChange={handleChangeSetAddres}
          error={errorAddress}
          required
          helperText={errorAddress && ('Campo obrigatório')}
        />
        <Box sx={Env.FLEX_ROW} gap={2}>
          <TextField label='Numero' fullWidth disabled />
          <TextField label='Complemento' fullWidth disabled />
        </Box>
        <TextField label='Cidade' disabled />
      </Box>


    </Box>
  )
}
