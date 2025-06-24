import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, ExecResult } from "../../types";
import { RootState } from "./store";

export interface FormState {
  messageTemplate: string;
  contacts: Contact[];
  activeStepIdx: number;
  execResult?: ExecResult;
}

const initialState: FormState = {
  messageTemplate: "",
  contacts: [],
  activeStepIdx: 0,
  execResult: undefined,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setMessageTemplate: (state, { payload }: PayloadAction<string>) => {
      state.messageTemplate = payload;
    },
    setContacts: (state, { payload }: PayloadAction<Contact[]>) => {
      state.contacts = payload;
    },
    resetForm: (state) => {
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
    clearExecResult: (state) => {
      state.execResult = undefined;
    },
  },
});

export const {
  setMessageTemplate,
  setContacts,
  resetForm,
  setActiveStepIdx,
  setExecResult,
  clearExecResult,
} = formSlice.actions;

export const selectMessageTemplate = (state: RootState) =>
  state.form.messageTemplate;
export const selectContacts = (state: RootState) => state.form.contacts;
export const selectActiveStepIdx = (state: RootState) =>
  state.form.activeStepIdx;
export const selectExecResult = (state: RootState) => state.form.execResult;

export default formSlice.reducer;
