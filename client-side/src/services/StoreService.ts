import { useContext } from "react";
import { HttpClient } from "../client";
import { useStore, useNotification } from "../hooks";
import { StoreContext } from "../contexts";
import { Translations } from "../types";

export const useStoreService = () => {
  const { userStore } = useStore();
  const [notify] = useNotification();
  const { translations, setTranslations } = useContext(StoreContext);

  const getTranslationsFile = async (lang: any) => {
    let url = `http://localhost/boot/front/face/langs/current/lang_${lang}.json`;
    try {
      const response = await HttpClient.get<Translations>(url);
      setTranslations(response);
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "url not found or file has error",
      });
      console.error(`getTranslationsFile error: ${error}`);
    }
  };

  const _ = (w: string): string => (translations[w] ? translations[w] : w);

  return { userStore, _, getTranslationsFile };
};
