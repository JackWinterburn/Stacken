import { createStandaloneToast } from "@chakra-ui/react"

export function emailErrorToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            title: "Oops",
            description: "There is already another account using that email.",
            status: "error",
            duration: 5000,
            isClosable: true,
        })
    )
}

export function accountSuccessfullyCreatedToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            title: "😀",
            description: "Account created Successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    )
}