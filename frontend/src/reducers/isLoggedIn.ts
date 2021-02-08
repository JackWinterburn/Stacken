const isLoggedInReducer = (state = false, action: any): any => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "SIGN_OUT":
            return false;
        default:
            return false;
    }
};

export default isLoggedInReducer;
