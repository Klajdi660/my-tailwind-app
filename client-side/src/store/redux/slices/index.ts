import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import themeReducer from "./theme";

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPefix: 'redux-',
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
});

export { rootPersistConfig, rootReducer };
