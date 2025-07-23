import { ReactNode } from "react";
import { Effect } from "react-lazy-load-image-component";
import { GameParams, GameReviewsParams } from "./general.type";
import {
  FormDataType,
  LoginHelpDataType,
  VerifyCodeInputMetadata,
} from "./data.type";
import {
  CreateUserValues,
  LoginHelpValues,
  LoginValues,
  VerifyCodeValues,
} from "./page.type";

// Auth
export type AuthFormName = "login" | "register";

export interface AuthFormValuesTypes {
  identifier: string;
  password: string;
  username: string;
  fullname: string;
  phonePrefix: string;
}

export interface AuthFormProps {
  onSubmit: (values: AuthFormValuesTypes) => Promise<void>;
  nameForm: AuthFormName;
}

export interface FormProps {
  listForm: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  defaultValues?: any;
  data?: any;
  files?: any;
  setFiles?: any;
  hasProvider?: boolean;
}

export interface LoginHelpFormProps {
  metadata: LoginHelpDataType;
  onSubmit: (values: LoginHelpValues) => Promise<void>;
}

export interface LoginFormProps {
  onSubmit: (values: LoginValues) => Promise<void>;
}

export interface RegisterFormProps {
  onSubmit: (values: CreateUserValues) => Promise<void>;
}

export interface VerifyCodeFormProps {
  onSubmit: (values: VerifyCodeValues) => Promise<void>;
  resendCodeHandler: () => Promise<void>;
  data: FormDataType<VerifyCodeInputMetadata>;
}

export interface FormListItem {
  name: string | any;
  iconName: string;
  type: string;
  label: string;
  linkTo: string;
  btnTxt: string;
  formType: string;
  formName: string;
  formTitle: string;
  footerLink: string;
  footerTitle: string;
  description: string;
  item: string | undefined;
  props: {
    type: string;
    placeholder: string;
    disabled: boolean | undefined;
  };
}

export interface FormTemplateProps {
  data?: any;
  schema: any;
  onSubmit: (values: any) => Promise<void>;
  defaultValues?: any;
  resendCodeHandler?: any;
}

export interface OTPCodeFormProps {
  data: any;
  onSubmit: any;
  resendCodeHandler: any;
}

// Browse
export interface FilterByProps {
  filterName: string;
  searchParamName: string;
  filterList: {
    id: string;
    name: string;
    slug?: string;
    platforms?: {
      id: number;
      name: string;
      slug: string;
      games_count: string;
      image_background: string;
      image: string | null;
      year_end: string | null;
      year_start: string | null;
    }[];
    image_background?: string;
    games_count?: number;
    games?: {
      added: number;
      id: number;
      name: string;
      slug: string;
    }[];
    value?: number;
  }[];
  width: string;
  onClosePopover: () => void;
}

// Card
export interface GenreCardProps {
  genreId: number;
  genreName: string;
  genreImg: string;
  genreCount: string;
}

export interface MediaCardProps {
  game: GameParams;
}

export interface TopPlayCardProps {
  key: number;
  item: GameParams;
  imageDims: string;
  listDivider: boolean;
}

// Cart
type SetQuantitiesType = (
  value:
    | { [id: string]: number }
    | ((prev: { [id: string]: number }) => { [id: string]: number })
) => void;

export interface CartBodyProps {
  cart: GameParams[];
  isEditing: boolean;
  setQuantities: SetQuantitiesType;
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
  setQuantities: SetQuantitiesType;
  selections: number[];
  cartItems: GameParams[];
  quantities: { [id: string]: number };
  setSelections: (selections: number[]) => void;
  setSelectedHeaderOpen: (selectedHeaderOpen: boolean) => void;
}

// Checkout
export interface CheckoutPaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
}

export interface CheckoutHeaderPorps {
  closeCheckoutHandler: () => void;
}

export interface CheckoutBodyProps {
  totalPrice: string;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
}

export interface CartCheckoutPorps {
  cartItems: GameParams[];
  quantities: { [id: string]: number };
  setOpenSwitch: (openSwitch: boolean) => void;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
}

