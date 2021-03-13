import { useState } from "react"
import {
    Heading,
    Input, 
    FormControl,
    Box,
    FormLabel,
    Flex,
    Button,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react"
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons"
import { Redirect, Link } from "react-router-dom"
import { register } from "../../api/register"
import { emailErrorToast, accountSuccessfullyCreatedToast } from "./ToastMessages"

import "../../Scss/Register.scss"

function Register() {
    const [show, setShow] = useState(false) // hide or show the password input
    const [redirect, setRedirect] = useState(false) // redirect to login once registered
    const [isLoading, setIsLoading] = useState(false) // isLoading state for the form submit button
    const [inputState, setInputState] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputState({
            ...inputState,
            [e.target.type]: e.target.value
        })
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        e.preventDefault();
        const response = await register(inputState)
        
        setTimeout(() => setIsLoading(false), 500)

        // Checking for Registration Errors
        if (response.Severity === "ERROR") {
            return emailErrorToast()
        }
        else {
            setRedirect(true)
            return accountSuccessfullyCreatedToast()
        }
    }

    return (
        redirect ? 
        <Redirect to="/login" />
        :
        <Flex width="full" align="center" justifyContent="center" mt="6">
                <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <Box textAlign="center">
                    <Heading>Register</Heading>
                    </Box>

                    <Box my={4} textAlign="left">
                    <form onSubmit={onSubmit}>
                        {/* Username */}
                        <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input onChange={handleChange} type="name" placeholder="John Doe" />
                        </FormControl>

                        {/* Email */}
                        <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input onChange={handleChange} type="email" placeholder="test@example.com" />
                        </FormControl>

                        {/* Password */}
                        <FormControl mt={6} isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                        <Input onChange={handleChange} type={show ? "text" : "password" } placeholder="*******" />
                        <InputRightElement w="3rem">
                        <Button onClick={() => setShow(!show)} size="sm" h="1.5rem">
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                        </InputRightElement>
                        </InputGroup>
                        </FormControl>

                        <Button isLoading={isLoading} colorScheme="blue" variant="outline" width="full" mt={4} type="submit">
                        Create account
                        </Button>
                    </form>
                    </Box>

                    <p className="footnote">
                    Already have an account?
                    <Link className="login-link" to="/login"> Log in</Link>
                    </p>
                </Box>
            </Flex>
    )
}

export default Register
