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

export const alterSections = (
    sections: any[]
): { type: string; sections: any[] } => {
    return {
        type: "ALTER_SECTIONS",
        sections,
    };
};

export const alterDecks = (decks: any[]): { type: string; decks: any[] } => {
    return {
        type: "ALTER_DECKS",
        decks,
    };
};
