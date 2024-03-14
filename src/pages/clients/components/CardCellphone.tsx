import styled from "styled-components";

import { ICellphone } from "../../../shared/services/api/clientes/ClientesService";
import { FormControlLabel, FormGroup, Icon, IconButton, Paper, Switch, TextField } from "@mui/material";

interface CardCellphoneProps {
  indice: number;
  handleDeleteCellphone: (indice: number) => void;
  rowsCellphones: ICellphone[];
  setRowsCellphones: React.Dispatch<React.SetStateAction<ICellphone[]>>
  errorCellphoneName: boolean;
}

export const CardCellphone: React.FC<CardCellphoneProps> = ({ indice, 
  handleDeleteCellphone, 
  setRowsCellphones, 
  rowsCellphones, 
  errorCellphoneName,
}) => {


  const handleChangeNumero = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRowsCellphones(prevListTel => {
      const novaArray = prevListTel.map((celular, index) => {
        if (index === indice) {
          return { ...celular, number: e.target.value };
        } else {
          return celular;
        }
      });
      return novaArray;
    });
  }

  const handleMainCell = () => {

    setRowsCellphones(prevListCell => {
      const updatedArray = prevListCell.map((cellphone, index) => {
        if (index === indice && cellphone.main === false) {
          return { ...cellphone, main: true }
        } else {
          return { ...cellphone, main: false };
        }
      });

      return updatedArray;
    })
  };


  const valueNumber = rowsCellphones.filter((_, i) => i === indice)[0].number;


  return (
    <Paper sx={{ boxShadow: '0 0 50px 1px #3737371f', borderRadius: '20px' }}>
      <CardContainer>
        <div className='input-div'>
          <TextField
            value={valueNumber}
            onChange={handleChangeNumero}
            size="small"
            label='Número'
            error={errorCellphoneName}
            helperText={errorCellphoneName && ('Todos obrigatórios')}
            required
          />
          <TextField
            size="small"
            label='Identificação'
            helperText={errorCellphoneName && ('Ex: "Telefone Pessoal"')}
          />
        </div>


        <div className='button-div'>

          <FormGroup>
            <FormControlLabel
              label="Principal"
              control={
                <Switch
                  checked={rowsCellphones[indice].main}
                  onChange={handleMainCell}
                  size="small"
                />
              }
            />
          </FormGroup>

          <IconButton size='small'
            onClick={() => handleDeleteCellphone(indice)}
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
    justify-content: space-between;
    padding: 5px;
    box-sizing: border-box;
  
  .button-div-1{
    display: flex;
    flex-direction: row;
  }

    input{
      width: 150px;
    }
  }
`