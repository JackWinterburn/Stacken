import {
    emailErrorToast,
    passwordErrorToast,
} from "./ToastMessages"
import { ColorMode } from "@chakra-ui/react"

export function loginErrorFeedback(msg: string, colorMode: ColorMode) {
    switch (msg) {
        case "Incorrect Password":
            return passwordErrorToast(colorMode)
        case "Email address not found":
            return emailErrorToast(colorMode)
        default:
            return
    }
}