export type TitleMap = {
  [key: string]: string;
};

export type FormListMap = {
  [key: string]: any;
};

export interface FormListItem {
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
  lists: FormListItem[] | any;
  onSubmit?: any;
  schema?: any;
  setFiles?: any;
  user?: any;
}
