import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import { Alert } from '@mui/material';

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
        {(!process.env.REACT_APP_IMAGE_UPLOAD_KEY || !process.env.REACT_APP_MOCK_API_KEY) && <Alert severity="error" variant="filled">Please add required secret keys documented in <strong>README</strong> file to be able to run this form.</Alert>}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}