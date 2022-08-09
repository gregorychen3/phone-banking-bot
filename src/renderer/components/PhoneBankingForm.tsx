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
  email: Yup.string().email("Invalid email").required("Required"),
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

export function PhoneBankingForm() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Formik
      initialValues={{ senderName: "", messageTemplate: "" }}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
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
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </Form>
    </Formik>
  );
}
