import { isLoggedIn } from "./isLoggedIn"
import { combineReducers } from "redux"

const allReducers = combineReducers({
    isLoggedIn
})

export default allReducers