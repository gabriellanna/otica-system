import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { SectionDadosPrincipais, SectionSuperior, SectionContato } from "./sections";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Env } from "../../shared/environment";
import { ClientesService, ICellphone } from "../../shared/services/api/clientes/ClientesService";
import { useNavigate, useParams } from "react-router-dom";


export const NovoCliente: React.FC = () => {

  const [valorTipoCliente, setValorTipoCliente] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphones, setCellphones] = useState<ICellphone[]>([]);
  const [address, setAddress] = useState('');
  

  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const clientObj = {
    name: name,
    email: email,
    cellphones: cellphones,
    address: address
  }

  useEffect(() => {
    if (id === 'novo') {

      setName('');
      setEmail('');
      setCellphones([]);
      setAddress('');

    } else {
      setIsLoading(true);

      ClientesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setName(result.name);
            setEmail(result.email);
            setCellphones(result.cellphones);
            setAddress(result.address);

          }
        })
    }
  }, [])


  return (
    <LayoutBaseDePagina
      titulo="Adicionar Cliente"
      barraDeFerramentas={
        <FerramentasDeDetalhe

        />
      }
    >
      <Box sx={Env.FLEX_COLUMN} gap={12}>


        <SectionSuperior
          valorTipoCliente={valorTipoCliente}
          setValor={setValorTipoCliente}
        />

        <SectionDadosPrincipais />

        <SectionContato  rowsCellphones={cellphones} setRowsCellphones={setCellphones}
         />


      </Box>

    </LayoutBaseDePagina>
  )
}

