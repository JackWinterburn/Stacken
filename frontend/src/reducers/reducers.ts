import isLoggedInReducer from "./isLoggedIn";
import sectionsReducer from "./sections";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    sections: sectionsReducer,
});

export default allReducers;
