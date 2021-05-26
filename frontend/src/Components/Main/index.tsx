import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { alterSections } from "../../actions"
import { HandleNotLoggedIn } from "./handleNotLoggedIn"
import { getEntity } from "../../api/getEntity"
import { getUUID } from "./getUUID"
import { SectionsView } from "./SectionsView"
import {
    Container,
} from "@chakra-ui/react"



function Main() {
    const dispatch = useDispatch()
    const [dataFetched, setDataFetched] = useState(false)

    useEffect(() => {
        // the user's sections are held within the user model
        // only do this if there is a UUID in cookie storage
        if(getUUID()){
            getEntity("user", getUUID()).then((resp) => {dispatch(alterSections(resp.Sections)); setDataFetched(true)})
        }
    })
    
    return (
        <div>
            {/* Redirect user to login if they are not logged in */}
            {HandleNotLoggedIn()}
            <Container textAlign="center">

            <SectionsView dataFetched={dataFetched}/>
            </Container>

        </div>

    )
}

export default Main
