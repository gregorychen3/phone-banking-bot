import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch } from "react-redux";
import {
  setActiveStepIdx,
  setMessageTemplate,
  setSenderName,
} from "renderer/redux/formSlice";
import * as Yup from "yup";
import { contactsStepIdx } from "./ContactsStep";

const formSchema = Yup.object().shape({
  senderName: Yup.string().required("Required"),
  messageTemplate: Yup.string()
    .required("Required")
    .matches(/SENDER_NAME/, "Template should contain SENDER_NAME placeholder")
    .matches(
      /RECIPIENT_NAME/,
      "Template should contain RECIPIENT_NAME placeholder"
    ),
});

interface FormValues {
  senderName: string;
  messageTemplate: string;
}

const initialValues: FormValues = { senderName: "", messageTemplate: "" };

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        d(setSenderName(values.senderName));
        d(setMessageTemplate(values.messageTemplate));
        setSubmitting(false);
        d(setActiveStepIdx(contactsStepIdx));
      }}
    >
      <Form>
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
              helperText="Use SENDER_NAME and RECIPIENT_NAME placeholders"
              multiline
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
