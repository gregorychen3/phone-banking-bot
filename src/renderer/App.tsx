import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PhoneBankingForm } from "./components/PhoneBankingForm";

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
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Phone Banking Bot
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <PhoneBankingForm />
      </Container>

      <MemoryRouter>
        <Routes>
          <Route path="/" element={null} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}
