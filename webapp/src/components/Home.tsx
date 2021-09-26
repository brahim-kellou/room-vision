import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
} from '@mui/material';
import Nav from './Nav';
import Header from './Header';
import Statistics from './statistics/Statistics';
import LiveAnalysis from './live-analysis/LiveAnalysis';

const drawerWidth = 240;

function Home() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Nav drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box sx={{ margin: 3 }}>
          <Switch>
            <Route path="/live">
              <LiveAnalysis />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;