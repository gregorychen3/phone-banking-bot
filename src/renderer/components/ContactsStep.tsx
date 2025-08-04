import { Grid, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Contact } from "../../types";
import {
  selectContacts,
  setActiveStepIdx,
  setContacts,
} from "../redux/formSlice";
import { confirmStepIdx } from "./ConfirmStep";
import { ControlledTextField } from "./ControlledTextField";
import CopyContactsScreenshot from "./copy_contacts_screenshot.png";
import { setupStepIdx } from "./SetupStep";

interface FormValues {
  rawContacts: string;
}

export const contactsStepIdx = 1;

export function ContactsStep() {
  const d = useDispatch();

  const contacts = useSelector(selectContacts);

  const handleBack = () => d(setActiveStepIdx(setupStepIdx));

  const form = useForm<FormValues>({
    defaultValues: {
      rawContacts: contacts.map((c) => `${c.name}\t${c.number}`).join("\n"),
    },
    mode: "onBlur",
  });

  const onSubmit = (values: FormValues) => {
    const c = parseRawContacts(values.rawContacts.trim());
    const deduped = _.uniqWith(c, _.isEqual);

    d(setContacts(deduped));
    d(setActiveStepIdx(confirmStepIdx));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
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
            <ControlledTextField
              ctrlProps={{
                name: "rawContacts",
                rules: {
                  required: true,
                  validate: (v) => {
                    // not sure why, by this can be undefined while the form is still being filled out
                    if (!v) {
                      return "Required";
                    }

                    const rows = v.split("\n");
                    for (let i = 0; i < rows.length; i++) {
                      const row = rows[i];
                      const rowSplit = row.split("\t");
                      if (rowSplit.length !== 2) {
                        return "Each row must have: [name, phone_num]";
                      }

                      const [name, number] = rowSplit;
                      if (!name || !number) {
                        return "Each row must have: [name, phone_num]";
                      }
                    }

                    return true;
                  },
                },
              }}
              textFieldProps={{
                label: "Contacts",
                type: "text",
                multiline: true,
                minRows: 3,
                fullWidth: true,
              }}
            />
          </Grid>
          <Grid container size={{ xs: 12 }} justifyContent="flex-end">
            <Button onClick={handleBack}>Back</Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
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
