import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Flex, Link as Clink } from "@chakra-ui/react";
import Login from "./Login";
import Home from "./Home";
import Main from "./Main";
import Register from "./Register";
import Logout from "./Logout";
import DarkModeSwitch from "./DarkModeSwitch";
import DecksView from "./DecksView";

export default function Header() {
    return (
        <Router>
            <div className="app">
                <nav
                    style={{
                        width: "100%",
                        padding: "1rem",
                    }}
                >
                    <Flex
                        flexDir="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <ul style={{ listStyleType: "none" }}>
                            <Flex>
                                <li>
                                    <Clink mr="8">
                                        <Link to="/">Home</Link>
                                    </Clink>
                                </li>
                                <li>
                                    <Clink mr="8">
                                        <Link to="/login">Login</Link>
                                    </Clink>
                                </li>
                                <li>
                                    <Clink mr="8">
                                        <Link to="/logout">Logout</Link>
                                    </Clink>
                                </li>
                                <li>
                                    <Clink mr="8">
                                        <Link to="/register">Register</Link>
                                    </Clink>
                                </li>
                                <li>
                                    <Clink>
                                        <Link to="/main">Main</Link>
                                    </Clink>
                                </li>
                            </Flex>
                        </ul>
                        <DarkModeSwitch />
                    </Flex>
                </nav>
                <hr
                    style={{
                        marginBottom: "2rem",
                    }}
                />
            </div>

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/main">
                    <Main />
                </Route>
                <Route path="/main/:id">
                    <DecksView />
                </Route>
            </Switch>
        </Router>
    );
}
