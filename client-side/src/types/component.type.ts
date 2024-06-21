import { ReactNode } from "react";

// Auth
export interface FormListItem {
  item: string | undefined;
  btnTxt: string;
  footerLink: string;
  footerTitle: string;
  formName: string;
  formTitle: string;
  formType: string;
  label: string;
  linkTo: string;
  name: string;
  props: {
    disabled: boolean | undefined;
    placeholder: string;
    type: string;
  };
  type: string;
}

export interface FormProps {
  defaultValues?: any;
  files?: any;
  hasProvider?: boolean;
  lists: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  setFiles?: any;
}

export interface FormProps2 {
  defaultValues?: any;
  files?: any;
  hasProvider?: boolean;
  listForm: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  setFiles?: any;
  user?: any;
  data?: any;
}

export interface OTPCodeFormProps {
  btnText: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
  onSubmit: any;
  handleResendCode: any;
  data: any;
}

export interface SocialAuthProps {}

export interface TemplateProps {
  // title: string;
  // description: string;
  // formType: string;
  // btnText?: string | any;
  defaultValues?: any;
  listForm: any;
  onSubmit: any;
  schema: any;
  handleResendCode?: any;
  data?: any;
}

// Common
interface ErrorMessageParams {
  message: string;
}

export interface ErrorMessageProps {
  errorMessage?: ErrorMessageParams | any;
}

// Profile
export interface ChangePasswordProps {
  provider: string | any;
}

export interface ChangePasswordSave {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DeleteAccountProps {}

export interface EditProfileProps {}

export interface EditProfileSave {
  username: string;
  email: string;
  image: string;
}

export interface PersonalDetailsProps {}

export interface PhoneNumberValidationProps {
  value: string;
  onChange: any;
}

export interface UserInfoProps {}

// Sidebar
export interface SidebarPorps {}

export interface SideMenuListPorps {
  sidebarLinks: any;
  activeLink: string;
  handleLinkClick: any;
  iconRef: any;
}

// Skeleton
export interface HeaderBannerSkeletonProps {
  type: string;
}

export interface MediaCardSkeletonProps {
  type: string;
  number: any[];
}

export interface NavlistSkeletonProps {}

export interface SkeletonProps {
  className: string;
  children?: ReactNode;
}

export interface TitleSkeletonProps {
  type: string;
}

export type ImageDimsOptions = {
  [key: number]: string;
};

export interface TrackCardSkeletonProps {
  number: any[];
  imageDims: number;
}

// UI
export interface CartButtonProps {}

export interface DesktopToggleButtonProps {
  theme: any;
  dispatch: any;
}

export interface LanguageButtonProps {}

export interface MobileToggleButtonProps {}

export interface NotificationButtonProps {}

export interface ThemeButtonProps {
  mode: string;
  dispatch: any;
}

export interface DeleteProfileModalProps {}

export interface SmallModalProps {
  open: boolean;
  children?: any;
  footer?: any;
  title?: string;
  closable?: boolean;
  isMobile?: boolean;
  destroyOnClose?: boolean;
  onOk?: any;
  okText?: string;
  okButtonProps?: any;
  onCancel?: any;
  cancelText?: string;
  width?: any;
  bodyStyle?: any;
  cancelButtonProps?: any;
}

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  disabled?: boolean;
  className?: string;
  variant:
    | "outlined"
    | "contained"
    | "gradient"
    | "filled"
    | "delete"
    | "upload";
  labelIcon?: any;
  isSubmitting?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CustomButtonProps {
  sidebarLinks: any;
  activeLink: any;
  handleLinkClick: any;
}

export interface GlobalLoadingProps {}

export interface IconParams {
  className?: string;
  name: string;
  props?: any;
  size?: number;
}

export type IconsMap = {
  [key: string]: any;
};

export interface IconButtonProps {
  type?: "button" | "submit" | "reset";
  name?: string | any;
  size?: number;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ImageProps {
  imgUrl: string;
  name?: string;
  width?: number;
  height?: number;
  styles?: string;
}

export interface ImgUploaderParams {
  imgUrl: string;
  hasProvider?: boolean;
  imageRef?: any;
  containerDims?: string;
  borderType?: string;
  name?: string;
  username?: string;
}

export interface OverlayProps {
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
  transparent?: boolean;
  className?: string;
  isMobile?: boolean;
}

export interface PatternBgProps {}

export interface SocialAuthButtonProps {}

export interface TabProps {
  field: string;
  setField: (tab: any) => void;
  tabData: any;
}

export interface TabMap {
  id: number;
  tabName: string;
  type: string;
}

export interface TitleProps {
  desc?: string;
  divider?: boolean;
  className?: string;
  color?: string;
  name: string;
  type: string;
}

// Other Component
export interface CartSwitcherProps {}

export interface FooterProps {}

export interface FormFieldPorps {
  labelName: string;
  placeholder: string;
  inputType: string;
  isTextArea: boolean;
  value: string;
  handleChange: any;
}

export interface HomeFooterProps {}

export interface LanguageProps {
  onSelectLanguage: (language: string) => void;
}

export interface LoadingPorps {}

export interface NavbarProps {}

export interface NotificationProps {
  id: number;
  content: string;
  time: string;
}

export interface SearchbarProps {
  isMobile: boolean;
  toggleSearch: boolean;
  setToggleSearch: (value: boolean) => void;
}

export interface ShowAppProps {}

export interface TopPlayProps {}

// page profile
export interface ProfileDropdownProps {}

interface Extra {
  name: string;
}

interface User {
  id: string;
  email?: string;
  username?: string;
  avatar?: string;
  extra?: Extra;
}

export interface UserMenuProps {
  user: User;
  hidden: () => void;
}

// Card
export interface MediaCardProps {}

export interface MediaCardDetailsProps {}
