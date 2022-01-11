import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import userReducer from "./slices/user";
import customerReducer from "./slices/customer";
import ordersReducer from "./slices/orders";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  order: ordersReducer,
});

export { rootPersistConfig, rootReducer };
