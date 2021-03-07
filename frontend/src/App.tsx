import Header from "./Components/Header"
import Login from "./Components/Login"
import Logout from "./Components/Logout"
import Register from "./Components/Register"
import Main from "./Components/Main"

import { Container } from "@chakra-ui/react"
import { 
    BrowserRouter as Router,
    Route,
    Switch, 
    Link 
} from "react-router-dom"

function App() {
    return (
        <Container className="App">
            <Router>
                <Header />

                <Switch>
                    {/* Home page */}
                    <Route exact path="/">
                        <Main />
                    </Route>

                    {/* User and Auth routes */}
                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>

                    <Route exact path="/logout">
                        <Logout />
                    </Route>
                </Switch>
            </Router>       
        </Container>
    );
}

export default App;
