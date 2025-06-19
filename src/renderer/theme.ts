import { createTheme } from '@mui/material';

export const theme = createTheme({
  // same palette as the MUI docs
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(33, 150, 243)',
    },
    secondary: {
      main: 'rgb(245, 0, 87)',
    },
    success: {
      main: 'rgb(102, 187, 106)',
    },
    warning: {
      main: 'rgb(255, 167, 38)',
    },
    info: {
      main: 'rgb(41, 182, 246)',
    },
    error: {
      main: 'rgb(244, 67, 54)',
    },
    text: {
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
    background: {
      default: 'rgb(10, 25, 41)',
      paper: 'rgb(26, 32, 39)',
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: { shrink: true },
    },
    MuiOutlinedInput: {
      defaultProps: {
        notched: true,
      },
    },
  },
});
