import {
    emailErrorToast,
    passwordErrorToast,
} from "./ToastMessages"

export function loginErrorFeedback(msg: string) {
    switch (msg) {
        case "Incorrect Password":
            return passwordErrorToast()
        case "Email address not found":
            return emailErrorToast()
        default:
            return
    }
}