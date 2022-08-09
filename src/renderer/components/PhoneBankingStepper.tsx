import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useSelector } from "react-redux";
import { selectActiveStepIdx } from "renderer/redux/formSlice";
import { ConfirmStep } from "./ConfirmStep";
import { SendStep } from "./SendStep";
import { SetupStep } from "./SetupStep";

const steps = ["Setup", "Confirm", "Send"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <SetupStep />;
    case 1:
      return <ConfirmStep />;
    case 2:
      return <SendStep />;
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
