import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { ClientesService } from "../../shared/services/api/clientes/ClientesService";
import { VTextFil, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { AutoCompleteCidade } from "../pessoas/components/AutoCompleteCidade";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData {
  name: string;
  email: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({

  email: yup.string().required().email(),
  name: yup.string().required().min(3),
});

export const DetalheDeClientes: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');


  useEffect(() => {

    setIsLoading(true);

    ClientesService.getById(Number(id))
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/clientes');
        } else {
          setNome(result.name);
          formRef.current?.setData(result);
        }
      });

  }, [id, navigate, formRef]);


  const handleSave = (dados: IFormData) => {
    //.................................. { abortEarly: false } ====> validar todos os erros de uma vez só, true valida só o primeiro
    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados: any) => {

        setIsLoading(true);


        ClientesService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/clientes')
              }
            }
          });
      }

      )
      .catch((errors: yup.ValidationError) => {
        const validadtionErros: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validadtionErros[error.path] = error.message;
        });

        console.log(errors.errors);
        formRef.current?.setErrors(validadtionErros);
      });

  };

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

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova cliente' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Novo Cliente"
          mostrarBotaoSalvarEFechar

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate('/clientes/')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/clientes/novo')}

        //() => formRef.current?.submitForm()
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave} placeholder={undefined}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <VTextFil
                  fullWidth
                  name='name'
                  disabled={isLoading}
                  label='Nome'
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <VTextFil
                  fullWidth
                  name='email'
                  label='Email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <VTextFil
                  fullWidth
                  name='cellphones[0].number'
                  label='Telefone'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <VTextFil
                  fullWidth
                  name='address'
                  label='Endereço'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>

    </LayoutBaseDePagina>
  );
};