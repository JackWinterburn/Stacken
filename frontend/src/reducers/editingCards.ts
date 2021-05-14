import { Card } from "../types"

export const editingCards = (state = [], action: {type: "ALTER_EDITING_CARDS" | "CLEAR_EDITING_CARDS", payload: Card[]}): Card[] => {
    switch (action.type) {
        case "ALTER_EDITING_CARDS":
            return action.payload
        case "CLEAR_EDITING_CARDS":
            return []
        default:
            return state
    }
}