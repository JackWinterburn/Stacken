import Header from "./Components/Header"
import Login from "./Components/Login"
import Logout from "./Components/Logout"
import Register from "./Components/Register"
import Main from "./Components/Main"
import { 
    BrowserRouter as Router,
    Route,
    Switch, 
} from "react-router-dom"
import { useDispatch } from "react-redux"
import { signin, signout } from "./actions"

function App() {
    const dispatch = useDispatch()
    
    if (document.cookie === "") dispatch(signout())
    else dispatch(signin())

    return (
        <>
            <Router>
                <Header />

                {/* TODO: Move the Switch into its own component */}
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
        </>
    );
}

export default App;
