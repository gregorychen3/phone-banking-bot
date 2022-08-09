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
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          name="messageTemplate"
          label="Text Message Template"
          type="text"
          helperText="Use SENDER_NAME and RECIPIENT_NAME placeholders"
          multiline
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
}
