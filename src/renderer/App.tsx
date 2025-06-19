import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PhoneBankingStepper } from "./components/PhoneBankingStepper";
import { store } from "./redux/store";
import { theme } from "./theme";

export default function App() {
  return (
    <Provider store={store}>
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
          <PhoneBankingStepper />
        </Container>

        <MemoryRouter>
          <Routes>
            <Route path="/" element={null} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}
