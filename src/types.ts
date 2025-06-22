export interface Contact {
  name: string;
  number: string;
}

export type IpcChannels = "ipc-example" | "send-texts" | "save-file";

export type File = { name: string; data: ArrayBuffer };

export type SaveFileRequest = [{ file: File }];
export type SaveFileResponse = { filePath: string } | ErrorResponse;

export type SendTextsChannelRequest = [
  {
    senderName: string;
    messageTemplate: string;
    attachmentFilePath: string;
    contacts: Contact[];
  },
];

export type ErrorExecResult = { error?: string };
export type SuccessExecResult = { stderr: string; stdout: string };
export type ExecResult = ErrorExecResult | SuccessExecResult;

export type ErrorResponse = { error: string };

export function isErrorResponse(x: any): x is ErrorResponse {
  return !!x.error;
}

export function isErrorExecResult(x: ExecResult): x is ErrorExecResult {
  return x.hasOwnProperty("error");
}

export function isSuccessExecResult(x: ExecResult): x is ErrorExecResult {
  return !isErrorExecResult(x);
}
