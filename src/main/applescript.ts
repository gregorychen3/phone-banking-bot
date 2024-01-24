import { Contact } from "types";

export const getAppleScript = (
  senderName: string,
  messageTemplate: string,
  contacts: Contact[]
) =>
  `tell application "Messages"
  set smsService to 1st service whose service type = SMS
  ${contacts
    .map((c) => {
      const number = removeNonNumericChars(c.number);
      const msg = renderMessage(messageTemplate, senderName, c.name);
      return `set recipient to buddy "${number}" of smsService
              send "${msg}" to recipient`;
    })
    .join("\n")}
  end tell`;

const renderMessage = (
  messageTemplate: string,
  senderName: string,
  recipientName: string
) =>
  escapeStr(
    messageTemplate
      .replaceAll("SENDER_NAME", senderName)
      .replaceAll("RECIPIENT_NAME", recipientName)
  );

/**
 * \ and " have special meaning in Applescript and need to be escaped. See:
 * https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-DontLinkElementID_57
 */
const escapeStr = (s: string) => s.replace(/[\\"]/g, "\\$&");

const removeNonNumericChars = (s: string) => s.replace(/\D/g, "");
