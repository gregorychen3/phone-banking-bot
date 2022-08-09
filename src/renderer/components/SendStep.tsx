import Typography from "@mui/material/Typography";

export const SendStepIdx = 2;

export function SendStep() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Texts Sent!
      </Typography>
      <Typography variant="subtitle1">
        Please follow up with text conversations in the Messages app.
      </Typography>
    </>
  );
}
