import { useState } from "react";
import { register } from "../api/register";
import { Redirect } from "react-router-dom";
import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Heading,
    VStack,
    useToast,
} from "@chakra-ui/react";

function Register() {
    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toast = useToast();
    return redirect ? (
        <Redirect to="/login" />
    ) : (
        <div style={{ width: "60%", margin: "auto" }}>
            <Heading>Register Page</Heading>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register(username, email, password).then((successful) => {
                        if (successful) {
                            setRedirect(true);
                        } else {
                            return toast({
                                title: "Oops...",
                                description:
                                    "There was a problem when creating your account.",
                                status: "error",
                                duration: 40000,
                                isClosable: true,
                            });
                        }
                    });
                }}
            >
                <VStack m="1rem auto 1rem auto">
                    <Input
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShow(!show)}
                            >
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>
                <Button colorScheme="blue" type="submit">
                    Create Account
                </Button>
            </form>
        </div>
    );
}

export default Register;
