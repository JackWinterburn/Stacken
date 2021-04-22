import React from 'react'
import { Heading,
    Container,
    Box, 
    Button, 
    Tag,
    Breadcrumb,
    BreadcrumbItem, 
} from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"

function CardsView() {
    const { sectionTitle, sectionID, deckTitle, deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()

    function shortenBreadcrumbItem(breadCrumbItem: string) {
        if (breadCrumbItem.length > 25) {
            let shortenedBreadCrumbItem = breadCrumbItem.substr(0, 21) + "..."
            return shortenedBreadCrumbItem
        }
        return breadCrumbItem
    }

    return (
        <Container textAlign="center">
        <Tag size="sm" mb="5" borderRadius="full" mt="6">
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
        <Box as="main" p={8} mt="6" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading>
                {deckTitle}
            </Heading>
            <Button mt="6" colorScheme="green">Start deck</Button>
        </Box>
        </Container>
    )
}

export default CardsView
