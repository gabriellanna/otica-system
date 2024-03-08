import styled from "styled-components";

import { ICellphone } from "../../../shared/services/api/clientes/ClientesService";
import { Box, Icon, IconButton, Paper, TextField } from "@mui/material";

interface CardProps {
  indice: number;
  handleDeleteCellphone: (indice: number) => void;
  rowsCellphones: ICellphone[];
  setRowsCellphones: React.Dispatch<React.SetStateAction<ICellphone[]>>
}

export const Cardd: React.FC<CardProps> = ({ indice, handleDeleteCellphone, setRowsCellphones, rowsCellphones }) => {

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

  const valueNumber = rowsCellphones.filter((_, i) => i === indice)[0].number;


  return (
    <Paper sx={{boxShadow: '0 0 50px 1px #3737371f', borderRadius: '20px'}}>
      <CardContainer>
        <div className='input-div'>
          <TextField value={valueNumber} onChange={handleChangeNumero} size="small" label='Número'/>
          <TextField size="small" label='Identificação'/>
        </div>
        <div className='button-div'>
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
    justify-content: flex-end;
    padding: 5px;
    box-sizing: border-box;

    input{
      width: 150px;
    }
  }
`