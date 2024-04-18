import { Dispatch, SetStateAction } from "react";

export interface Translations {
  [key: string]: string;
}

export interface TranslationContextType {
  (w: string): string;
}

export interface LangContextType {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
}
