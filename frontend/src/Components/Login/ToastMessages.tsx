import { createStandaloneToast } from "@chakra-ui/react"

export function emailErrorToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            description: "Email address not found.",
            status: "error",
            duration: 5000,
            isClosable: true,
        })
    )
}

export function passwordErrorToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            description: "Incorrect password.",
            status: "error",
            duration: 5000,
            isClosable: true,
        })
    )
}

export function loginSuccessToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            title: "😀",
            description: "Log in was successfull.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    )
}