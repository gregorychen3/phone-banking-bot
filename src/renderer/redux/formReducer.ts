import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CounterState {
  senderName: string;
  messageTemplate: string;
  contacts: string;
}

const initialState: CounterState = {
  senderName: "",
  messageTemplate: "",
  contacts: "",
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
    setContacts: (state, { payload }: PayloadAction<string>) => {
      state.contacts = payload;
    },
    resetForm: (state) => {
      state = initialState;
    },
  },
});

export const { setSenderName, setMessageTemplate, setContacts, resetForm } =
  formSlice.actions;

export const selectSenderName = (state: RootState) => state.form.senderName;
export const selectMessageTemplate = (state: RootState) =>
  state.form.messageTemplate;
export const selectContacts = (state: RootState) => state.form.contacts;

export default formSlice.reducer;
