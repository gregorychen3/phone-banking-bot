export interface Contact {
  name: string;
  number: string;
}

export type IpcChannels = "ipc-example" | "send-texts";

export type SendTextsChannelRequest = [
  { senderName: string; messageTemplate: string; contacts: Contact[] }
];

export interface ExecErrorResult {
  error: Error;
  stderr: string;
  stdout: string;
}

export interface ExecSuccessResult {
  stdout: string;
}
