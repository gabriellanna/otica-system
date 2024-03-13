import styled from "styled-components";

import { IEmail } from "../../../shared/services/api/clientes/ClientesService";
import { FormControlLabel, FormGroup, Icon, IconButton, Paper, Switch, TextField } from "@mui/material";

interface CardEmailProps {
  indice: number;
  handleDeleteEmail: (indice: number) => void;
  rowsEmails: IEmail[];
  setRowsEmails: React.Dispatch<React.SetStateAction<IEmail[]>>
}

export const CardEmail: React.FC<CardEmailProps> = ({ indice, handleDeleteEmail, setRowsEmails, rowsEmails }) => {

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRowsEmails(prevListTel => {
      const novaArray = prevListTel.map((celular, index) => {
        if (index === indice) {
          return { ...celular, email: e.target.value };
        } else {
          return celular;
        }
      });
      return novaArray;
    });
  };

  const handleMainEmail = () => {

    setRowsEmails(prevListEmail => {
      const updatedArray = prevListEmail.map((email, index) => {
        if (index === indice && email.main === false) {
          return { ...email, main: true }
        } else {
          return { ...email, main: false };
        }
      });

      return updatedArray;
    })
  };

  const valueEmail = rowsEmails.filter((_, i) => i === indice)[0].email;


  return (
    <Paper sx={{ boxShadow: '0 0 50px 1px #3737371f', borderRadius: '20px' }}>
      <CardContainer>
        <div className='input-div'>
          <TextField value={valueEmail} onChange={handleChangeEmail} size="small" label='Email' />
          <TextField size="small" label='Identificação' />
        </div>
        <div className='button-div'>
          <FormGroup>

            <FormControlLabel
              label="Principal"
              control={
                <Switch
                  checked={rowsEmails[indice].main}
                  onChange={handleMainEmail}
                  size="small"
                />
              }
            />

          </FormGroup>

          <IconButton size='small'
            onClick={() => handleDeleteEmail(indice)}
            sx={{ color: "#d62727", background: '#ffe8cf99', '&:hover': { color: '#a7a7a7', transition: '.2s' } }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </CardContainer>
    </Paper>
  )
}



const CardContainer = styled.div`
  
  width: 100%;
  min-height: 100px;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 10px 20px;

  .text-div{
    width: 100%;
   // min-height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 2rem;

    input{
      width: 150px;
    }
  }

  .input-div{
    width: 100%;
    min-height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .button-div{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;
    box-sizing: border-box;

    input{
      width: 150px;
    }
  }
`;