export interface CheckoutMomoFormPorps {
  totalPrice: string;
}

export interface CheckoutCardFormProps {
  totalPrice: string;
}

// Common

export interface ErrorFormMessageProps {
  errorMessage?: { message: string } | any;
}

export interface PlatformIconListProps {
  className?: string;
  platforms: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface PublisherList {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface DeveloperListProps {
  developers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  publishers: PublisherList[];
}

export interface PublisherListPorps {
  publishers: PublisherList[];
}

export interface ReadMoreProps {
  className?: string;
  limitTextLength: number;
  children: string;
}

export interface StarRatingProps {
  star: number;
  maxStar: number;
}

// Discover
export interface GamesSwiperProps {
  sectionName: string;
  titleName: string;
  dateParam?: string;
  orderingParam?: string;
  swiperType?: string;
}

// GameDetail
export interface GameTabDetailProps {
  gameDetail: GameParams;
  gameReviews: GameReviewsParams[] | any;
}

export interface GameTabReviewsProps {
  gameReviews: GameReviewsParams[];
}

export interface ReviewContentProps {
  type: string;
  gameReviews: GameReviewsParams[];
}

// Profile
export interface ChangePasswordValues {
  newPassword: string;
  currentPassword: string;
  confirmNewPassword: string;
}

export interface EditProfileValues {
  username: string;
}

export interface ProfileDropdownMenuProps {
  hidden: () => void;
}

// Section
export interface MediaSectionProps {
  title: string;
  subTitle: string;
  enableTitle?: boolean;
  gridNumber?: 2 | 3 | 4 | 5 | 6;
  skeletonItemNumber?: number;
  gameList?: GameParams[] | any;
}

export interface TopPlaySectionProps {
  imageDims?: string;
  enableTitle?: boolean;
  listDivider?: boolean;
  skeletonItemNumber?: number;
  gameList: GameParams[] | any;
}

// Skeleton
export interface HeaderBannerSkeletonProps {
  type: string;
}

export interface MediaCardSkeletonProps {
  number: number;
}

export interface SkeletonProps {
  className: string;
  children?: ReactNode;
}

export interface TitleSkeletonProps {
  type?: string;
}

export interface TrackCardSkeletonProps {
  type?: string;
  number: number;
  imageDims?: any;
}

// UI
export interface EmailOrPhoneButtonProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export interface ShowMoreButtonProps {
  className?: string;
  onClick?: () => void;
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
  labelIcon?: string;
  className?: string;
  disabled?: boolean;
  tooltipTitle?: string;
  iconClassName?: string;
  labelIconClassName?: string;
  isSubmitting?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type IconsMap = {
  [key: string]: any;
};

export interface IconParams {
  props?: any;
  name: string;
  onClick?: () => void;
  size?: number;
  className?: string;
}

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
  width?: number | string;
  imgUrl?: string;
  height?: number | string;
  styles?: string;
  effect?: Effect;
  onClick?: () => void;
}

export interface OverlayProps {
  isOpen: boolean;
  handleIsOpen: any;
  className?: string;
}

export interface TabProps {
  // tabData: any;
  currentTab: string;
  tabs: { id: string; name: string }[];
  setCurrentTab: (currentTab: string) => void;
}

export interface TitleProps {
  name: string;
  type: string;
  desc?: string;
  color?: string;
  divider?: boolean;
  className?: string;
}

export interface DeleteProfileValues {
  confirmDelete: string;
}

export type ModalDefaultStyles = {
  body?: object;
  mask?: object;
  footer?: object;
  header?: object;
};

export interface FormRedirectProps {
  formName: string;
  toFormName?: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
  resendCodeHandler?: () => void;
  otherLink?: {
    otherLinkName: string;
    otherLinkPName: string;
    otherLinkTo: string;
  };
}

export interface ScrollToTopProps {
  children: ReactNode;
}

// Other Component
export interface LanguageProps {
  onSelectLanguage: (language: string) => void;
  setOpen: (open: boolean) => void;
}

export interface NotificationProps {
  id: number;
  time: string;
  content: string;
}
