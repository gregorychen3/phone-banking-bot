export interface Contact {
  name: string;
  number: string;
}

export type IpcChannels = "ipc-example" | "send-texts";

export type SendTextsChannelRequest = [
  { senderName: string; messageTemplate: string; contacts: Contact[] }
];

export interface ExecResult {
  error?: {
    // Error props
    name: string;
    message: string;
    stack?: string;

    // ExecException props
    cmd?: string;
    killed?: boolean;
    code?: number;
    signal?: NodeJS.Signals;
  } | null;
  stderr: string;
  stdout: string;
}
