import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, ExecResult } from "types";
import { RootState } from "./store";

export interface FormState {
  senderName: string;
  messageTemplate: string;
  contacts: Contact[];
  activeStepIdx: number;
  execResult?: ExecResult;
}

const initialState: FormState = {
  senderName: "",
  messageTemplate: "",
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
    setContacts: (state, { payload }: PayloadAction<Contact[]>) => {
      state.contacts = payload;
    },
    resetForm: (state) => {
      state.senderName = "";
      state.messageTemplate = "";
      state.contacts = [];
      state.activeStepIdx = 0;
    },
    setActiveStepIdx: (state, { payload }: PayloadAction<number>) => {
      state.activeStepIdx = payload;
    },
    setExecResult: (state, { payload }: PayloadAction<ExecResult>) => {
      state.execResult = payload;
    },
  },
});

export const {
  setSenderName,
  setMessageTemplate,
  setContacts,
  resetForm,
  setActiveStepIdx,
  setExecResult,
} = formSlice.actions;

export const selectSenderName = (state: RootState) => state.form.senderName;
export const selectMessageTemplate = (state: RootState) =>
  state.form.messageTemplate;
export const selectContacts = (state: RootState) => state.form.contacts;
export const selectActiveStepIdx = (state: RootState) =>
  state.form.activeStepIdx;
export const selectExecResult = (state: RootState) => state.form.execResult;

export default formSlice.reducer;
