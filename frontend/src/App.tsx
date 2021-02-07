import React from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Flex, Link as Clink } from "@chakra-ui/react";
import Login from "./components/Login";
import Home from "./components/Home";
import Main from "./components/Main";
import Register from "./components/Register";
import Logout from "./components/Logout";

function App() {
    // const counter = useSelector((state: RootStateOrAny) => state.counter);
    const dispatch = useDispatch();

    return (
        <Router>
            <div className="app">
                <nav
                    style={{
                        borderBottom: "1px solid #eee",
                        marginBottom: "3rem",
                    }}
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
                                <Link to="/main">Main</Link>
                            </li>
                        </Flex>
                    </ul>
                </nav>
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
                <Route path="/main">
                    <Main />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
