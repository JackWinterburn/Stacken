import { isLoggedIn } from "./isLoggedIn"
import { sections } from "./sections"
import { combineReducers } from "redux"

const allReducers = combineReducers({
    isLoggedIn,
    sections
})

export default allReducers