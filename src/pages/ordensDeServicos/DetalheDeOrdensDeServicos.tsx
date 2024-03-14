import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { OrdensDeServicosService } from "../../shared/services/api/ordensDeServicos/OrdensDeServicosService";
import { VTextFil, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeOrdensDeServicos: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      OrdensDeServicosService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/ordensDeServicos');
          } else {
            setNome(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id, navigate, formRef]);


  const handleSave = (dados: IFormData) => {
    //.................................. { abortEarly: false } ====> validar todos os erros de uma vez só, true valida só o primeiro
    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {

        setIsLoading(true);

        if (id === 'nova') {
          OrdensDeServicosService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/ordensDeServicos')
                } else {
                  navigate(`/ordensDeServicos/detalhe/${result}`); //result me retorna o Id do usuário
                }
              }
            });
        } else {
          OrdensDeServicosService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/ordensDeServicos')
                }
              }
            });
        }

      })
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
      OrdensDeServicosService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro apagado com sucesso!");
            navigate('/ordensDeServicos');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova ordensDeServico' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate('/ordensDeServicos/')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/ordensDeServicos/detalhe/nova')}

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
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextFil
                  fullWidth
                  name='nome'
                  disabled={isLoading}
                  label='Nome'
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>

    </LayoutBaseDePagina>
  );
};