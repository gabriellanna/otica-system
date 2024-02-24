import * as React from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Paper, Stack, SvgIcon, Typography } from '@mui/material';

interface OverviewTotalProfitProps {
  value: string;
  sx?: React.CSSProperties;
}

export const OverviewTotalProfit: React.FC<OverviewTotalProfitProps> = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}
      component={Paper}
      elevation={18}
    >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Lucro Total
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};