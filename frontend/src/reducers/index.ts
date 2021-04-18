import { isLoggedIn } from "./isLoggedIn"
import { sections } from "./sections"
import { combineReducers } from "redux"
import { decks } from "./decks"

const allReducers = combineReducers({
    isLoggedIn,
    sections,
    decks
})

export default allReducers