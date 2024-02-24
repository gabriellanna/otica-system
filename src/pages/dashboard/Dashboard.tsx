import { useEffect, useState } from "react";
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";

import { OverviewSales, OverviewTotalCustomers, OverviewBudget, OverviewTotalProfit } from "./sections";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Env } from "../../shared/environment";

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);

  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCidades(result!.totalCount);
        }
      });

    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPessoas(result!.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
    //barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex' >
        <Grid container>

          <Grid item container spacing={4}
          // bgcolor='GrayText'
          >
            <Grid item
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value="$24k"
              />
            </Grid>
            <Grid item
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="1.6k"
              />
            </Grid>
            <Grid item
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value="$15k"
              />
            </Grid>


            <Grid item
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    name: 'Este ano',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                  },
                  {
                    name: 'Ano passado',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>



            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}
            // bgcolor='#af6262f3'
            >

              <Box margin={0}>
                <Card sx={{ borderRadius: `${Env.BD_RADIUS}` }}>
                  <CardContent sx={{ borderRadius: `${Env.BD_RADIUS}` }}>
                    <Typography variant="h5" align="center">
                      Total de Pessoas
                    </Typography>

                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                      {!isLoadingPessoas && (
                        <Typography variant="h1">
                          {totalCountPessoas}
                        </Typography>
                      )}
                      {isLoadingPessoas && (
                        <CircularProgress size={90} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}
            // bgcolor='#73af62f3'
            >

              <Box margin={0}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      Total de Cidades
                    </Typography>

                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                      {!isLoadingCidades && (
                        <Typography variant="h1">
                          {totalCountCidades}
                        </Typography>
                      )}
                      {isLoadingCidades && (
                        <CircularProgress size={90} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}
            // bgcolor='#af6262f3'
            >

              <Box margin={0}>
                <Card sx={{ borderRadius: `${Env.BD_RADIUS}` }}>
                  <CardContent sx={{ borderRadius: `${Env.BD_RADIUS}` }}>
                    <Typography variant="h5" align="center">
                      Total de Pessoas
                    </Typography>

                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                      {!isLoadingPessoas && (
                        <Typography variant="h1">
                          {totalCountPessoas}
                        </Typography>
                      )}
                      {isLoadingPessoas && (
                        <CircularProgress size={90} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}
            // bgcolor='#73af62f3'
            >

              <Box margin={0}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      Total de Cidades
                    </Typography>

                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                      {!isLoadingCidades && (
                        <Typography variant="h1">
                          {totalCountCidades}
                        </Typography>
                      )}
                      {isLoadingCidades && (
                        <CircularProgress size={90} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>

            </Grid>

          </Grid>

        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};