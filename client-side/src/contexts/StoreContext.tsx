import moment from "moment-timezone";
import { FC, createContext, useState } from "react";
import {
  ProviderProps,
  StoreContextType,
  TranslationsResponse,
} from "../types";
import { useAppSelector } from "../store";

const initialState: StoreContextType = {
  lang: "",
  currency: "",
  userStore: {},
  timeZones: [],
  shippingTo: "",
  loading: false,
  translations: {},
  userLangData: {},
  openSwitch: false,
  toggleMenu: false,
  usersTimeZone: "",
  toggleSearch: false,
  selectedTimeZone: "",
  isUpdatingProfileImg: false,
  setLang: (lang) => {},
  setLoading: (loading) => {},
  setCurrency: (currency) => {},
  setUserStore: (userStore) => {},
  setShippingTo: (shippingTo) => {},
  setOpenSwitch: (openSwitch) => {},
  setToggleMenu: (toggleMenu) => {},
  setTranslations: (translations) => {},
  setUserLangData: (userLangData) => {},
  setToggleSearch: (toggleSearch) => {},
  setSelectedTimeZone: (selectedTimeZone) => {},
  setIsUpdatingProfileImg: (isUpdatingProfileImg) => {},
  setModalOpen: () => {},
  closeAllModals: () => {},
  modals: {},
};

const StoreContext = createContext(initialState);

const StoreProvider: FC<ProviderProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const [lang, setLang] = useState<string>("en");
  const [currency, setCurrency] = useState<string>("EUR");
  const [userStore, setUserStore] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [shippingTo, setShippingTo] = useState<string>("Albania");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");
  const [translations, setTranslations] = useState<TranslationsResponse>({});
  const [userLangData, setUserLangData] = useState({});
  const [isUpdatingProfileImg, setIsUpdatingProfileImg] =
    useState<boolean>(false);
  const [openSwitch, setOpenSwitch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [modals, setModals] = useState<Record<string, boolean>>({});

  let timeZones = moment.tz.names();
  let usersTimeZone = moment.tz.guess();

  const setModalOpen = (key: string, value: boolean) => {
    setModals((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeAllModals = () => {
    setModals({});
  };

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
        userLangData,
        setUserLangData,
        isUpdatingProfileImg,
        setIsUpdatingProfileImg,
        openSwitch,
        setOpenSwitch,
        toggleMenu,
        toggleSearch,
        setToggleMenu,
        setToggleSearch,
        setModalOpen,
        closeAllModals,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
