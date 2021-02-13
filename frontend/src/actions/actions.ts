export const increment = (): { type: string } => {
    return {
        type: "INCREMENT",
    };
};

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
