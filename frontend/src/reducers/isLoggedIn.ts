const isLoggedInReducer = (state = false, action: any): any => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        default:
            return false;
    }
};

export default isLoggedInReducer;
