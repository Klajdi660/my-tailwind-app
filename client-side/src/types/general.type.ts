/* components/UI */
export interface TitleProps {
  desc?: string;
  divider?: boolean;
  className?: string;
  color?: string;
  name: string;
  type: string;
}
/* */

/* constants */
export type FontSizesMap = {
  [key: string]: string;
};
/* */

export interface TemplateProps {
  // title: string;
  // description: string;
  // formType: string;
  // btnText?: string | any;
  defaultValues?: any;
  lists: any;
  onSubmit: any;
  schema: any;
}
//

// component UI
export interface IconParams {
  className?: string;
  name: string;
  props?: any;
  size?: number;
}

export type IconsMap = {
  [key: string]: any;
};

// tab
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
//
