import { useEffect, useState } from "react";
import { Box, Button, Icon, Switch, Typography } from "@mui/material";

import { SectionDadosPrincipais, SectionSuperior, SectionContato, SectionButton } from "./sections";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Env } from "../../shared/environment";
import { ClientesService, ICellphone, IDetalheCliente, IEmail } from "../../shared/services/api/clientes/ClientesService";
import { useNavigate, useParams } from "react-router-dom";


class Cellphone implements ICellphone {
  constructor(
    public number: string,
    public identificacao: string,
    public main: boolean
  ) {}
}

export const NovoCliente: React.FC = () => {

  const [cellphones, setCellphones] = useState<ICellphone[]>([]);
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [clientType, setClientType] = useState(true);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  const [errorCellphones, setErrorCellphones] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const [errorCellphoneName, setErrorCellphoneName] = useState(false);


  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const dadosCliente: IDetalheCliente = {
    name: name,
    emails: emails,
    cellphones: cellphones,
    address: address
  }

  useEffect(() => {
    const cellphone = new Cellphone("nada", "nada", true);

    setCellphones(oldArray => [...oldArray, cellphone]);
    
  }, [])

  useEffect(() => {

    setErrorName(false);
    setErrorAddress(false);
    setErrorCellphones(false);

    setErrorCellphoneName(false);
  }, [name, emails, cellphones, address, ])

  useEffect(() => {
    if (id === 'novo') {

      setName('');
      setEmails([]);
      setCellphones([]);
      setAddress('');

    } else {
      setIsLoading(true);

      ClientesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/clientes');
          } else {
            setName(result.name);
            setEmails(result.emails);
            setCellphones(result.cellphones);
            setAddress(result.address);

          }
        })
    }
  }, []);

  const handleSubmit = () => {
    //console.log(clientObj);
    setIsLoading(true);

    if (id === 'novo') {
      ClientesService.create(dadosCliente)
        .then(result => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            //navigate('/clientes');
          }
        });
    } else {
      ClientesService.updateById(Number(id), { id: Number(id), ...dadosCliente }).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate('/clientes');
        }
      })
    }

  }




  const handleAoClicarEmSalvar = () => {
    setIsLoading(true);

    const validName = name.length > 2;
    const validAddress = address.length > 2;
    const validEmail = emails.some(email => email.main === true);
    const validCellphone = cellphones.some(cell => cell.main === true);

    const validCellphoneName = cellphones?.every(cell => cell.number.length > 3);
    const validEmailName = emails.every(email => email.email.length > 3);


    if ( validName && validAddress && validEmail && validCellphone && validCellphoneName && validEmailName ) {

      if (id === 'novo') { 
        alert('Perfil Criado com Sucesso !!'); 
      }
      else { 
        alert('Perfil alterado com Sucesso !!') 
      };

    } else {
      if (validName === false) setErrorName(true);
      if (validAddress === false) setErrorAddress(true);

      if (validCellphone === false) setErrorCellphones(true);

      if (validCellphoneName === false) setErrorCellphoneName(true);
    }

    setIsLoading(false);
  }


  const handleAoClicarApagar = () => {
    if (window.confirm('Realmente deseha apagar?')) {

      alert('Perfil deletado com sucesso!')
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === "novo" ? "Adicionar Cliente" : "Editar Perfil"}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          aoClicarEmNovo={() => navigate('/clientes/novo')}
          aoClicarEmVoltar={() => navigate('/clientes')}
          aoClicarEmSalvar={handleAoClicarEmSalvar}
          aoClicarEmApagar={handleAoClicarApagar}

          mostrarBotaoVoltarCarregando={isLoading}
          mostrarBotaoSalvarCarregando={isLoading}
          mostrarBotaoApagarCarregando={isLoading}
          mostrarBotaoNovoCarregando={isLoading}
        />
      }
    >
      <Box sx={Env.FLEX_COLUMN} gap={12}>


        <SectionSuperior
          clientType={clientType}
          setClientType={setClientType}
          name={name}
        />
        <Box>
          <Typography variant="h5">Name: <Switch checked={errorName} /></Typography>
          <Typography variant="h5">Addres: <Switch checked={errorAddress} /></Typography>
          <p>----------------------------------</p>
          <Typography variant="h5">Cellphone PRINCIPAL: <Switch checked={errorCellphones} /></Typography>
          <Typography variant="h5">Cellphone NAME: <Switch checked={errorCellphoneName} /></Typography>

        </Box>

        <SectionDadosPrincipais
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          clientType={clientType}
          errorName={errorName}
          errorAddress={errorAddress}
        />

        <SectionContato
          rowsCellphones={cellphones}
          setRowsCellphones={setCellphones}
          rowsEmails={emails}
          setRowsEmails={setEmails}
          errorCellphoneName={errorCellphoneName}
        />

        <SectionButton
          handleSubmit={handleSubmit}
        />


      </Box>

    </LayoutBaseDePagina>
  )
}

