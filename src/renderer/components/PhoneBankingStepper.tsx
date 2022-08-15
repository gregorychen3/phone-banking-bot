import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useSelector } from "react-redux";
import { selectActiveStepIdx } from "renderer/redux/formSlice";
import { ConfirmStep } from "./ConfirmStep";
import { ContactsStep } from "./ContactsStep";
import { SentStep } from "./SentStep";
import { SetupStep } from "./SetupStep";

const steps = ["Setup", "Contacts", "Confirm", "Sent"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <SetupStep />;
    case 1:
      return <ContactsStep />;
    case 2:
      return <ConfirmStep />;
    case 3:
      return <SentStep />;
    default:
      throw new Error(`Unknown step ${step}`);
  }
}

export function PhoneBankingStepper() {
  const activeStepIdx = useSelector(selectActiveStepIdx);

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography component="h1" variant="h4" align="center">
        Send Texts
      </Typography>
      <Stepper activeStep={activeStepIdx} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStepIdx)}
    </Paper>
  );
}
