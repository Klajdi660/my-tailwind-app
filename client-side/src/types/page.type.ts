import { UseFormReset } from "react-hook-form";

// Auth
export interface LoginHelpValues {
  email?: string;
  phoneNr?: string;
  phonePrefix?: string;
  action?: string;
  toFormName?: string;
  reset?: UseFormReset<LoginHelpValues>;
}

export interface LoginValues {
  password: string;
  identifier: string;
  phonePrefix: string;
  reset: UseFormReset<LoginValues>;
}

export interface CreateAccountValues {
  fullname: string;
  password: string;
  username: string;
  identifier: string;
  phonePrefix: string;
  reset: UseFormReset<CreateAccountValues>;
}

export interface VerifyAccountValues {
  code: string;
  username: string;
  reset: UseFormReset<any>;
}

export interface VerifyCodeValues {
  action: string;
  username: string;
  code: string;
  toFormName: string;
  reset: UseFormReset<any>;
}

export interface ResendCodeValues {
  action: string;
  username: string;
  fullname: string;
  email?: string;
  phoneNr?: string;
}
