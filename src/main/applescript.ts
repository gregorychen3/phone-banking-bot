import { Contact } from "../types";

/**
 * \, ", and ' have special meaning in Applescript and need to be escaped. See:
 * https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-DontLinkElementID_57
 */
const escapeStr = (s: string) =>
  s.replaceAll(/[\\"]/g, "\\$&").replaceAll(`'`, `'"'"'`);

const removeNonNumericChars = (s: string) => s.replace(/\D/g, "");

export const getAppleScript = (
  senderName: string,
  messageTemplate: string,
  attachmentFilePath: string,
  contacts: Contact[],
) =>
  `
${
  attachmentFilePath
    ? `-- copy attachment file ref to clipboard
set attachment to POSIX file "${attachmentFilePath}" as alias

tell application "Finder"
  activate
  set selection to attachment
end tell

delay 0.2 -- Small delay to ensure selection registers

tell application "System Events"
  keystroke "c" using {command down}
end tell`
    : ""
}

tell application "Messages"
  -- check SMS service available
  set hasSMS to false
  try
    set smsService to 1st service whose service type = SMS
    set hasSMS to true
  on error
    set hasSMS to false
  end try

  if not hasSMS then
    display alert "SMS Not Set Up" message "Please set up Mac to send SMSs using your iPhone.
    See https://support.apple.com/guide/messages/get-sms-mms-and-rcs-texts-from-iphone-icht8a28bb9a/mac" as critical
    return
  end if

  -- send SMSs
  set smsService to 1st service whose service type = SMS
${contacts
  .map((c) => {
    const number = removeNonNumericChars(c.number);
    const msg = renderMessage(messageTemplate, senderName, c.name);
    return `  set recipient to buddy "${number}" of smsService
  send "${msg}" to recipient
  delay 0.2`;
  })
  .join("\n")}
end tell`;

const renderMessage = (
  messageTemplate: string,
  senderName: string,
  recipientName: string,
) => escapeStr(messageTemplate.replaceAll("RECIPIENT_NAME", recipientName));
