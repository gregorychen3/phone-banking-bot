import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { formatDuration } from "date-fns";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/formSlice";

export const WaitStepIdx = 3;

export function WaitStep() {
  const numContacts = useSelector(selectContacts).length;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" gutterBottom>
          Your texts are currently being sent. To avoid triggering your cell
          carrier's rate-limiting, the texts are being send with a 5 second
          delay between each. Since you have {numContacts} texts to send, this
          will take {formatDuration({ seconds: numContacts * 5 })}. Take a
          coffee break!
        </Typography>
        <Typography variant="subtitle1">
          Please follow up with text conversations in the Messages app.
        </Typography>
      </Grid>
      <Grid container size={{ xs: 12 }} justifyContent="flex-end">
        <Button variant="contained" onClick={() => {}}>
          TODO
        </Button>
      </Grid>
    </Grid>
  );
}
