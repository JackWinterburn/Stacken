import React, { useEffect, useState } from 'react'
import { Card } from "../../types"
import { 
    Heading, 
    Container, 
    Table,
    TableCaption, 
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    Box,
    Flex
} from "@chakra-ui/react"
import { getEntity } from "../../api/getEntity"
import { useParams, Link } from "react-router-dom"

function PracticeCards() {
    const { sectionTitle, sectionID, deckTitle, deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()
    const [cards, setCards] = useState<Card[]>()

    useEffect(() => {
        getEntity("deck", deckID).then(resp => setCards(resp.Cards))
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
            <Link className="bdcm-link" to={`/${sectionTitle}/${sectionID}/${deckTitle}/${deckID}`}>
                { shortenBreadcrumbItem(deckTitle) }
            </Link> 
            </BreadcrumbItem>
        </Breadcrumb>
        </Tag>
        </Flex>

        <Box mt="6" borderWidth="thin" borderRadius="lg" boxShadow="lg">
        <Table variant="striped" >
            <TableCaption>Cards</TableCaption>
            <Thead>
                <Tr>
                <Th>Front</Th>
                <Th>Back</Th>
                </Tr>
            </Thead>
            <Tbody>
                {cards?.map((card, idx) => (
                <Tr key={idx}>
                    <Td>{card.Front}</Td>
                    <Td>{card.Back}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </Box>
        </Container>
    )
}

export default PracticeCards
