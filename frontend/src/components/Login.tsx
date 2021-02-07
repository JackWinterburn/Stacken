import { useState } from "react";
import { login } from "../api/login";
import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Heading,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { Redirect } from "react-router";
import { useCookies } from "react-cookie";

function Login() {
    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookie] = useCookies(["authToken"]);

    return redirect ? (
        <Redirect to="/main" />
    ) : (
        <div style={{ width: "60%", margin: "auto" }}>
            <h1>Login</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const { successful, tkkey, value } = await login(
                        email,
                        password
                    );

                    if (successful) {
                        let d = new Date();
                        d.setDate(d.getDate() + 10);
                        setCookie("authToken", value, {
                            path: "/",
                            expires: d,
                        });

                        setRedirect(true);
                    }
                }}
            >
                <VStack m="1rem auto 1rem auto">
                    <Input
                        placeholder="e-mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />

                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            name="password"
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
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
