import { useEffect } from "react"
import { Deck } from "../../types"
import { 
    Heading,
    Container,
    Flex,
    Box,
    Text,
    Breadcrumb,
    BreadcrumbItem,
} from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { alterDecks } from "../../actions"
import { getEntity } from "../../api/getEntity"
import { getUUID } from "./getUUID"

import "../../Scss/BreadcrumbLinks.scss"

function DecksView() {
    const { sectionTitle, sectionID } = useParams<{sectionTitle: string, sectionID: string}>()
    const decks = useSelector((state: RootStateOrAny) => state.decks)
    const dispatch = useDispatch()

    useEffect(()=> {
        if(getUUID()) {
            getEntity("section", sectionID).then(resp => dispatch(alterDecks(resp.Decks)))
        }
    })

    return (
        <Container textAlign="center">
        <Heading>Decks Page</Heading>
        <Breadcrumb mt="10" textAlign="left">
            <BreadcrumbItem>
            <Link className="bdcm-link" to="/">
                Home
            </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link className="bdcm-link" to="#">
                { sectionTitle }
            </Link> 
            </BreadcrumbItem>
        </Breadcrumb>
        {decks.map((deck: Deck) => (
        <Flex direction="row" justifyContent="space-between" key={deck.ID}>
            <Box>
                <Text>{deck.Title}</Text>
            </Box>
        </Flex>
        ))}
        </Container>
    )
}

export default DecksView
