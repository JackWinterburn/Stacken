import Header from "./Components/Header"
import Login from "./Components/Login"
import Logout from "./Components/Logout"
import Register from "./Components/Register"
import Main from "./Components/Main"
import DecksView from "./Components/Main/DecksView"
import CardsView from "./Components/Main/CardsView"
import PracticeCards from "./Components/Main/PracticeCards"
import CookieConsent  from "react-cookie-consent"
import { 
    BrowserRouter as Router,
    Route,
    Switch, 
} from "react-router-dom"
import { Text } from "@chakra-ui/react"
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

                    {/* Cards page: used to perform actions on a deck of cards */}
                    <Route exact path="/:sectionTitle/:sectionID/:deckTitle/:deckID">
                        <CardsView />
                    </Route>
                    {/* Practice Cards page: used to go over a deck of cards */}
                    <Route path="/:sectionTitle/:sectionID/:deckTitle/:deckID/cards">
                        <PracticeCards />
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
            <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="CookiePermission"
            style={{ background: "#141924", textAlign: "center" }}
            buttonStyle={{ color: "white", fontSize: "15px", background: "#3182CE", borderRadius: "3px"}}
            expires={900}
        >
            This app uses cookies to provide the required functionality.
            <Text size="sm" color="blue.200">We do not store any user sensitive data.</Text>
        </CookieConsent>
        </>
    );
}

export default App;
