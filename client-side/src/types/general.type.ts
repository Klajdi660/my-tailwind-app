// auth 
export type TitleMap = {
  [key: string]: string;
};

export type FormListMap = {
  [key: string]: any;
};

export interface TitleProps {
  name: string;
  desc: string;
  type: string;
  divider?: boolean;
  className?: string;
  color?: string;
};

export type FontSizesMap = {
  [key: string]: string;
};
export interface TemplateProps {
  title?: string;
  description?: string;
  formType: string;
}; 
// 

// component UI
export interface IconParams {
  name: string;
  size?: number;
  className?: string;
  props?: any;
};

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

export interface SearchParamOptions {};

export interface QueryOptions {
  language: string;
  page?: number;
  limit?: number;
};

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export interface Error {
  response: {
    data: {
      message: string;
    }
  };
};
