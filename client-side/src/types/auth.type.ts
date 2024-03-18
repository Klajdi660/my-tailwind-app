export type TitleMap = {
  [key: string]: string;
};

export type FormListMap = {
  [key: string]: any;
};

export interface FormListItem {
  type: string;
  name: string;
  label: string;
  props: {
    type: string;
    placeholder: string;
  };
  formName: string;
  formTitle: string;
  btnTxt: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
}

export interface FormProps {
  lists: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  defaultValues?: any;
  files?: any;
  setFiles?: any;
  hasProvider?: boolean;
}

export interface FormProps2 {
  lists: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  defaultValues?: any;
  files?: any;
  setFiles?: any;
  hasProvider?: boolean;
  user?: any;
}
