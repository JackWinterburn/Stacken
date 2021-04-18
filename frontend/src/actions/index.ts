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