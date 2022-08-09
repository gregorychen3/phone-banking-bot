import { Contact } from "types";

export const getAppleScript = (
  senderName: string,
  messageTemplate: string,
  contacts: Contact[]
) => {
  const script = `
  tell application "Messages"
    set smsService to 1st service whose service type = SMS
    ${contacts
      .map(
        (c) => `set recipient to buddy "${c.number}" of smsService
    send "${renderMessage(messageTemplate, senderName, c.name)}" to recipient`
      )
      .join("\n    ")}
  end tell`;

  return script;
};

const renderMessage = (
  messageTemplate: string,
  senderName: string,
  recipientName: string
) =>
  messageTemplate
    .replaceAll("SENDER_NAME", senderName)
    .replaceAll("RECIPIENT_NAME", recipientName);
