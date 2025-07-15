// Auth
export interface LoginHelpValues {
  email?: string;
  phoneNumber?: string;
  phonePrefix?: string;
}

export interface LoginValues {
  password: string;
  remember?: boolean;
  identifier: string;
  phonePrefix?: string;
}

export interface RegisterUserValues {
  fullname: string;
  password: string;
  username: string;
  identifier: string;
  phonePrefix?: string;
}

export interface VerifyAccountValues {
  code: number | string;
  email?: string;
}
