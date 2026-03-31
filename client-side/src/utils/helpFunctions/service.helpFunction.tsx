import { userRegex } from "../../data";

export const parseIdentifier = (
  identifier: string,
  phonePrefix: string,
): Record<string, string> => {
  if (userRegex.phoneNumberRegex.test(identifier)) {
    return {
      phoneNr: phonePrefix ? `${phonePrefix}${identifier}` : identifier,
      email: "",
      username: "",
    };
  }

  if (userRegex.emailRegex.test(identifier)) {
    return { email: identifier, phoneNr: "", username: "" };
  }

  return { username: identifier, email: "", phoneNr: "" };
};
