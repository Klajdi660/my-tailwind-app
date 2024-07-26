import { ReactNode } from "react";
import {
  GameParams,
  GameVideosParams,
  GameReviewsParams,
} from "./general.type";

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
  defaultValues?: any;
  listForm: any;
  onSubmit: any;
  schema: any;
  handleResendCode?: any;
  data?: any;
}

// Card
export interface MediaCardProps {
  game: GameParams;
  type: string;
}

export interface TopPlayCardProps {
  key: number;
  item: GameParams;
  imageDims: string;
  listDivider: boolean;
}

// Cart
export interface CartBodyProps {
  cart: GameParams[];
  isEditing: boolean;
  selections: number[];
  setSelections: (selections: number[]) => void;
  // setCheckoutOpen: (checkoutOpen: boolean) => void;
  quantities: { [id: string]: number };
  setQuantities: any;
}

export interface CartEmptyPorps {
  setOpenSwitch: (openSwitch: boolean) => void;
}

export interface CartFooterProps {
  setCheckoutOpen: (checkoutOpen: boolean) => void;
  cartItems: GameParams[];
  quantities: { [id: string]: number };
}

export interface CartHeaderProps {
  cart: GameParams[];
  backCartSwitchHandler: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  isSelectAll: boolean;
  selectAllGameHandler: () => void;
  cancelGameSelectedHandler: () => void;
  selections: number[];
  deleteSelectedGameHandler: () => void;
}

export interface CartItemProps {
  key: number;
  item: GameParams;
  imageDims: string;
  isEditing: boolean;
  selections: number[];
  setSelections: (selections: number[]) => void;
  quantities: { [id: string]: number };
  setQuantities: any;
}

// Common
interface ErrorFormMessageParams {
  message: string;
}

export interface ErrorFormMessageProps {
  errorMessage?: ErrorFormMessageParams | any;
}

interface PlatformIconList {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformIconListProps {
  platforms: PlatformIconList[];
  className?: string;
}

interface DeveloperList {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface DeveloperListProps {
  developers: DeveloperList[];
}

interface PublisherList {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}
export interface PublisherListPorps {
  publishers: PublisherList[];
}

export interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
  limitTextLength: number;
}

export interface StarRatingProps {
  star: number;
  maxStar: number;
}

// GameDetail
export interface GameDetailProps {
  gameDetail: GameParams;
  gameVideos: GameVideosParams;
  gameReviews: GameReviewsParams[];
}

export interface GameTabDetailProps {
  gameDetail: GameParams;
  gameReviews: GameReviewsParams[];
}

export interface GameTabReviewsProps {
  gameReviews: GameReviewsParams[];
}

export interface ReviewContentProps {
  gameReviews: GameReviewsParams[];
  type: string;
}

// Profile
export interface ChangePasswordProps {
  // provider: string | any;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DeleteAccountProps {}

export interface EditProfileProps {}

export interface EditProfileInput {
  username: string;
}

export interface PersonalDetailsProps {}

export interface PersonalDetailsInput {
  name?: string;
  birthday?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
}

export interface UserInfoProps {}

// Section
export interface MediaSectionProps {
  enableTitle?: boolean;
  gridNumber?: 2 | 3 | 4 | 5;
  type: string;
  skeletonItemNumber: number;
  gameList: GameParams[] | any;
  title: string;
  subTitle: string;
}

export interface TopPlaySectionProps {
  gameList: GameParams[] | any;
  listDivider?: boolean;
  imageDims?: string;
  skeletonItemNumber?: number;
  enableTitle?: boolean;
}

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
  number: number;
}

export interface NavlistSkeletonProps {}

export interface SkeletonProps {
  className: string;
  children?: ReactNode;
}

export interface TitleSkeletonProps {
  type?: string;
}

export type ImageDimsOptions = {
  [key: number]: string;
};

export interface TrackCardSkeletonProps {
  number: number;
  imageDims?: any;
  type?: string;
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

export interface SessionExpiredProps {}

export interface DeleteProfileProps {}

export interface DeleteProfileInput {
  confirmDelete: string;
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
  height?: any;
  styles?: any;
  cancelButtonProps?: any;
}

export type ModalDefaultStyles = {
  header?: object;
  body?: object;
  footer?: object;
  mask?: object;
};

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size?: number;
  label?: string;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  tooltipTitle?: string;
  variant:
    | "outlined"
    | "none"
    | "contained"
    | "gradient"
    | "filled"
    | "delete"
    | "upload";
  labelIcon?: any;
  // isSubmitting?: boolean;
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
  onClick?: any;
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

export interface ImgUploaderParams {}

export interface OverlayProps {
  isOpen: boolean;
  // handleIsOpen: (value: boolean) => void;
  handleIsOpen: any;
  transparent?: boolean;
  className?: string;
  isMobile?: boolean;
}

export interface PatternBgProps {}

export interface SocialAuthButtonProps {}

export interface TabProps {
  tabs: { id: string; name: string }[];
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  // tabData: any;
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

export interface ShowMoreButtonProps {
  className?: string;
  onClick?: () => void;
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
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  dateOfBirth: string;
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
