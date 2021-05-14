import { isLoggedIn } from "./isLoggedIn"
import { sections } from "./sections"
import { combineReducers } from "redux"
import { decks } from "./decks"
import { editingCards } from "./editingCards"

const allReducers = combineReducers({
    isLoggedIn,
    sections,
    decks,
    editingCards
})

export default allReducers