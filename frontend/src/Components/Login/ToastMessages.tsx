import { createStandaloneToast, ColorMode } from "@chakra-ui/react"

export function emailErrorToast(colorMode: ColorMode) {
    const toast = createStandaloneToast({ colorMode })

    return (
        toast({
            description: "Email address not found.",
            status: "error",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
            
        })
    )
}

export function passwordErrorToast(colorMode: ColorMode) {
    const toast = createStandaloneToast({ colorMode })

    return (
        toast({
            description: "Incorrect password.",
            status: "error",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
        })
    )
}

export function loginSuccessToast(colorMode: ColorMode) {    
    const toast = createStandaloneToast({ colorMode })

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


export function invalidFormToast() {
    const toast = createStandaloneToast()

    return (
        toast({
            description: "Please get rid of any illegal characters in your title",
            status: "error",
            position: "bottom-left",
            duration: 5000,
            isClosable: true,
        })
    )
}