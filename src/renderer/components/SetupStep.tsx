import { Grid } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";

export function SetupStep() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="senderName"
          label="Sender Name"
          type="text"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="messageTemplate"
          label="Text Message Template"
          type="text"
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
