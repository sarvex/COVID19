import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer
});

const configStore = () => {
  return createStore(rootReducer);
};

export default configStore;
