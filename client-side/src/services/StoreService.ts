import { useContext } from "react";
import { HttpClient } from "../client";
import { StoreContext } from "../contexts";
import { useStore, useNotification } from "../hooks";
import { Translations } from "../types";

export const useStoreService = () => {
  const { translations, setTranslations } = useContext(StoreContext);
  const { userStore } = useStore();
  const [notify] = useNotification();

  const getTranslationsFile = async (lang: any) => {
    let url = `http://localhost/boot/front/face/langs/current/lang_${lang}.json`;
    try {
      const response = await HttpClient.get<Translations>(url);
      setTranslations(response);
    } catch (error) {
      notify({
        variant: "error",
        description: "url not found or file has error",
      });
      console.error(`getTranslationsFile error: ${error}`);
    }
  };

  const _ = (w: string): string => (translations[w] ? translations[w] : w);

  return { userStore, _, getTranslationsFile };
};
