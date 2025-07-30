import { UseFormReset } from "react-hook-form";

// Auth
export interface LoginHelpValues {
  email?: string;
  phoneNr?: string;
  phonePrefix?: string;
  action?: string;
  toFormName?: string;
}

export interface LoginValues {
  password: string;
  identifier: string;
  phonePrefix: string;
}

export interface CreateAccountValues {
  fullname: string;
  password: string;
  username: string;
  identifier: string;
  phonePrefix: string;
}

export interface VerifyAccountValues {
  code: string;
  reset?: UseFormReset<VerifyAccountValues>;
  username?: string;
}

export interface VerifyCodeValues {
  action: string;
  username: string;
  code: string;
  toFormName: string;
}

export interface ResendCodeValues {
  action: string;
  username: string;
  fullname: string;
  email?: string;
  phoneNr?: string;
}
