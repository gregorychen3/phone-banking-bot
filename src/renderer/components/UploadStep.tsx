import { Grid } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";

export function UploadStep() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="contacts"
          label="Contacts"
          helperText="copy and paste cells from Google Sheets"
          type="text"
          multiline
          fullWidth
          InputLabelProps
        />
      </Grid>
    </Grid>
  );
}
