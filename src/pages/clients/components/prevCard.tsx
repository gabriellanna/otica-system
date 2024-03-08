export {};

// import { Box, FormControl, FormControlLabel, FormLabel, Icon, IconButton, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material"

// import { ICellphone } from "../../../shared/services/api/clientes/ClientesService";
// import { Env } from "../../../shared/environment";


// interface CardCellphoneProps {
//   handleDeleteCellphone: (indice: number) => void
//   rowsCellphones: ICellphone[];
//   indice: number;
//   setRowsCellphones: React.Dispatch<React.SetStateAction<ICellphone[]>>;
// }

// export const CardCellphone: React.FC<CardCellphoneProps> = ({ indice, rowsCellphones, handleDeleteCellphone, setRowsCellphones, }) => {

//   const handleChangeNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
  
//     setRowsCellphones(prevListCell => {
//       const novaArray = prevListCell.map((celular, index) => {
//         if (index === indice) {
//           return { ...celular, number: e.target.value };
//         } else {
//           return celular;
//         }
//       });
//       return novaArray;
//     });
//   }

//   const handleDelete = () => {
//     handleDeleteCellphone(indice)
//   }

//   const valueNumber = rowsCellphones.filter((_, i) => i === indice)[0].number;

//   return (
//     <Paper
//       component={Box}
//       width='100%' minHeight='80px' bgcolor='#bdc7cf9f'
//       sx={{ display: 'flex', flexDirection: 'column', borderRadius: '20px' }} gap={2}
//       boxShadow='0 0 10px 3px #24242424'
//       padding={3} boxSizing='border-box'
//       elevation={10}
//     >


//       <Box sx={Env.FLEX_ROW} gap={2}>
//         <Box width='50%'>
//           <Typography>Número</Typography>
//         </Box>
//         <Box width='50%'>
//           <Typography>Identificação</Typography>
//         </Box>
//       </Box>


//       <Box sx={Env.FLEX_ROW} gap={1}>
//         <input
//           value={rowsCellphones.filter((_, i) => i === indice)[0].number} // rowsCellphones[indice].number
//           onChange={handleChangeNumero}
//         />
//         <input
//           value={'teste'}
//         // onChange={(e) => setIdentfyCell(e.target.value)}
//         />
//       </Box>

//       <Box
//         sx={Env.FLEX_ROW} alignItems='flex-end' justifyContent='space-around'
//       >
//         <FormControl>
//           <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
//           <RadioGroup
//             row
//             aria-labelledby="demo-row-radio-buttons-group-label"
//             name="row-radio-buttons-group"
//           >
//             <FormControlLabel value="female" control={<Radio />} label="Principal" />
//             <FormControlLabel value="male" control={<Radio />} label="SMS" />
//             <FormControlLabel value="other" control={<Radio />} label="WhatsApp" />
//           </RadioGroup>
//         </FormControl>

//         <IconButton size='small'
//           onClick={handleDelete}
//           sx={{ color: "#d62727", background: '#ffe8cf99', '&:hover': { color: '#a7a7a7', transition: '.2s' } }}
//         >
//           <Icon>delete</Icon>
//         </IconButton>
//       </Box>


//     </Paper>
//   )
// }
