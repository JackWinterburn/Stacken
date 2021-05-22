import { useEffect, useState } from "react"
import DarkModeSwitch from "./DarkModeSwitch"
import { 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    Container,
    Flex,
    Box
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { getEntity } from "../api/getEntity"
import { getUUID } from "./Main/getUUID"
import { UserCreatedValue } from "../types"

import "../Scss/Header.scss"

function Header() {
    const [userInfo, setUserInfo] = useState<UserCreatedValue>()

    useEffect(() => {
        if(getUUID()){
            getEntity("user", getUUID()).then((resp) => setUserInfo(resp))
        }
    }, [])
    console.log(userInfo)
    
    function AvatarComp() {
        if(userInfo?.ProfilePictureURL != "") {
            return (
                <Avatar size="md" name={userInfo?.Name} src={userInfo?.ProfilePictureURL} />
            )
        } else if(userInfo?.ProfilePictureURL === "") {
            return (
                <Avatar size="md" name={userInfo?.Name} />
            )
        } else {
            return (
                <Avatar size="md" />
            )
        }
    }

    return (
        <Container p={5} >
            <Box as="span" float="right" _hover={{ cursor: "pointer"}}>

            <Menu>
                <MenuButton as={Flex}>
                <AvatarComp />
                </MenuButton>

                <MenuList>
                <Link to="/settings">
                <MenuItem>
                    Settings
                </MenuItem>
                </Link>
                <Link to="/logout">
                <MenuItem>
                    Logout
                </MenuItem>
                </Link>
                </MenuList>
            </Menu>
            </Box>
        </Container>
    )
}

export default Header
