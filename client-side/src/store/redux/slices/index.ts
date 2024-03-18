import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slice";
import themeReducer from "./theme.slice";
import globalLoadingReducer from "./globalLoading.slice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPefix: "redux-",
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  globalLoading: globalLoadingReducer,
});

export { rootPersistConfig, rootReducer };
