import { PaginatorInfo, QueryOptions } from './general.type';

export interface User {
  id: string;
  extra?: any;
  // auths?: string;
  image?: string;
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

// components
export interface LoginUserInput {
  username: string;
  password: string;
  remember: boolean;
}

export interface RegisterUserInput {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export interface CustomButtonProps {
  htmlType: string;
  type: string;
  title: string;
  handleClick: () => void;
  styles: string;
};

export interface IconProps { 
  styles?: string;
  imgUrl?: string; 
  disabled?: boolean, 
  handleClick?: () => void;
  isActive?: string;
  name?: string | any;
  type?: string;
  className?: string;
};
// 

export type SocialLoginInputType = {
  provider: string;
  access_token: string;
};

export interface ResetPasswordUserInput {
  email: string;
  token: string;
  password: string;
}

export interface ChangePasswordUserInput {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
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
export interface UsersDataType {
  key: number;
  id: number;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_nr: string;
  gender: string;
  birthday: string;
  newsletter: number;
  offers_mail: number;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  user_confirmed: number;
  extra: any;
}
export interface UsersResponse {
  error: boolean;
  msg: string;
  meta: any;
  data: Array<UsersDataType>;
}
export interface UserDetailsResponse {
  error: boolean;
  data: UsersDataType;
  msg: string;
}

export interface OTPResponse {
  message: string;
  success: boolean;
  provider: string;
  id: string;
  phone_number: string;
  is_contact_exist: boolean;
}

export interface VerifyOtpInputType {
  phone_number: string;
  code: string;
  otp_id: string;
}

export interface OtpLoginInputType {
  phone_number: string;
  code: string;
  otp_id: string;
  name?: string;
  email?: string;
}

export interface OTPVerifyResponse {
  success: string;
  message: string;
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface RegisterQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
  'page-size': number;
}

export type RegisterPaginator = PaginatorInfo<User>;
