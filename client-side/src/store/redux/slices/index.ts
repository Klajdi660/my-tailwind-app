import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPefix: 'redux-',
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer
});

export { rootPersistConfig, rootReducer };