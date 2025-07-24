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

export interface CreateUserValues {
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
