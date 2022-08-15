import { Grid, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  setActiveStepIdx,
  setContacts,
} from "renderer/redux/formSlice";
import { Contact } from "types";
import * as Yup from "yup";
import { confirmStepIdx } from "./ConfirmStep";
import CopyContactsScreenshot from "./copy_contacts_screenshot.png";
import { setupStepIdx } from "./SetupStep";

const formSchema = Yup.object().shape({
  rawContacts: Yup.string()
    .trim()
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

export const contactsStepIdx = 1;

export function ContactsStep() {
  const d = useDispatch();

  const contacts = useSelector(selectContacts);

  const initialValues = {
    rawContacts: contacts.map((c) => `${c.name}\t${c.number}`).join("\n"),
  };

  const handleBack = () => d(setActiveStepIdx(setupStepIdx));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        d(setContacts(parseRawContacts(values.rawContacts.trim())));
        setSubmitting(false);
        d(setActiveStepIdx(confirmStepIdx));
      }}
    >
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6">Prepare Your Google Sheet</Typography>
            <ul>
              <li>1st column should be the recipients' names.</li>
              <li>2nd column should be the recipients' phone numbers.</li>
              <li>
                For example:
                <Img src={CopyContactsScreenshot} />
              </li>
            </ul>
            <Typography variant="h6">Copy and Paste</Typography>
            <ul>
              <li>Highlight and copy only the cells that have data.</li>
              <li>Paste below.</li>
              <li>
                Do not attempt to manually input data below (only copy and
                paste).
              </li>
            </ul>
            <Field
              component={TextField}
              name="rawContacts"
              label="Contacts"
              type="text"
              multiline
              minRows={3}
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button onClick={handleBack}>Back</Button>
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

const Img = styled("img")`
  width: 100%;
`;
