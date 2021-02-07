import isLoggedInReducer from "./isLoggedIn";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
});

export default allReducers;
