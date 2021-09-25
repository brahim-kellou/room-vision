import React from 'react';
import Home from './components/Home';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Router>
            <Home />
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider >
    </div>
  );
}

export default App;
