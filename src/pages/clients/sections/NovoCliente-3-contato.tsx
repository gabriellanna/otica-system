import { Box, Typography, Paper, Button, Icon, Container, Switch } from '@mui/material';

import { ICellphone, IEmail } from '../../../shared/services/api/clientes/ClientesService';
import { CardCellphone } from '../components/CardCellphone';
import { CardEmail } from '../components/CardEmail';
import { Env } from '../../../shared/environment';



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
 // backgroundColor: '#fff',
  padding: '10px',
}




interface SectionContatoProps {
  rowsEmails: IEmail[];
  rowsCellphones: ICellphone[];
  setRowsEmails: React.Dispatch<React.SetStateAction<IEmail[]>>;
  setRowsCellphones: React.Dispatch<React.SetStateAction<ICellphone[]>>;
}

export const SectionContato: React.FC<SectionContatoProps> = ({ rowsCellphones, setRowsCellphones, rowsEmails, setRowsEmails }) => {

  const handleAddCellphone = () => {
    let noCell: ICellphone = { number: '', identificacao: '', main: false }
    setRowsCellphones(prevListTel => [...prevListTel, noCell]);
  }


  const handleAddEmail = () => {
    let noEmail: IEmail = { email: '', identificacao: '', main: false }
    setRowsEmails(prevListEmail => [...prevListEmail, noEmail]);
  }

  const handleDeleteCellphone = (indice: number) => {
    if(rowsCellphones.length > 1) {
      setRowsCellphones(prevListTel => prevListTel.filter((_, index) => index !== indice));
    }
    else {
      return;
    };
  };

  const handleDeleteEmail = (indice: number) => {
    setRowsEmails(prevListEmail => prevListEmail.filter((_, index) => index !== indice));
  };

  return (
    <Box // content inferior
      width='100%' minHeight='300px' height='min-content'
      sx={Env.FLEX_COLUMN} gap={4} boxSizing='border-box'
    // bgcolor='#adeca9'
    >


      <Typography variant="h6">
        Informações de Contato
      </Typography>

      <Box sx={sectionStyle} //-------------------------Teste---State----TELEFONE
      >
        {rowsCellphones.map((cell, indice) => (
          <Box sx={divStyle}>
            <p>{indice}</p>
            <p>Telefone: {cell.number}</p>
            <p>Identificação: {cell.identificacao}</p>
            <p>Principal: {<Switch checked={cell.main} />}</p>
          </Box>
        ))
        }
      </Box>

      <Container component={Box} width='100%' height='min-content' sx={Env.FLEX_ROW} gap={5} //bgcolor='#3333334f'
      >



        <Paper component={Box} width='50%' boxSizing='border-box' elevation={5} // Telefone Container
        >
          <Box
            width='100%'
            minHeight='100px'

            padding='20px'
            boxSizing='border-box'

            display='flex'
            alignItems='center'
            flexDirection='column'
            gap='2rem'

            borderRadius='20px'
          >
            <Box
              width='100%'
              minHeight='50px'

              borderRadius='10px'

              display='flex'
              justifyContent='space-between'
              alignItems='center'
              flexDirection='row'
              gap='1rem'
            >
              <Typography>Telefones</Typography>
              <Button
                startIcon={<Icon>add</Icon>}
                onClick={handleAddCellphone}
                variant="contained"
              >
                TELEFONE
              </Button>
            </Box>

            <Box
              width='100%'
              minHeight='100px'

              boxSizing='border-box'

              borderRadius='10px'

              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              gap='1rem'
            >

              {rowsCellphones.map((_, indice) => (
                <CardCellphone
                  handleDeleteCellphone={handleDeleteCellphone}
                  setRowsCellphones={setRowsCellphones}
                  rowsCellphones={rowsCellphones}
                  indice={indice}
                />
              ))}

            </Box>
          </Box>
        </Paper>




        <Paper component={Box} width='50%' boxSizing='border-box' elevation={5} // Email Container
        >
          <Box
            width='100%'
            minHeight='100px'

            padding='20px'
            boxSizing='border-box'

            display='flex'
            alignItems='center'
            flexDirection='column'
            gap='2rem'

            borderRadius='20px'
          >
            <Box
              width='100%'
              minHeight='50px'

              borderRadius='10px'

              display='flex'
              justifyContent='space-between'
              alignItems='center'
              flexDirection='row'
              gap='1rem'
            >
              <Typography>Emails</Typography>
              <Button
                startIcon={<Icon>add</Icon>}
                onClick={handleAddEmail}
                variant="contained"
              >
                Email
              </Button>
            </Box>

            <Box
              width='100%'
              minHeight='100px'

              boxSizing='border-box'

              borderRadius='10px'

              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              gap='1rem'
            >

              {rowsEmails.map((_, indice) => (
                <CardEmail
                  handleDeleteEmail={handleDeleteEmail}
                  setRowsEmails={setRowsEmails}
                  rowsEmails={rowsEmails}
                  indice={indice}
                />
              ))}

            </Box>
          </Box>
        </Paper>



      </Container>

      <Box sx={sectionStyle} //-------------------------Teste---State----Email
      >
        {rowsEmails.map((email, indice) => (
          <Box sx={divStyle}>
            <p>{indice}</p>
            <p>Email: {email.email}</p>
            <p>Identificação: {email.identificacao}</p>
            <p>Principal: {<Switch checked={email.main} />}</p>
          </Box>
        ))
        }
      </Box>

    </Box>
  )
}