import { Box, Typography, Switch, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";

import { imgSemFotoFundo } from "../../../shared/assets/images";
import { Env } from "../../../shared/environment";

interface SectionSuperiorProps {
  name: string;
  clientType: boolean;
  setClientType: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SectionSuperior: React.FC<SectionSuperiorProps> = ({  
  setClientType,
  clientType,
  name
}) => {

  const handleChange = () => {
    setClientType(!clientType);
  };

  return (
    <Box //content superior
      width='100%' minHeight='200px'
      sx={Env.FLEX_COLUMN}
    //bgcolor='#f5f5f5'
    >

      <Box width='80%'
      // border='1px solid black'
      >


        <Box sx={Env.FLEX_ROW} justifyContent='space-between' paddingX={4} boxSizing='border-box'>
          
          <Typography variant="h4">{name}</Typography>

          <Box sx={Env.FLEX_COLUMN}>
            <Typography>Ativo</Typography>
            <Switch />
          </Box>
        </Box>
      </Box>



      <Box width='100%' height='200px'
        sx={Env.FLEX_ROW} gap={4}
      //  border='1px solid black'
      >


        <Paper elevation={5} 
          sx={{ 
            minWidth: '200px', 
            height: '200px', 
            borderRadius: '20px', 
            cursor: 'pointer',
            '&:hover': {transition: '0.3s', background: '#3333338d'}
          }}
        >
          <img src={imgSemFotoFundo}
            style={{
              width: '200px',
              borderRadius: '20px',
            }}
          />
        </Paper>


        <Box
          sx={Env.FLEX_COLUMN} gap={5} justifyContent='center'
        >
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Tipo de Cliente</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={clientType}
              onChange={handleChange}
            >
              <FormControlLabel value={true} control={<Radio />} label="Pessoa Física" />
              <FormControlLabel value={false} control={<Radio />} label="Pessoa Jurídica" />
            </RadioGroup>
          </FormControl>
          <TextField label='Cadastrado em' disabled />
        </Box>


      </Box>

    </Box>
  )
}
