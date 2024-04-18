import { createContext, useState, ReactNode } from "react";
import moment from "moment-timezone";
import { User } from "../types/user.type";
import { Translations } from "../types/language.type";
import { useAuth } from "../hooks/useAuth";

interface ProviderProps {
  children: ReactNode;
}

interface StoreContextType {
  user?: User | null;
  userStore: object;
  setUserStore: (userStore: object) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedTimeZone: string;
  setSelectedTimeZone: (selectedTImeZone: string) => void;
  timeZones: string[];
  usersTimeZone: string;
  lang: string;
  setLang: (lang: string) => void;
  translations: Translations;
  setTranslations: (translations: Translations) => void;
}

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
  const [translations, setTranslations] = useState<Translations>({});

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
