import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
  setMessageTemplate,
  setSenderName,
} from "renderer/redux/formSlice";
import * as Yup from "yup";
import { contactsStepIdx } from "./ContactsStep";

const formSchema = Yup.object().shape({
  senderName: Yup.string().trim().required("Required"),
  messageTemplate: Yup.string()
    .trim()
    .required("Required")
    .matches(/SENDER_NAME/, "Template should contain SENDER_NAME placeholder")
    .matches(
      /RECIPIENT_NAME/,
      "Template should contain RECIPIENT_NAME placeholder"
    ),
});

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);

  const initialValues = {
    senderName,
    messageTemplate,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        d(setSenderName(values.senderName.trim()));
        d(setMessageTemplate(values.messageTemplate.trim()));
        setSubmitting(false);
        d(setActiveStepIdx(contactsStepIdx));
      }}
    >
      <Form>
        <Grid container spacing={4}>
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
              placeholder={templatePlaceholder}
              multiline
              minRows={3}
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

const templatePlaceholder = `E.g.,
Hi RECIPIENT_NAME,
Hope to see you at our next Lib Forum!

Best,
SENDER_NAME`;
