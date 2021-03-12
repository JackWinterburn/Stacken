import { useState } from "react"
import {
    Container,
    Heading,
    VStack,
    Input, 
    InputRightElement, 
    InputGroup,
    Button,
} from "@chakra-ui/react"
import { Redirect, Link } from "react-router-dom"
import { register } from "../../api/register"
import { emailErrorToast, accountSuccessfullyCreatedToast } from "./ToastMessage"

import "../../Scss/Register.scss"

function Register() {
    const [show, setShow] = useState(false) // hide or show the password input
    const [redirect, setRedirect] = useState(false) // redirect to login once registered
    const [inputState, setInputState] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await register(inputState)
        
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
        <Container className="container">
            <Heading as="h1">Register page</Heading>

                <VStack className="input-field">
                    <form onSubmit={onSubmit}>
                        {/* Username */}
                        <Input
                            placeholder="Enter a username"
                            name="name"
                            value={inputState.name}
                            onChange={handleChange}
                            mb="0.5rem"
                            type="text"/>

                        {/* E-mail */}
                        <Input
                            placeholder="Enter your email address"
                            name="email"
                            value={inputState.email}
                            onChange={handleChange}
                            mb="0.5rem"
                            type="email"/>

                        {/* Password */}
                        <InputGroup className="input-group">
                            <Input
                                placeholder="Enter a password" 
                                name="password"
                                value={inputState.password}
                                onChange={handleChange}
                                mb="0.5rem"
                                type={show ? "text" : "password"}/>

                            <InputRightElement
                                className="passwd-show-btn">
                                <Button
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                    >
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button 
                            bg="blue.300"
                            type="submit">
                            Create Account
                        </Button>
                    </form>

                    <p className="footnote">
                        Already have an account?
                        <Link className="login-link" to="/login"> Login</Link>
                    </p>
                </VStack>
        </Container>
    )
}

export default Register
