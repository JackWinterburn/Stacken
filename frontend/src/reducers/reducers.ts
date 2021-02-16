import isLoggedInReducer from "./isLoggedIn";
import sectionsReducer from "./sections";
import decksReducer from "./decks";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    sections: sectionsReducer,
    decks: decksReducer,
});

export default allReducers;
