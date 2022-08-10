export interface Contact {
  name: string;
  number: string;
}

export type IpcChannels = "ipc-example" | "send-texts";

export type SendTextsChannelRequest = [
  { senderName: string; messageTemplate: string; contacts: Contact[] }
];

export interface ExecResult {
  error: Error | null;
  stderr: string;
  stdout: string;
}
