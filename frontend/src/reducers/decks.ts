const decksReducer = (state = [], action: any): any => {
    switch (action.type) {
        case "ALTER_DECKS":
            return action.decks;
        case "CLEAR_DECKS":
            return [];
        default:
            return [];
    }
};

export default decksReducer;
