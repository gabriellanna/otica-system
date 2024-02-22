import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React, { ReactNode } from 'react';

interface IAppThemeProviderProps {
    children: ReactNode
}

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvatarNoImg: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const theme = useTheme();

    if (typeof children !== 'string') {
      throw new Error('O children deve ser uma string');
    }

    function stringToColor(string: string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
    
    function stringAvatar(name: string) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }

      return (
        <Avatar {...stringAvatar(children)} sx={{ height: theme.spacing(12), width: theme.spacing(12)}}  />
      );
}
  // eslint-disable-next-line no-unreachable
export default AvatarNoImg;