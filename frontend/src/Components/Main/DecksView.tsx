import { useEffect } from "react"
import { Deck } from "../../types"
import { 
    Heading,
    Container,
    Flex,
    Box,
    Text,
    Stack,
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    Skeleton
} from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { alterDecks, resetDecks } from "../../actions"
import { getEntity } from "../../api/getEntity"
import { getUUID } from "./getUUID"

import "../../Scss/BreadcrumbLinks.scss"

function DecksView() {
    const { sectionTitle, sectionID } = useParams<{sectionTitle: string, sectionID: string}>()
    const decks = useSelector((state: RootStateOrAny) => state.decks)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(resetDecks())
        if(getUUID()) {
            getEntity("section", sectionID).then(resp => dispatch(alterDecks(resp.Decks)))
        }
    }, [sectionID, dispatch])
    console.log(decks)

    if (decks[0] && decks[0].CreatedAt === "DEFAULT") {
        return (
        <Container textAlign="center">
        <Heading>Decks Page</Heading>
        <Flex direction="column" mt="10">
        <Tag size="sm" mb="5" borderRadius="full">
        <Breadcrumb textAlign="left">
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
        </Tag>
        <Stack>
        <Skeleton height="20px"></Skeleton>
        <Skeleton height="20px"></Skeleton>
        <Skeleton height="20px"></Skeleton>
        </Stack>
        </Flex>
        </Container>
    )}  else {
            return (
            <Container textAlign="center">
            <Heading>Decks Page</Heading>
            <Flex direction="column" mt="10">
            <Tag size="sm" mb="5" borderRadius="full">
            <Breadcrumb textAlign="left">
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
            </Tag>

            {decks.map((deck: Deck) => (
                <Flex direction="row" justifyContent="space-between" key={deck.ID}>
                <Box>
                <Text>{deck.Title}</Text>
                </Box>
                </Flex>
            ))}
            </Flex>
            </Container>
    )}
}

export default DecksView
