import { createContext, useState } from "react";
import moment from "moment-timezone";
import { useAuth } from "../hooks";
import {
  ProviderProps,
  StoreContextType,
  TranslationsResponse,
} from "../types";

const initialState: StoreContextType = {
  lang: "",
  currency: "",
  userStore: {},
  timeZones: [],
  shippingTo: "",
  loading: false,
  translations: {},
  usersTimeZone: "",
  selectedTimeZone: "",
  setLang: (lang) => {},
  setLoading: (loading) => {},
  setCurrency: (currency) => {},
  setUserStore: (userStore) => {},
  setShippingTo: (shippingTo) => {},
  setTranslations: (translations) => {},
  setSelectedTimeZone: (selectedTimeZone) => {},
};

const StoreContext = createContext(initialState);

const StoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [lang, setLang] = useState<string>("al");
  const [currency, setCurrency] = useState<string>("");
  const [userStore, setUserStore] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [shippingTo, setShippingTo] = useState<string>("Albania");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");
  const [translations, setTranslations] = useState<TranslationsResponse>({});

  let timeZones = moment.tz.names();
  let usersTimeZone = moment.tz.guess();

  return (
    <StoreContext.Provider
      value={{
        ...initialState,
        user,
        lang,
        loading,
        currency,
        timeZones,
        userStore,
        shippingTo,
        translations,
        usersTimeZone,
        selectedTimeZone,
        setLang,
        setLoading,
        setCurrency,
        setUserStore,
        setShippingTo,
        setTranslations,
        setSelectedTimeZone,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
