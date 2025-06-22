import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { File } from "../../types";
import {
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
  setMessageTemplate,
  setSenderName,
} from "../redux/formSlice";
import { contactsStepIdx } from "./ContactsStep";
import { ControlledTextField } from "./ControlledTextField";

interface FormValues {
  senderName: string;
  messageTemplate: string;
}

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);

  const [attachment, setAttachment] = useState<File | undefined>();

  const form = useForm<FormValues>({
    defaultValues: { senderName, messageTemplate },
    mode: "onBlur",
  });

  const onSubmit = (values: FormValues) => {
    if (attachment) {
      window.electron.ipcRenderer.sendMessage("save-file", [
        { file: attachment },
      ]);
    }

    d(setSenderName(values.senderName.trim()));
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
          <Grid size={{ xs: 12 }}>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }

                  const reader = new FileReader();

                  reader.onload = (event) => {
                    const data = event.target?.result;
                    if (!data) {
                      return;
                    }

                    setAttachment({
                      name: file.name,
                      data: data as ArrayBuffer,
                    });
                  };

                  reader.onerror = (err) => {
                    console.error("Error reading file:", err);
                  };

                  reader.readAsArrayBuffer(file); // or readAsDataURL / readAsArrayBuffer / readAsBinaryString
                }}
              />
            </Button>
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
