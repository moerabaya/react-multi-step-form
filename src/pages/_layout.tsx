import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Navigation from '../components/Navigation';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function Layout({children}: any) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
				<Navigation />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}