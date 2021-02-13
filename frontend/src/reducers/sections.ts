const sectionsReducer = (state = [], action: any): any => {
    switch (action.type) {
        case "ALTER_SECTIONS":
            return action.sections;
        case "CLEAR_SECTIONS":
            return [];
        default:
            return [];
    }
};

export default sectionsReducer;
