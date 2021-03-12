import { HStack, UnorderedList, ListItem } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import DarkModeSwitch from "./DarkModeSwitch"

import "../Scss/Header.scss"

function Header() {
    return (
        <nav className="navbar">
            <UnorderedList className="nav-links">
                <HStack>
                    <ListItem className="nav-link">
                        <Link to="/">Main</Link>
                    </ListItem>

                    <ListItem className="nav-link">
                        <Link to="/login">Login</Link>
                    </ListItem>

                    <ListItem className="nav-link">
                        <Link to="/register">Register</Link>
                    </ListItem>

                    <ListItem className="nav-link">
                        <Link to="/logout">Logout</Link>
                    </ListItem>
                    
                    <DarkModeSwitch />
                </HStack>
            </UnorderedList>
            </nav>
    )
}

export default Header
