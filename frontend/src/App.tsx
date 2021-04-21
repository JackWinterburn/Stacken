import Header from "./Components/Header"
import Login from "./Components/Login"
import Logout from "./Components/Logout"
import Register from "./Components/Register"
import Main from "./Components/Main"
import DecksView from "./Components/Main/DecksView"
import CardsView from "./Components/Main/CardsView"
import { 
    BrowserRouter as Router,
    Route,
    Switch, 
} from "react-router-dom"
import { useDispatch } from "react-redux"
import { signin, signout } from "./actions"

function App() {
    const dispatch = useDispatch()
    
    // TODO: This does not work anymore because of react cookie consent, please fix this 
    //       so that it checks specifically for the UUID and user Token
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

                    {/* Decks page: used to store cards in a folder style */}
                    <Route exact path="/:sectionTitle/:sectionID">
                        <DecksView />
                    </Route>

                    {/* Cards page: used to start going over a deck of cards */}
                    <Route path="/:sectionTitle/:sectionID/:deckTitle/:deckID">
                        <CardsView />
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
