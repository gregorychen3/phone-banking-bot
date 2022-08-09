import { Contact } from "types";

export const getAppleScript = (
  senderName: string,
  messageTemplate: string,
  contacts: Contact[]
) => {
  const message = messageTemplate
    .replaceAll("SENDER_NAME", senderName)
    .replaceAll("RECIPIENT_NAME", contacts[0].name);

  const script = `
  tell application "Messages"
    set smsService to 1st service whose service type = SMS
    set recipient to buddy "${contacts[0].number}" of smsService
    send "${message}" to recipient
  end tell`;
  return script;
};
