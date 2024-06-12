import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slice";
import themeReducer from "./theme.slice";
import rememberMeReducer from "./remember.slice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPefix: "redux-",
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  rememberMe: rememberMeReducer,
  theme: themeReducer,
});

export { rootPersistConfig, rootReducer };
