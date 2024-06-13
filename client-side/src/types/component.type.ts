import { ReactNode } from "react";

// Component
export interface BackgroundImageProps {
  img: string;
}

export type BgImage = {
  [key: string]: string;
};

export interface FormFieldPorps {
  labelName: string;
  placeholder: string;
  inputType: string;
  isTextArea: boolean;
  value: string;
  handleChange: any;
}

export interface LanguageProps {
  onSelectLanguage: (language: string) => void;
}

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

export interface CartSwitcherProps {}
export interface FooterProps {}
export interface HomeFooterProps {}
export interface LoadingPorps {}
export interface NavbarProps {}
export interface ShowAppProps {}
export interface TopPlayProps {}

// Auth
// export interface FormProps2 {}
export interface LoginFormProps {}
export interface ProfileDropdownProps {}
export interface SocialAuthProps {}

export interface OTPCodeFormProps {
  btnText: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
  onSubmit: any;
  handleResendCode: any;
  data: any;
}

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

export interface TemplateProps {
  // title: string;
  // description: string;
  // formType: string;
  // btnText?: string | any;
  defaultValues?: any;
  lists: any;
  onSubmit: any;
  schema: any;
  handleResendCode?: any;
  data?: any;
}

// Settings
export interface ChangePasswordProps {
  provider: string | any;
}

export interface ChangePasswordSave {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DeleteAccountProps {}

export interface EditProfileProps {
  email: string | any;
  username: string | any;
  imgUrl: string | any;
  provider: string | any;
  user: any;
}

export interface EditProfileSave {
  username: string;
  email: string;
  image: string;
}

export interface PersonalDetailsProps {}

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
export interface DesktopToggleButtonProps {
  theme: any;
  dispatch: any;
}

export interface ThemeButtonProps {
  mode: string;
  dispatch: any;
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

export interface OverlayProps {
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
  transparent?: boolean;
  className?: string;
  isMobile?: boolean;
}

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

export interface CartButtonProps {}
export interface LanguageButtonProps {}
export interface MobileToggleButtonProps {}
export interface NotificationButtonProps {}
export interface GlobalLoadingProps {}
export interface PatternBgProps {}
export interface SocialAuthButtonProps {}
