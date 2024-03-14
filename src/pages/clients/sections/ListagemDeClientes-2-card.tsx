import { Paper, Box, Avatar, Icon, Typography, useTheme } from "@mui/material";

import { IListagemCliente } from "../../../shared/services/api/clientes/ClientesService";
import { Env } from "../../../shared/environment";

interface SectionCardTableMobileProps {
  rows: IListagemCliente[];
}

export const SectionCardTableMobile: React.FC<SectionCardTableMobileProps> = ({ rows }) => {

  const theme = useTheme();

  return (
    <Box ///////////////////////////////////////// section pai container
      minHeight={200}
      width={'100%'}
      sx={Env.FLEX_COLUMN}
      gap={2}
    >
      {rows?.map((row) => (
        <Paper key={row.id}
          component={Box}
          sx={{ ...Env.FLEX_ROW, borderRadius: '20px', zIndex: 10 }}
          gap={'5px'}
          elevation={6}
          paddingY={'5px'}
        >
          <Box /////////////////////////////////////  avatar 
            marginLeft={1}
            sx={Env.FLEX_COLUMN}
            maxWidth={40}
          >
            <Avatar>
              <Icon>people</Icon>
            </Avatar>
            <Typography fontSize={10}>
              Otica Rosi
            </Typography>
          </Box>

          <Box ////////////////////////////////////// container do meio
            width={'65%'}
            //border={'1px solid black'}
            sx={Env.FLEX_COLUMN}
            gap={1}
          >
            <Box
              //border={'1px solid green'}
              width={'100%'}
            >
              <Typography fontSize={'14px'} fontWeight={600}>
                {row.name}
              </Typography>
            </Box>
            <Box
              //border={'1px solid green'}
              width={'100%'}
            >
              <Typography fontSize={'14px'} fontWeight={600}>

                {row.cellphones.filter(cell => cell.main === true)[0].number}

              </Typography>

            </Box>
            <Box
              // border={'1px solid brown'}
              width={'100%'}
              fontSize={'11px'}
              fontWeight={700}
            >
              {row.address}
            </Box>
          </Box>

          <Box ///////////////////////////////////// container da direita
            flex={1}
            //border={'1px solid red'} 
            sx={Env.FLEX_COLUMN}
            justifyContent={'center'}
            gap={1}
            marginRight={1}
          >
            <Box bgcolor={theme.palette.primary.main} fontSize={'10px'}
              fontWeight={500}
              color='#fff'
              borderRadius={1}
              paddingY={'3px'}
              paddingLeft={'4px'}
            >
              1 Ven.
            </Box>
            <Box bgcolor={theme.palette.primary.main} fontSize={'10px'}
              fontWeight={500}
              color='#fff'
              borderRadius={1}
              paddingY={'3px'}
              paddingLeft={'4px'}
            >
              1 O.S
            </Box>
            <Box bgcolor={theme.palette.primary.main} fontSize={'9px'}
              fontWeight={500}
              color='#fff'
              borderRadius={1}
              paddingY={'3px'}
              paddingLeft={'4px'}
            >
              1 Recei.
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}
