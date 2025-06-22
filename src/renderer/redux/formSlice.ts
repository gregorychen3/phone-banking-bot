import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, ExecResult } from "../../types";
import { RootState } from "./store";

export interface FormState {
  senderName: string;
  messageTemplate: string;
  attachmentFilePath: string;
  contacts: Contact[];
  activeStepIdx: number;
  execResult?: ExecResult;
}

const initialState: FormState = {
  senderName: "",
  messageTemplate: "",
  attachmentFilePath: "",
  contacts: [],
  activeStepIdx: 0,
  execResult: undefined,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSenderName: (state, { payload }: PayloadAction<string>) => {
      state.senderName = payload;
    },
    setMessageTemplate: (state, { payload }: PayloadAction<string>) => {
      state.messageTemplate = payload;
    },
    setAttachmentFilePath: (state, { payload }: PayloadAction<string>) => {
      state.attachmentFilePath = payload;
    },
    setContacts: (state, { payload }: PayloadAction<Contact[]>) => {
      state.contacts = payload;
    },
    resetForm: (state) => {
      state.senderName = "";
      state.messageTemplate = "";
      state.attachmentFilePath = "";
      state.contacts = [];
      state.activeStepIdx = 0;
    },
    setActiveStepIdx: (state, { payload }: PayloadAction<number>) => {
      state.activeStepIdx = payload;
    },
    setExecResult: (state, { payload }: PayloadAction<ExecResult>) => {
      state.execResult = payload;
    },
    clearExecResult: (state) => {
      state.execResult = undefined;
    },
  },
});

export const {
  setSenderName,
  setMessageTemplate,
  setAttachmentFilePath,
  setContacts,
  resetForm,
  setActiveStepIdx,
  setExecResult,
  clearExecResult,
} = formSlice.actions;

export const selectSenderName = (state: RootState) => state.form.senderName;
export const selectMessageTemplate = (state: RootState) =>
  state.form.messageTemplate;
export const selectAttachmentFilePath = (state: RootState) =>
  state.form.attachmentFilePath;
export const selectContacts = (state: RootState) => state.form.contacts;
export const selectActiveStepIdx = (state: RootState) =>
  state.form.activeStepIdx;
export const selectExecResult = (state: RootState) => state.form.execResult;

export default formSlice.reducer;
