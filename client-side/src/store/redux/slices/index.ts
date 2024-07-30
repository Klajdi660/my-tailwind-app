import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slice";
import cancelDeleteAccountReducer from "./cancelDeleteAccount.slice";
import rememberMeReducer from "./remember.slice";
import themeReducer from "./theme.slice";
import userReducer from "./user.slice";
import cartReducer from "./gameCart.slice";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   keyPefix: "redux-",
//   whitelist: ["auth"],
// };

const rootPersistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user2: userReducer,
  theme: themeReducer,
  rememberMe: rememberMeReducer,
  cancelDeleteAccount: cancelDeleteAccountReducer,
});

export { rootPersistConfig, rootReducer };
