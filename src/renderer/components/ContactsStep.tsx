import { Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch } from "react-redux";
import { setActiveStepIdx, setContacts } from "renderer/redux/formSlice";
import * as Yup from "yup";
import { confirmStepIdx } from "./ConfirmStep";

const formSchema = Yup.object().shape({
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

interface FormValues {
  rawContacts: string;
}

const initialValues: FormValues = { rawContacts: "" };

export const uploadStepIdx = 1;

export function ContactsStep() {
  const d = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        d(setContacts(values.rawContacts));
        setSubmitting(false);
        d(setActiveStepIdx(confirmStepIdx));
      }}
    >
      <Form>
        <Grid container spacing={2}>
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
        </Grid>
      </Form>
    </Formik>
  );
}
