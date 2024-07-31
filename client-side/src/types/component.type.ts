import { ReactNode } from "react";
import {
  GameParams,
  GameVideosParams,
  GameReviewsParams,
} from "./general.type";
export interface FormListItem {
  name: string;
  type: string;
  label: string;
  linkTo: string;
  btnTxt: string;
  formType: string;
  formName: string;
  formTitle: string;
  footerLink: string;
  footerTitle: string;
  item: string | undefined;
  props: {
    type: string;
    placeholder: string;
    disabled: boolean | undefined;
  };
}

export interface FormProps {
  files?: any;
  schema?: any;
  onSubmit?: any;
  setFiles?: any;
  defaultValues?: any;
  hasProvider?: boolean;
  lists: FormListItem[] | any;
}

export interface FormProps2 {
  user?: any;
  data?: any;
  files?: any;
  schema?: any;
  setFiles?: any;
  onSubmit?: any;
  defaultValues?: any;
  hasProvider?: boolean;
  listForm: FormListItem[] | any;
}

export interface OTPCodeFormProps {
  data: any;
  onSubmit: any;
  linkTo: string;
  btnText: string;
  footerLink: string;
  footerTitle: string;
  handleResendCode: any;
}

export interface SocialAuthProps {}

export interface TemplateProps {
  data?: any;
  schema: any;
  listForm: any;
  onSubmit: any;
  defaultValues?: any;
  handleResendCode?: any;
}

// Card
export interface MediaCardProps {
  type: string;
  game: GameParams;
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
  setQuantities: any;
  selections: number[];
  selectedHeaderOpen: boolean;
  quantities: { [id: string]: number };
  setSelections: (selections: number[]) => void;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
  setSelectedHeaderOpen: (selectedHeaderOpen: boolean) => void;
}

export interface CartEmptyPorps {
  setOpenSwitch: (openSwitch: boolean) => void;
}

export interface CartFooterProps {
  cartItems: GameParams[];
  quantities: { [id: string]: number };
  setCheckoutOpen: (checkoutOpen: boolean) => void;
}

export interface CartHeaderProps {
  cart: GameParams[];
  isEditing: boolean;
  isSelectAll: boolean;
  selections: number[];
  selectAllGameHandler: () => void;
  backCartSwitchHandler: () => void;
  cancelGameSelectedHandler: () => void;
  deleteSelectedGameHandler: () => void;
  setIsEditing: (isEditing: boolean) => void;
}

export interface CartItemProps {
  key: number;
  item: GameParams;
  imageDims: string;
  isEditing: boolean;
  setQuantities: any;
  selections: number[];
  cartItems: GameParams[];
  quantities: { [id: string]: number };
  setSelections: (selections: number[]) => void;
  setSelectedHeaderOpen: (selectedHeaderOpen: boolean) => void;
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
  className?: string;
  platforms: PlatformIconList[];
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
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface PublisherListPorps {
  publishers: PublisherList[];
}

export interface ReadMoreProps {
  className?: string;
  limitTextLength: number;
  children: React.ReactNode;
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
  type: string;
  gameReviews: GameReviewsParams[];
}

// Profile
export interface ChangePasswordProps {
  // provider: string | any;
}

export interface ChangePasswordInput {
  newPassword: string;
  currentPassword: string;
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
  gender?: string;
  address?: string;
  birthday?: string;
  phoneNumber?: string;
}

export interface UserInfoProps {}

// Section
export interface MediaSectionProps {
  type: string;
  title: string;
  subTitle: string;
  enableTitle?: boolean;
  gridNumber?: 2 | 3 | 4 | 5;
  skeletonItemNumber: number;
  gameList: GameParams[] | any;
}

export interface TopPlaySectionProps {
  imageDims?: string;
  enableTitle?: boolean;
  listDivider?: boolean;
  skeletonItemNumber?: number;
  gameList: GameParams[] | any;
}

// Sidebar
export interface SidebarPorps {}

export interface SideMenuListPorps {
  iconRef: any;
  sidebarLinks: any;
  activeLink: string;
  handleLinkClick: any;
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
  type?: string;
  number: number;
  imageDims?: any;
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
  onOk?: any;
  width?: any;
  height?: any;
  styles?: any;
  footer?: any;
  open: boolean;
  onCancel?: any;
  title?: string;
  children?: any;
  okText?: string;
  closable?: boolean;
  isMobile?: boolean;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  destroyOnClose?: boolean;
}

export type ModalDefaultStyles = {
  body?: object;
  mask?: object;
  footer?: object;
  header?: object;
};

export interface ButtonProps {
  variant:
    | "outlined"
    | "none"
    | "contained"
    | "gradient"
    | "filled"
    | "delete"
    | "upload";
  size?: number;
  label?: string;
  labelIcon?: any;
  className?: string;
  disabled?: boolean;
  tooltipTitle?: string;
  iconClassName?: string;
  // isSubmitting?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CustomButtonProps {
  activeLink: any;
  sidebarLinks: any;
  handleLinkClick: any;
}

export interface GlobalLoadingProps {}

export interface IconParams {
  props?: any;
  name: string;
  onClick?: any;
  size?: number;
  className?: string;
}

export type IconsMap = {
  [key: string]: any;
};

export interface IconButtonProps {
  size?: number;
  className?: string;
  disabled?: boolean;
  name?: string | any;
  iconClassName?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ImageProps {
  name?: string;
  width?: number;
  imgUrl: string;
  height?: number;
  styles?: string;
}

export interface ImgUploaderParams {}

export interface OverlayProps {
  isOpen: boolean;
  handleIsOpen: any;
  className?: string;
  isMobile?: boolean;
  transparent?: boolean;
  // handleIsOpen: (value: boolean) => void;
}

export interface PatternBgProps {}

export interface SocialAuthButtonProps {}

export interface TabProps {
  // tabData: any;
  currentTab: string;
  tabs: { id: string; name: string }[];
  setCurrentTab: (currentTab: string) => void;
}

export interface TabMap {
  id: number;
  type: string;
  tabName: string;
}

export interface TitleProps {
  name: string;
  type: string;
  desc?: string;
  color?: string;
  divider?: boolean;
  className?: string;
}

export interface ShowMoreButtonProps {
  className?: string;
  onClick?: () => void;
}

// Other Component
export interface CartSwitcherProps {}

export interface FooterProps {}

export interface FormFieldPorps {
  value: string;
  handleChange: any;
  inputType: string;
  labelName: string;
  placeholder: string;
  isTextArea: boolean;
}

export interface HomeFooterProps {}

export interface LanguageProps {
  onSelectLanguage: (language: string) => void;
  setOpen: (open: boolean) => void;
}

export interface LoadingPorps {}

export interface NavbarProps {}

export interface NotificationProps {
  id: number;
  time: string;
  content: string;
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
  gender: string;
  avatar: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
}

interface User {
  id: string;
  extra?: Extra;
  email?: string;
  avatar?: string;
  username?: string;
}

export interface UserMenuProps {
  user: User;
  hidden: () => void;
}
