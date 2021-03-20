import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { alterSections } from "../../actions"
import { HandleNotLoggedIn } from "./handleNotLoggedIn"
import { getEntity } from "../../api/getEntity"
import { getUUID } from "./getUUID"
import { SectionsView } from "./SectionsView"
import {
    Container,
    Heading,
    Box
} from "@chakra-ui/react"


function Main() {
    const dispatch = useDispatch()

    useEffect(() => {
        // the user's sections are held within the user model
        getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
    })
    
    return (
        <div>
            {/* Redirect user to login if they are not logged in */}
            {HandleNotLoggedIn()}
            
            <Container textAlign="center">
            <Heading>Main Page</Heading>

            <SectionsView />
            </Container>

        </div>

    )
}

export default Main
