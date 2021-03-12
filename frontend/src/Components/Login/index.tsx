import { useState } from "react";
import {
    Container,
    Heading,
    VStack,
    Input, 
    InputRightElement, 
    InputGroup,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { login } from "../../api/login";

import "../../Scss/Login.scss";

function Login() {
    const [show, setShow] = useState(false) // hide or show the password input
    const [inputState, setInputState] = useState({
        email: "",
        password: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        });
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(await login(inputState))
    }

    return (
        <Container className="container">
            <Heading as="h1">Login page</Heading>

            <VStack className="input-field">
            <form onSubmit={onSubmit}>

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
                        Login
                    </Button>

                </form>
                
                <p className="footnote">
                    Don't have an account set up yet?
                    <Link className="register-link" to="/register"> Register</Link>
                </p>
            </VStack>
        </Container>
    );
};

export default Login;
