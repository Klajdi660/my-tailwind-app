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
  username?: string;
}

export interface VerifyCodeValues {
  action: string;
  username: string;
  code: string;
}

export interface ResendCodeValues {
  action: string;
  username: string;
  fullname: string;
  email?: string;
  phoneNr?: string;
}
