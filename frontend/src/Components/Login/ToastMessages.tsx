import { createStandaloneToast } from "@chakra-ui/react"

export function emailErrorToast() {
    const toast = createStandaloneToast({ colorMode: "dark" })

    return (
        toast({
            description: "Email address not found.",
            status: "error",
            variant: "subtle",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
            
        })
    )
}

export function passwordErrorToast() {
    const toast = createStandaloneToast({ colorMode: "dark" })

    return (
        toast({
            description: "Incorrect password.",
            status: "error",
            variant: "subtle",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
        })
    )
}

export function loginSuccessToast() {
    const toast = createStandaloneToast({ colorMode: "dark" })

    return (
<>
      {  toast({
            description: "Log in was successfull.",
            status: "success",
            variant: "subtle",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
        })
    }
        </>
)}