
export const isLoggedIn = (state = false, action: {type: "SIGN_IN" | "SIGN_OUT"}): boolean => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "SIGN_OUT":
            return false;
        default:
            return false;
    }
}