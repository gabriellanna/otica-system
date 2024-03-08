import { Box, Typography, Paper, Button, Icon, Container, CardContent } from '@mui/material';

import { ICellphone } from '../../../shared/services/api/clientes/ClientesService';
import { Env } from '../../../shared/environment';
import { Cardd } from '../components/CardCellphone';
import styled from 'styled-components';



var sectionStyle = {
  width: '100%',
  minHeight: '50px',

  borderRadius: '10px',
  //border: '1px solid black',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '1rem',
}

var divStyle = {
  borderRadius: '10px',
  border: '1px solid #b0b0b0',
  backgroundColor: '#fff',
  padding: '10px',
}




interface SectionContatoProps {
  rowsCellphones: ICellphone[];
  setRowsCellphones: React.Dispatch<React.SetStateAction<ICellphone[]>>;
}

export const SectionContato: React.FC<SectionContatoProps> = ({ rowsCellphones, setRowsCellphones }) => {

  const handleAddCellphone = () => {
    let noCell: ICellphone = { number: '', identificacao: '' }
    setRowsCellphones(prevListTel => [...prevListTel, noCell]);
  }

  const handleDeleteCellphone = (indice: number) => {
    setRowsCellphones(prevListTel => prevListTel.filter((_, index) => index !== indice));
  }

  return (
    <Box // content inferior
      width='100%' minHeight='300px' height='min-content'
      sx={Env.FLEX_COLUMN} gap={4} boxSizing='border-box'
    // bgcolor='#adeca9'
    >


      <Typography variant="h6">
        Informações de Contato
      </Typography>

      <Box sx={sectionStyle}>
        {rowsCellphones.map((cell, indice) => (
          <Box sx={divStyle}>
            <p>{indice}</p>
            <p>Telefone: {cell.number}</p>
            <p>Identificação: {cell.identificacao}</p>
          </Box>
        ))
        }
      </Box>

      <Container component={Box} width='100%' height='min-content' sx={Env.FLEX_ROW} gap={5} //bgcolor='#3333334f'
      >

        {/* <Paper component={Box} width='50%' height='min-content' // border='1px solid black'
          sx={Env.FLEX_COLUMN} gap={2}
          padding='20px'
          elevation={10}
        >

          <Box sx={Env.FLEX_ROW} justifyContent='space-between' // label e button + Telefone
          >
            <Typography>Telefones</Typography>
            <Button
              variant="contained"
              startIcon={<Icon>add</Icon>}
              onClick={handleAddCellphone}
            >
              Telefone
            </Button>
          </Box>


          <Box flex={1} // bgcolor={'#33333365'} 
            sx={Env.FLEX_COLUMN} gap={3}
            height='min-content'
            marginY={6}
          >

            {rowsCellphones?.map((cell, indice) => (
              <CardCellphone
                key={cell.number}
                handleDeleteCellphone={handleDeleteCellphone}
                indice={indice}
                setRowsCellphones={setRowsCellphones}
                rowsCellphones={rowsCellphones}
              />
            ))}


          </Box>
        </Paper> */}

        <Paper component={Box} width='50%' boxSizing='border-box' elevation={5}>
          <Containerr>
            <TextContent>
              <Typography>Telefones</Typography>
              <Button
                startIcon={<Icon>add</Icon>}
                onClick={handleAddCellphone}
                variant="contained"
              >
                TELEFONE
              </Button>
            </TextContent>

            <CardContentt>

              {rowsCellphones.map((cell, indice) => (
                <Cardd
                  handleDeleteCellphone={handleDeleteCellphone}
                  setRowsCellphones={setRowsCellphones}
                  rowsCellphones={rowsCellphones}
                  indice={indice}
                />
              ))}

            </CardContentt>
          </Containerr>
        </Paper>



        <Paper component={Box} width='50%' // border='1px solid black'
          sx={Env.FLEX_COLUMN}
          padding='20px'
          elevation={5}
        >
          <Box sx={Env.FLEX_ROW} justifyContent='space-between'>
            <Typography>Emails</Typography>
            <Button
              variant="contained"
              startIcon={<Icon>add</Icon>}
            >
              Email
            </Button>
          </Box>
        </Paper>

      </Container>

    </Box>
  )
}



const Containerr = styled.div`
  
  width: 100%;
  min-height: 400px;
  //background-color: #dbdbdb;

  padding: 20px;
  box-sizing: border-box;
  
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  border-radius: 20px;
`
const CardContentt = styled.div`
  width: 100%;
  min-height: 100px;

  box-sizing: border-box;

  border-radius: 10px;
 // border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  `
const TextContent = styled.div`
  width: 100%;
  min-height: 50px;

  border-radius: 10px;
 // border: 1px solid black;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  div{
    border-radius: 10px;
    border: 1px solid #b0b0b0;
    background-color: #fff;
    padding: 10px;
  }
`
