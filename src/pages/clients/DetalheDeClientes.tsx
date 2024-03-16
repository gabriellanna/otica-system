import { useEffect, useState } from "react";
import { Avatar, Box, Breadcrumbs, Divider, Grid, Icon, LinearProgress, Link, Paper, Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { ClientesService } from "../../shared/services/api/clientes/ClientesService";
import { VTextFil, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { AutoCompleteCidade } from "../pessoas/components/AutoCompleteCidade";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Env } from "../../shared/environment";
import { DadosUsuarioSection, DividerFalse } from "./components";

interface IFormData {
  name: string;
  email: string;
}

export const DetalheDeClientes: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {

    setIsLoading(true);

    ClientesService.getById(Number(id))
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/clientes');
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });

  }, [id, navigate, formRef]);


  // const handleSave = (dados: IFormData) => {
  //   //.................................. { abortEarly: false } ====> validar todos os erros de uma vez só, true valida só o primeiro
  //   formValidationSchema.validate(dados, { abortEarly: false })
  //     .then((dadosValidados: any) => {

  //       setIsLoading(true);


  //       ClientesService
  //         .updateById(Number(id), { id: Number(id), ...dadosValidados })
  //         .then((result) => {
  //           setIsLoading(false);

  //           if (result instanceof Error) {
  //             alert(result.message);
  //           } else {
  //             if (isSaveAndClose()) {
  //               navigate('/clientes')
  //             }
  //           }
  //         });
  //     }

  //     )
  //     .catch((errors: yup.ValidationError) => {
  //       const validadtionErros: IVFormErrors = {};

  //       errors.inner.forEach(error => {
  //         if (!error.path) return;

  //         validadtionErros[error.path] = error.message;
  //       });

  //       console.log(errors.errors);
  //       formRef.current?.setErrors(validadtionErros);
  //     });

  // };

  const handleDelete = (id: number) => {
    if (window.confirm('Realmente deseha apagar?')) {
      ClientesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro apagado com sucesso!");
            navigate('/clientes');
          }
        });
    }
  };

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <LayoutBaseDePagina
      titulo={'Perfil do Cliente'}
    // barraDeFerramentas={
    //   <FerramentasDeDetalhe
    //     textoBotaoNovo="Novo Cliente"
    //     mostrarBotaoSalvarEFechar

    //     aoClicarEmSalvar={save}
    //     aoClicarEmSalvarEFechar={saveAndClose}
    //     aoClicarEmVoltar={() => navigate('/clientes/')}
    //     aoClicarEmApagar={() => handleDelete(Number(id))}
    //     aoClicarEmNovo={() => navigate('/clientes/novo')}

    //   //() => formRef.current?.submitForm()
    //   />
    // }
    >
      <Box width='100%' minHeight={500}
        sx={Env.FLEX_COLUMN} gap={4}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/pagina-inicial">
            Página inicial
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Clientes
          </Link>
          <Typography color="text.primary">Perfil do Cliente</Typography>
        </Breadcrumbs>

        <Grid container direction={lgDown ? 'column-reverse' : 'row'} spacing={0} gap={2}>

          <Grid item ////////////// Container da Esquerda
            xs={9}
            sm={8.3}  // 600px
            md={7.2}    // 900px
            lg={8.3}  // 1200px
            xl={9}    // 1500px
            minHeight={500}
          //  bgcolor={'#bb3a3a3d'}
          >
            <Paper component={Box} variant="outlined" minHeight={500} sx={{ width: '100%', typography: 'body1', borderRadius: 5 }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Vendas" value="1" icon={<Icon>sell</Icon>} iconPosition="start" />
                    <Tab label="O.S" value="2" icon={<Icon>handshake</Icon>} iconPosition="start" />
                    <Tab label="Receitas" value="3" icon={<Icon>grading</Icon>} iconPosition="start" />
                    <Tab label="Crediário" value="4" icon={<Icon>show_chart</Icon>} iconPosition="start" />
                  </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item For</TabPanel>
              </TabContext>
            </Paper>
          </Grid>

          <Grid item ////////////// Container da direita
            flex={1}
            minHeight={500}
          // 
          //   bgcolor={'#33333337'}
          >
            <Paper component={Box} width='100%' minHeight={500} elevation={10}
              sx={{ ...Env.FLEX_COLUMN, borderRadius: 5, backgroundColor: theme.palette.background.default }}
              padding={1} boxSizing={'border-box'}
              justifyContent='start'
              alignItems='center'
              gap={2}
            >
              <Avatar sx={{ width: '150px', height: '150px' }}>
              </Avatar>

              <Typography fontWeight={500}>
                {name}
              </Typography>

              <Stack 
                width='100%'
                gap={1}
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <DividerFalse />

                <DadosUsuarioSection 
                  title="Telefone:"
                  description="21 9 68660160"
                />
                <DadosUsuarioSection 
                  title="Endereço:"
                  description="R. Carlos Pereira Leal, 317"
                />
                <DadosUsuarioSection 
                  title="UF:"
                  description="RJ"
                />
                <DadosUsuarioSection 
                  title="Email:"
                  description="alveslanna@gmail.com"
                />

                <DividerFalse />

              </Stack>
            </Paper>
          </Grid>

        </Grid>
      </Box>

    </LayoutBaseDePagina>
  );
};

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   boxSizing: 'border-box',
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   width: '100%'
// }));