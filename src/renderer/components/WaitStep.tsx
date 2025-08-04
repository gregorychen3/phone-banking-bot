import { Alert, Box, Grid, LinearProgress } from "@mui/material";
import { formatDuration } from "date-fns";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/formSlice";

export const WaitStepIdx = 3;

export function WaitStep() {
  const numContacts = useSelector(selectContacts).length;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }}>
        <LinearProgress />
      </Grid>

      <Grid size={{ xs: 12 }}>
        Your texts are being sent with a{" "}
        <Box fontWeight="bold" component="span">
          5 second delay
        </Box>{" "}
        between each to avoid triggering your carrier's rate limits.
      </Grid>

      <Grid size={{ xs: 12 }}>
        Since you have{" "}
        <Box color="success.main" component="span">
          {numContacts}
        </Box>{" "}
        text{numContacts === 1 ? "" : "s"} to send, this will take{" "}
        <Box color="success.main" component="span">
          {formatDuration({ seconds: numContacts * 5 })}
        </Box>
        . Take a coffee break! ☕️
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Alert severity="warning">
          Don't close this window! We'll let you know when we're done.
        </Alert>
      </Grid>
    </Grid>
  );
}
