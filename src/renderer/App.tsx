import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const Hello = () => {
  return <Button variant="contained">Hello World</Button>;
};

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Phone Banking Bot
          </Typography>
        </Toolbar>
      </AppBar>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}
