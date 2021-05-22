import React, { useState, useEffect } from 'react'
import AddCardsModal from "./AddCardsModal"
import { Heading,
    Container,
    Box, 
    Button, 
    ButtonGroup,
    Tag,
    Badge,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    useDisclosure
} from "@chakra-ui/react"
import { useParams, Link, useLocation } from "react-router-dom"
import { getEntity } from "../../api/getEntity"

function CardsView() {
    const { sectionTitle, sectionID, deckTitle, deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()
    const location = useLocation()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [amntOfCardsInDeck, setAmntOfCardsInDeck] = useState<number>()

    useEffect(() => {
        getEntity("deck", deckID).then(resp => setAmntOfCardsInDeck(resp.Cards.length))
    }, [deckID])

    function shortenBreadcrumbItem(breadCrumbItem: string) {
        if (breadCrumbItem.length > 19) {
            let shortenedBreadCrumbItem = breadCrumbItem.substr(0, 16) + "..."
            return shortenedBreadCrumbItem
        }
        return breadCrumbItem
    }

    return (
        <Container textAlign="center">
        <Flex direction="column" mt="10" h="100%">
        <Tag size="sm" mb="5" borderRadius="full" >
        <Breadcrumb textAlign="left">
            <BreadcrumbItem>
            <Link className="bdcm-link" to="/">
                Home
            </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link className="bdcm-link" to={`/${sectionTitle}/${sectionID}`}>
                { shortenBreadcrumbItem(sectionTitle) }
            </Link> 
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link className="bdcm-link" to="#">
                { shortenBreadcrumbItem(deckTitle) }
            </Link> 
            </BreadcrumbItem>
        </Breadcrumb>
        </Tag>
        </Flex>
        <Box as="main" p={8} mt="6" maxWidth="500px" borderWidth={1} borderRadius={3} boxShadow="md">
            <Box>
            <Heading mb="3">
                {deckTitle}
            </Heading>
            <Badge variant="solid" mb="3">{amntOfCardsInDeck} cards in this deck</Badge>
            </Box>
            <Link to={`${location.pathname}/cards`}>
            <Button m="1" size="md" >
                Start deck
            </Button>
            </Link>
            <Button m="1" size="md" onClick={onOpen}>Add Cards</Button>
            <Link to={`${location.pathname}/edit`}>
            <Button m="1" size="md" >
                Edit deck
            </Button>
            </Link>
        </Box>
        <AddCardsModal isOpen={isOpen} onClose={onClose} setAmntOfCardsInDeck={setAmntOfCardsInDeck}/>
        </Container>
    )
}

export default CardsView
