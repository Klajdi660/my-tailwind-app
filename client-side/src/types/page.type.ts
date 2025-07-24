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
  remember?: boolean;
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
