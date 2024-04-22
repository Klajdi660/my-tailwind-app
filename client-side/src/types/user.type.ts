export interface User {
  // auths?: string;
  avatar?: string;
  email?: string;
  extra?: any;
  id: string;
  name?: string;
  provider?: string;
  username?: string;
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

// components
export interface LoginUserInput {
  password: string;
  remember: boolean;
  username: string;
}

export interface RegisterUserInput {
  email: string;
  fullname: string;
  password: string;
  // passwordConfirm: string;
  username: string;
}

export interface CustomButtonProps {
  username: string;
  htmlType: string;
  styles: string;
  title: string;
  type: string;
}

export interface IconProps {
  className?: string;
  disabled?: boolean;
  handleClick?: () => void;
  imgUrl?: string;
  isActive?: string;
  name?: string | any;
  styles?: string;
  type?: string;
}
//

export type SocialLoginInputType = {
  access_token: string;
  provider: string;
};

export interface ResetPasswordUserInput {
  email: string;
  password: string;
  token: string;
}

export interface ChangePasswordUserInput {
  newPassword: string;
  oldPassword: string;
}

export interface PasswordChangeResponse {
  message: string;
  success: boolean;
}

export interface AuthResponse2 {
  data: {
    [lToken: string]: string;
    rToken: string;
    sToken: string;
    // user: User;
  };
}
export interface AuthResponse {
  // data: {
  [lToken: string]: string;
  rToken: string;
  sToken: string;
  // user: User;
  // };
  // error: boolean,
  // message: string;
  // meta: [];
}
// export interface UsersDataType {
//   birthday: string;
//   city: string;
//   country: string;
//   createdAt: string;
//   extra: any;
//   first_name: string;
//   gender: string;
//   id: number;
//   key: number;
//   last_name: string;
//   newsletter: number;
//   offers_mail: number;
//   phone_nr: string;
//   postal_code: string;
//   street: string;
//   updatedAt: string;
//   username: string;
//   user_confirmed: number;
//   user_id: string;
// }
// export interface UsersResponse {
//   data: Array<UsersDataType>;
//   error: boolean;
//   meta: any;
//   msg: string;
// }
// export interface UserDetailsResponse {
//   data: UsersDataType;
//   error: boolean;
//   msg: string;
// }

export interface OTPResponse {
  id: string;
  is_contact_exist: boolean;
  message: string;
  phone_number: string;
  provider: string;
  success: boolean;
}

export interface VerifyOtpInputType {
  code: string;
  otp_id: string;
  phone_number: string;
}

export interface OtpLoginInputType {
  code: string;
  email?: string;
  name?: string;
  otp_id: string;
  phone_number: string;
}

export interface OTPVerifyResponse {
  message: string;
  success: string;
}

export interface CreateContactUsInput {
  description: string;
  email: string;
  name: string;
  subject: string;
}
