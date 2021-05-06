import React, { useEffect, useState, useRef } from 'react'
import gfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import rehypeRaw from "rehype-raw"
import Markdown from 'react-markdown'
import { Card } from "../../types"
import { 
    Container, 
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    Box,
    Flex,
    Heading,
    Button,
    VStack,
    Spinner,
    Text
} from "@chakra-ui/react"
import { getEntity } from "../../api/getEntity"
import { useParams, Link } from "react-router-dom"

function PracticeCards() {
    // no declaration file nor @types support :(, had to use require syntax
    const rehypeHighlight = require("rehype-highlight")
    const { sectionTitle, sectionID, deckTitle, deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()
    const [cards, setCards] = useState<Card[]>()
    const [cardCounter, setCardCounter] = useState(0) // used to keep track of which card the user is on
    const [cardProgress, setCardProgress] = useState<"Front" | "Back">("Front")
    const [deckCompleted, setDeckCompleted] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const btnRef = useRef<any>()

    useEffect(() => {
        getEntity("deck", deckID).then(resp => {setCards(resp.Cards); setDataFetched(true)})
        document.addEventListener("keydown", keyboardHandler)
        return () => { document.removeEventListener("keydown", keyboardHandler) }
    }, [deckID])

    // allow the user to proceed through cards when either the enter or space key is pressed
    function keyboardHandler(e: KeyboardEvent) {
        if(e.key===" " || e.key==="ArrowRight") {
            try {
                btnRef.current.disabled=true
                btnRef.current.disabled=false
                btnRef.current.click()
            } catch(e) {return}
        }
    }

    function shortenBreadcrumbItem(breadCrumbItem: string) {
        if (breadCrumbItem.length > 25) {
            let shortenedBreadCrumbItem = breadCrumbItem.substr(0, 21) + "..."
            return shortenedBreadCrumbItem
        }
        return breadCrumbItem
    }

    function ensureValidDeck() {
        // TODO: add a loading spinner here to improve UX
        if (cards === undefined) return "No cards are in this deck yet"
    }

    function proceed() {        
        if (cards !== undefined && cardCounter === cards.length - 1 && cardProgress === "Back") {
            setDeckCompleted(true)
            return
        }

        if (cardProgress === "Front") setCardProgress("Back")
        else {
            setCardProgress("Front")
            setCardCounter(cardCounter + 1)
        }
    }

    if (cards === undefined || cards[cardCounter] === undefined) {
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
        <Box mt="6" p="3" borderWidth="thin" borderRadius="lg" boxShadow="lg"  textAlign="center">
        {dataFetched? <Heading>There are no cards in this deck yet...</Heading> : <Spinner />}            
        </Box>
        </Container>
        )
    } else {
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

        {deckCompleted?
        <Box mt="6" p="3" borderWidth="thin" borderRadius="lg" boxShadow="lg" >
            <Heading>You have finished the deck!</Heading>
            <Link to={`/${sectionTitle}/${sectionID}`} className="mlink"> Back to sections page.</Link>
        </Box> 
        :         
        <Box mt="6" p="3" borderWidth="thin" borderRadius="lg" boxShadow="lg"  textAlign="left">
        <Text>{`${cardCounter+1} / ${cards.length}`}</Text>
        <VStack h="19em" overflowY="scroll">

        <Box id="front" textAlign="left" p="25px">
            <Markdown
                className="remark"
                remarkPlugins={[gfm]} 
                rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}>
                    {cards[cardCounter].Front}
            </Markdown>
        </Box>

        <Box id="back" textAlign="left" p="25px" filter={cardProgress === "Front"? "blur(5px)" : "blur(0)"}>
            <Markdown
                className="remark"
                remarkPlugins={[gfm]} 
                rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}>
                    {cards[cardCounter].Back}
            </Markdown>
        </Box>
        </VStack>
        <Button ref={btnRef} onClick={proceed} m="3">{cardProgress === "Front"? "Show Back" : "Next Card"}</Button>
        </Box>
        }
        </Container>
        )
    }
        
}

export default PracticeCards
