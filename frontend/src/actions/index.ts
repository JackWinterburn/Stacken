export const signin = (): { type: string } => {
    return {
        type: "SIGN_IN",
    };
};

export const signout = (): { type: string } => {
    return {
        type: "SIGN_OUT",
    };
};

export const alterSections = (payload: any[]): { type: string, payload: any[] } => {
    return {
        type: "ALTER_SECTIONS",
        payload
    }
}

export const alterDecks = (payload: any[]): { type: string, payload: any[] } => {
    return {
        type: "ALTER_DECKS",
        payload
    }
}

export const clearDecks = (): { type: string, payload: any[] } => {
    return {
        type: "CLEAR_DECKS",
        payload: []
    }
}

export const resetDecks = (): { type: string, payload: any[] } => {
    return {
        type: "RESET_DECKS",
        payload: [{
            ID: 0,
            CreatedAt: "DEFAULT",
            UpdatedAt: "DEFAULT",
            DeletedAt: "DEFAULT",
            Title: "DEFAULT",
            SectionID: 0,
            Cards: null
        }]
    }
}

export const alterEditingCards = (payload: any[]): { type: string, payload: any[] } => {
    return {
        type: "ALTER_EDITING_CARDS",
        payload
    }
}

export const clearEditingCards = (): { type: string, payload: any[] } => {
    return {
        type: "CLEAR_EDITING_CARDS",
        payload: []
    }
}