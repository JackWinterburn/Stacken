import { Deck } from "../types"

export const decks = (state = [], action: {type: "ALTER_DECKS" | "CLEAR_DECKS", payload: Deck[]}): Deck[] => {
    switch (action.type) {
        case "ALTER_DECKS":
            return action.payload
        case "CLEAR_DECKS":
            return []
        default:
            return state
    }
}