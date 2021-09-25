import React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Circle, PieChart, Settings } from 'react-feather';
import {
  Link,
} from "react-router-dom";

interface DrawerProps {
  drawerWidth: number,
  mobileOpen: boolean,
  handleDrawerToggle: () => void
}

function Nav({ drawerWidth, mobileOpen, handleDrawerToggle }: DrawerProps) {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} to="/live">
          <ListItemIcon>
            <Circle color="red" size={20} />
          </ListItemIcon>
          <ListItemText primary={"Live"} />
        </ListItem>
        <ListItem button component={Link} to="/statistics">
          <ListItemIcon>
            <PieChart size={20} />
          </ListItemIcon>
          <ListItemText primary={"Statistics"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Nav;