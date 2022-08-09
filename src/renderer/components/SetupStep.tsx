import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch, useSelector } from "react-redux";
import {
  Contact,
  selectContacts,
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
  setContacts,
  setMessageTemplate,
  setSenderName,
} from "renderer/redux/formSlice";
import * as Yup from "yup";
import { confirmStepIdx } from "./ConfirmStep";

const formSchema = Yup.object().shape({
  senderName: Yup.string().required("Required"),
  messageTemplate: Yup.string()
    .required("Required")
    .matches(/SENDER_NAME/, "Template should contain SENDER_NAME placeholder")
    .matches(
      /RECIPIENT_NAME/,
      "Template should contain RECIPIENT_NAME placeholder"
    ),
  rawContacts: Yup.string()
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

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);
  const contacts = useSelector(selectContacts);

  const initialValues = {
    senderName,
    messageTemplate,
    rawContacts: contacts.map((c) => `${c.name}\t${c.number}`).join("\n"),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        d(setSenderName(values.senderName));
        d(setMessageTemplate(values.messageTemplate));
        d(setContacts(parseRawContacts(values.rawContacts)));
        setSubmitting(false);
        d(setActiveStepIdx(confirmStepIdx));
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
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name="rawContacts"
              label="Contacts"
              helperText="Copy and paste cells from Google Sheets"
              type="text"
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

const parseRawContacts = (raw: string) => {
  const ret: Contact[] = [];

  const rows = raw.split("\n");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowSplit = row.split("\t");
    if (rowSplit.length !== 2) {
      throw new Error(`Malformed contact row: ${row}`);
    }

    const [name, number] = rowSplit;
    if (!name || !number) {
      throw new Error(`Malformed contact row: ${row}`);
    }

    ret.push({ name, number });
  }

  return ret;
};
