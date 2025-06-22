import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEventHandler, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isErrorResponse, SaveFileResponse } from "../../types";
import {
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
  setAttachmentFilePath,
  setMessageTemplate,
  setSenderName,
} from "../redux/formSlice";
import { contactsStepIdx } from "./ContactsStep";
import { ControlledTextField } from "./ControlledTextField";
import { UploadFileButton } from "./UploadFileButton";

interface FormValues {
  senderName: string;
  messageTemplate: string;
}

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);

  // register response callback
  useEffect(() => {
    window.electron.ipcRenderer.once("save-file", (res) => {
      const resp = res as SaveFileResponse;
      if (isErrorResponse(resp)) {
        // TODO
        d(setAttachmentFilePath(""));

        return;
      }

      d(setAttachmentFilePath(resp.filePath));
    });
  }, [d]);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
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

      window.electron.ipcRenderer.sendMessage("save-file", [
        { file: { name: file.name, data: data as ArrayBuffer } },
      ]);
    };

    reader.onerror = (err) => {
      // TODO
    };

    reader.readAsArrayBuffer(file); // or readAsDataURL / readAsArrayBuffer / readAsBinaryString
  };

  const form = useForm<FormValues>({
    defaultValues: { senderName, messageTemplate },
    mode: "onBlur",
  });

  const onSubmit = (values: FormValues) => {
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
            <UploadFileButton onUpload={handleUpload} />
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
