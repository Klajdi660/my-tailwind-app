/* components/UI */
export interface TitleProps {
  name: string;
  desc?: string;
  type: string;
  divider?: boolean;
  className?: string;
  color?: string;
}
/* */

/* constants */
export type FontSizesMap = {
  [key: string]: string;
};
/* */

export interface TemplateProps {
  title: string;
  description: string;
  formType: string;
  btnText?: string | any;
}
//

// component UI
export interface IconParams {
  name: string;
  size?: number;
  className?: string;
  props?: any;
}

export type IconsMap = {
  [key: string]: any;
};

// tab
export interface TabProps {
  tabData: any;
  field: string;
  setField: (tab: any) => void;
}

export interface TabMap {
  id: number;
  tabName: string;
  type: string;
}
//
