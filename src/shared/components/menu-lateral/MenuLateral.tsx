/* eslint-disable */
import React, { ReactNode } from "react";
import { Box, Card, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";

import AvatarNoImg from "../avatar/AvatarNoImg";
import { useAppThemeContext } from "../../contexts/ThemeContext";
import { useAuthContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Env } from "../../environment";
import imgOculos from "../../assets/icon/oculos.png";

interface IAppThemeProviderProps {
  children: ReactNode
}
interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: () => void | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  }


  return (
    <ListItemButton selected={!!match} onClick={handleClick}
      sx={{ borderRadius: Env.BD_RADIUS - 6 }}
    //sx={{ '&.Mui-selected': { backgroundColor: eduFlex.activeColor }, borderRadius: Env.BD_RADIUS - 6 }}
    >
      <ListItemIcon>
        <Icon sx={{ '&.Mui-selected': { color: '#fff' } }}>
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // sm = 600px

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <Box    // BODY                               bgcolor={'#333'}
      width='100vw' height='100vh'
      display='flex' justifyContent='center'
      sx={{ overflowX: 'hidden', overflowY: 'auto' }}
    >
      <Box // CONTAINER                    bgcolor={'#333'}
        width='90vw' maxWidth='1400px' height='85vh'
        marginTop='2vw'
        display='flex' flexDirection='row' gap={3}
      >
        {/*    ESQUERDA      */}
        {!smDown && (
          <Box height='85vh' //bgcolor={'#a13f1e'}
          >
            <Box width={theme.spacing(28)} height="100%" display='flex' flexDirection='column'// bgcolor={'#a19f1e'}
            >

              <Box height={theme.spacing(20)} width="100%" display='flex' alignItems='center' justifyContent={'center'} gap={1} flexDirection='column'>

                <img src={`${imgOculos}`} style={{ width: '110px' }} />
                <Typography variant="h5">
                  <Icon>
                    wifi_find
                  </Icon>
                  Ótica System
                </Typography>
              </Box>

              <Divider />

              <Box flex={1} //flex={1} serve para fazer com que o container ocupe todo o espaço disponível
                borderRadius={Env.BD_RADIUS}
              >
                <List component='nav' sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                  {drawerOptions.map((drawerOption) => (
                    <ListItemLink
                      to={drawerOption.path}
                      key={drawerOption.path}
                      icon={drawerOption.icon}
                      label={drawerOption.label}
                      onClick={toggleDrawerOpen}
                    />
                  ))}
                </List>
              </Box>

              <Box>
                <List component='nav'>
                  <ListItemButton onClick={toggleTheme}>
                    <ListItemIcon>
                      <Icon>dark_mode</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Alternar tema" />
                  </ListItemButton>

                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <Icon>logout</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </ListItemButton>
                </List>
              </Box>
            </Box>
          </Box>
        )}
        {smDown && (
          <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
            <Box width={theme.spacing(28)} height="100%" display='flex' flexDirection='column'>

              <Box height={theme.spacing(20)} width="100%" display='flex' alignItems='center' justifyContent={'center'}>
                <AvatarNoImg>
                  Gabriel Lanna
                </AvatarNoImg>
              </Box>

              <Divider />

              <Box flex={1} //flex={1} serve para fazer com que o container ocupe todo o espaço disponível
              >
                <List component='nav'>
                  {drawerOptions.map((drawerOption) => (
                    <ListItemLink
                      to={drawerOption.path}
                      key={drawerOption.path}
                      icon={drawerOption.icon}
                      label={drawerOption.label}
                      onClick={toggleDrawerOpen}
                    />
                  ))}
                </List>
              </Box>

              <Box>
                <List component='nav'>
                  <ListItemButton onClick={toggleTheme}>
                    <ListItemIcon>
                      <Icon>dark_mode</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Alternar tema" />
                  </ListItemButton>

                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <Icon>logout</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </ListItemButton>
                </List>
              </Box>
            </Box>
          </Drawer>
        )}

        <Box // DIREITA
          flex={1} minHeight="100%"        // marginLeft={smDown ? 0 : theme.spacing(28)}
          display='flex' justifyContent='center'
        //position={'relative'}
        >

          <Box // FILHO 
            component={Card}
            elevation={2}
            height='min-content'
            flex={1}
            borderRadius={Env.BD_RADIUS}
            //bgcolor='#ffffff'
            display='flex' flexDirection='column' gap={2} //flexWrap='wrap'
            paddingX={4}
            paddingBottom={8}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
};