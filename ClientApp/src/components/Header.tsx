import React from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Badge, Box, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell, Moon, Sun } from 'react-feather';
import { ColorModeContext } from '../App';

interface HeaderProps {
  drawerWidth: number,
  handleDrawerToggle: () => void
}

function Header({ drawerWidth, handleDrawerToggle }: HeaderProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar
      elevation={0}
      color='inherit'
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Room Vision
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: 'flex' } }}>
          <IconButton
            sx={{
              marginRight: 2
            }}>
            <Badge badgeContent={4} color="error">
              <Bell size={20} color={theme.palette.text.primary} />
            </Badge>
          </IconButton>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ?
              <Sun size={20} color={theme.palette.text.primary} /> : <Moon size={20} color={theme.palette.text.primary} />
            }
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}

export default Header;