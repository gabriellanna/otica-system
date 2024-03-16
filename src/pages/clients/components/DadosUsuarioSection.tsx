import { Box, Typography } from "@mui/material"

interface DadosUsuarioSectionProps {
  title: string;
  description: string;
}

export const DadosUsuarioSection: React.FC<DadosUsuarioSectionProps> = ({title, description}) => {
  return (
    <Box>
      <Typography fontSize='13px' fontWeight={700}>
        {title}
      </Typography>
      <Typography marginLeft={1}>
        {description}
      </Typography>
    </Box>
  )
};

export const DividerFalse: React.FC = () => (
  <Box />
);
