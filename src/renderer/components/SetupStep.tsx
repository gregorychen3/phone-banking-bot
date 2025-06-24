import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessageTemplate,
  setActiveStepIdx,
  setMessageTemplate,
} from "../redux/formSlice";
import { contactsStepIdx } from "./ContactsStep";
import { ControlledTextField } from "./ControlledTextField";

interface FormValues {
  messageTemplate: string;
}

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const messageTemplate = useSelector(selectMessageTemplate);

  const form = useForm<FormValues>({
    defaultValues: { messageTemplate },
    mode: "onBlur",
  });

  const onSubmit = (values: FormValues) => {
    d(setMessageTemplate(values.messageTemplate.trim()));
    d(setActiveStepIdx(contactsStepIdx));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              ctrlProps={{
                name: "messageTemplate",
                rules: {
                  required: true,
                  validate: (v) =>
                    v.includes("RECIPIENT_NAME")
                      ? true
                      : "Template must contain RECIPIENT_NAME placeholder",
                },
              }}
              textFieldProps={{
                label: "Message Template",
                type: "text",
                helperText: "Use RECIPIENT_NAME placeholders",
                placeholder: templatePlaceholder,
                multiline: true,
                minRows: 3,
                fullWidth: true,
              }}
            />
          </Grid>
          <Grid container size={{ xs: 12 }} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}

const templatePlaceholder = `Hi RECIPIENT_NAME, this is John from the community center. Hope to see you at our next event!`;
