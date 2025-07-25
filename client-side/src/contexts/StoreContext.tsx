import moment from "moment-timezone";
import { createContext, FC, useState } from "react";
import {
  ProviderProps,
  StoreContextType,
  TranslationsResponse,
} from "../types";
import { useAppSelector } from "../store";

const initialState: StoreContextType = {
  lang: "",
  modals: {},
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
  setModalOpen: () => {},
  closeAllModals: () => {},
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
  serviceResponse: {},
  setServiceResponse: () => {},
};

const StoreContext = createContext(initialState);

const StoreProvider: FC<ProviderProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const [lang, setLang] = useState<string>("en");
  const [currency, setCurrency] = useState<string | null>(null);
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
  const [serviceResponse, setServiceResponse] = useState({});

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
        modals,
        loading,
        currency,
        timeZones,
        userStore,
        openSwitch,
        shippingTo,
        toggleMenu,
        toggleSearch,
        userLangData,
        translations,
        usersTimeZone,
        serviceResponse,
        selectedTimeZone,
        isUpdatingProfileImg,
        setLang,
        setLoading,
        setCurrency,
        setUserStore,
        setModalOpen,
        setToggleMenu,
        setShippingTo,
        setOpenSwitch,
        closeAllModals,
        setToggleSearch,
        setTranslations,
        setUserLangData,
        setServiceResponse,
        setSelectedTimeZone,
        setIsUpdatingProfileImg,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
