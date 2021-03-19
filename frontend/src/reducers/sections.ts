export const sections = (state = [], action: {type: "ALTER_SECTIONS" | "CLEAR_SECTIONS", payload: any[]}): any => {
    switch (action.type) {
        case "ALTER_SECTIONS":
            return action.payload
        case "CLEAR_SECTIONS":
            return []
        default:
            return state
    }
}