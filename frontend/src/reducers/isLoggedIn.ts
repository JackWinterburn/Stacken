const isLoggedInReducer = (state: boolean, action: any): any => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "SIGN_OUT":
            return false;
        default:
            return true;
    }
};

export default isLoggedInReducer;
