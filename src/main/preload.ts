import { ExecException } from "child_process";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Contact } from "types";

export type Channels = "ipc-example" | "send-texts";

export type SendTextsChannelArgs = [
  { senderName: string; messageTemplate: string; contacts: Contact[] }
];

export type SendTextsChannelResp = { error: ExecException; stderr: string };

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
