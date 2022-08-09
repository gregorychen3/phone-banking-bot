import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
