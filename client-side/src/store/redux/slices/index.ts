import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slice";
import themeReducer from "./theme.slice";
import rememberMeReducer from "./remember.slice";
import userReducer from "./user.slice";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   keyPefix: "redux-",
//   whitelist: ["auth"],
// };

const rootPersistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer,
  user2: userReducer,
  rememberMe: rememberMeReducer,
  theme: themeReducer,
});

export { rootPersistConfig, rootReducer };
