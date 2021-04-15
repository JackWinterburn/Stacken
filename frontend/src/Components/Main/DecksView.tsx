import { 
    Heading,
    Container,
    Breadcrumb,
    BreadcrumbItem,
} from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"

import "../../Scss/BreadcrumbLinks.scss"

function DecksView() {
    const { sectionTitle, sectionID } = useParams<{sectionTitle: string, sectionID: string}>()

    return (
        <Container>
        <Heading>Decks Page</Heading>
        <Breadcrumb>
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
        </Container>
    )
}

export default DecksView
