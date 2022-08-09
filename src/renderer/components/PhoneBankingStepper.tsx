import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import { useState } from "react";
import { ConfirmStep } from "./ConfirmStep";
import { SendStep } from "./SendStep";
import { SetupStep } from "./SetupStep";
import { UploadStep } from "./UploadStep";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  senderName: Yup.string().required("Required"),
  messageTemplate: Yup.string()
    .required("Required")
    .matches(/SENDER_NAME/, "Template should contain SENDER_NAME placeholder")
    .matches(
      /RECIPIENT_NAME/,
      "Template should contain RECIPIENT_NAME placeholder"
    ),
  contacts: Yup.string()
    .required("Required")
    .test(
      "is-valid-contact-data",
      "Each row must have: [name, phone_num]",
      (value) => {
        // not sure why, by this can be undefined while the form is still being filled out
        if (!value) {
          return false;
        }

        const rows = value.split("\n");
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowSplit = row.split("\t");
          if (rowSplit.length !== 2) {
            return false;
          }

          const [name, number] = rowSplit;
          if (!name || !number) {
            return false;
          }
        }

        return true;
      }
    ),
});

const steps = ["Setup", "Upload contacts", "Confirm", "Send"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <SetupStep />;
    case 1:
      return <UploadStep />;
    case 2:
      return <ConfirmStep />;
    case 3:
      return <SendStep />;
    default:
      throw new Error(`Unknown step ${step}`);
  }
}

export interface FormValues {
  senderName: string;
  messageTemplate: string;
  contacts: string;
}

const initialValues = { senderName: "", messageTemplate: "", contacts: "" };

export function PhoneBankingStepper() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const handleNext = () => {
    setActiveStepIdx(activeStepIdx + 1);
  };

  const handleBack = () => {
    setActiveStepIdx(activeStepIdx - 1);
  };

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
      <>
        {activeStepIdx === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStepIdx)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStepIdx !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStepIdx === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </>
    </Paper>
  );
}
