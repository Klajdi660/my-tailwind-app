import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slice";
import themeReducer from "./theme.slice";
import cartReducer from "./gameCart.slice";
import rememberMeReducer from "./remember.slice";
import userSelectedDataReducer from "./userSelectedData.slice";
import cancelDeleteAccountReducer from "./cancelDeleteAccount.slice";
import settingCardReducer from "./settingCard.slice";
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
  user: userReducer,
  cart: cartReducer,
  userSelectedData: userSelectedDataReducer,
  theme: themeReducer,
  rememberMe: rememberMeReducer,
  cancelDeleteAccount: cancelDeleteAccountReducer,
  settingCard: settingCardReducer,
});

export { rootPersistConfig, rootReducer };
