import { createContext, useState } from "react";
import moment from "moment-timezone";
import { useAuth } from "../hooks";
import {
  ProviderProps,
  StoreContextType,
  TranslationsResponse,
} from "../types";

const initialState: StoreContextType = {
  userStore: {},
  setUserStore: (userStore) => {},
  loading: false,
  setLoading: (loading) => {},
  selectedTimeZone: "",
  setSelectedTimeZone: (selectedTimeZone) => {},
  timeZones: [],
  usersTimeZone: "",
  lang: "",
  setLang: (lang) => {},
  translations: {},
  setTranslations: (translations) => {},
};

const StoreContext = createContext(initialState);

const StoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [lang, setLang] = useState<string>("en");
  const [userStore, setUserStore] = useState<Object>({});
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [translations, setTranslations] = useState<TranslationsResponse>({});

  let timeZones = moment.tz.names();
  let usersTimeZone = moment.tz.guess();

  return (
    <StoreContext.Provider
      value={{
        ...initialState,
        user,
        userStore,
        setUserStore,
        loading,
        setLoading,
        selectedTimeZone,
        setSelectedTimeZone,
        timeZones,
        usersTimeZone,
        lang,
        setLang,
        translations,
        setTranslations,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
