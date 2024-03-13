import { Box, Button, Icon, Typography } from "@mui/material"
import { Env } from "../../../shared/environment";

interface SectionButtonProps {
  handleSubmit: () => void;
}

export const SectionButton: React.FC<SectionButtonProps> = ({ handleSubmit }) => {
  return (
    <Box
      width='100%'
      sx={Env.FLEX_ROW}
      justifyContent='flex-end'
      paddingX={4}
      boxSizing='border-box'
    >
      <Button
        color="primary"
        disableElevation
        variant="contained"
        onClick={handleSubmit}
        startIcon={<Icon>save</Icon>}
      >
        <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}
          color='#fff'
        >
          Salvar e voltar
        </Typography>
      </Button>
    </Box>
  )
}
