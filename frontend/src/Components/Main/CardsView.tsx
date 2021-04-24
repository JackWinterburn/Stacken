import React, { useState, useEffect } from 'react'
import AddCardsModal from "./AddCardsModal"
import { Heading,
    Container,
    Box, 
    Button, 
    Tag,
    Badge,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    useDisclosure
} from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"
import { getEntity } from "../../api/getEntity"

function CardsView() {
    const { sectionTitle, sectionID, deckTitle, deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [amntOfCardsInDeck, setAmntOfCardsInDeck] = useState<number>()

    useEffect(() => {
        getEntity("deck", deckID).then(resp => setAmntOfCardsInDeck(resp.Cards.length))
    }, [deckID])

    function shortenBreadcrumbItem(breadCrumbItem: string) {
        if (breadCrumbItem.length > 25) {
            let shortenedBreadCrumbItem = breadCrumbItem.substr(0, 21) + "..."
            return shortenedBreadCrumbItem
        }
        return breadCrumbItem
    }

    return (
        <Container textAlign="center">
        <AddCardsModal isOpen={isOpen} onClose={onClose} setAmntOfCardsInDeck={setAmntOfCardsInDeck}/>
        <Flex direction="column">
        <Tag size="sm" mb="5" borderRadius="full" mt="10">
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
        <Box as="main" p={8} mt="6" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box>
            <Heading mb="3">
                {deckTitle}
            </Heading>
            <Badge variant="solid" mb="3">{amntOfCardsInDeck} cards in this deck</Badge>
            </Box>
            <Button m="3" colorScheme="green">Start deck</Button>
            <Button m="3" colorScheme="blue" onClick={onOpen}>Add Cards</Button>
        </Box>
        </Container>
    )
}

export default CardsView
