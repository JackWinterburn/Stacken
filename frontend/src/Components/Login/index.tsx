import { useState } from "react";
import {
    Heading,
    Input, 
    InputGroup,
    InputRightElement,
    FormControl,
    Box,
    FormLabel,
    Flex,
    Button,
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons"
import { Link } from "react-router-dom";
import { login } from "../../api/login";
import { storeInCookies } from "./cookieStore"
import {
    loginSuccessToast
} from "./ToastMessages"
import { loginErrorFeedback } from "./loginErrorFeedback"

import "../../Scss/Login.scss"

function Login() {
    const [show, setShow] = useState(false) // hide or show the password input
    const [isLoading, setIsLoading] = useState(false)
    const [inputState, setInputState] = useState({
        email: "",
        password: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputState({
            ...inputState,
            [e.target.type]: e.target.value
        });
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)

        const response = await login(inputState)
        // response.status is the login error indicator
        if (response.status === true){
            let authToken = response.token
            let UUID = response.user.ID
            //store JWT and user ID in cookie storage
            storeInCookies({authToken, UUID})
            setTimeout(() => setIsLoading(false), 500)
            return loginSuccessToast()
        } else {
            setTimeout(() => setIsLoading(false), 500)
            loginErrorFeedback(response.message)
        }
    }

    return (
        <>
            <Flex width="full" align="center" justifyContent="center" mt="6">
                <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <Box textAlign="center">
                    <Heading>Login</Heading>
                    </Box>

                    <Box my={4} textAlign="left">
                    <form onSubmit={onSubmit}>
                        <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input onChange={handleChange} type="email" placeholder="test@example.com" />
                        </FormControl>

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
                        Sign in
                        </Button>
                    </form>
                    </Box>
                <p className="footnote">
                    Don't have an account set up yet?
                </p>
                <Link className="register-link" to="/register"> Register</Link>
                </Box>
            </Flex>
                    
    </>
    );
};

export default Login;
