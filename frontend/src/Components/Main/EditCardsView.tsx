import { useEffect, useState } from 'react'
import { 
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
    Button,
    Flex,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalOverlay,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormControl,
    Textarea,
    FormLabel
} from "@chakra-ui/react"
import { Card } from "../../types"
import { getEntity } from "../../api/getEntity"
import { putEntity } from "../../api/putEntity"
import { useParams, Link } from "react-router-dom"

function EditCardsView() {
    const [cards, setCards] = useState<Card[]>()
    const [editingCard, setEditingCard] = useState<Card>()
    const [inputState, setInputState] = useState({
        front: "",
        back: ""
    })
    const { sectionTitle,
        sectionID, 
        deckTitle, 
        deckID } = useParams<{sectionTitle: string, sectionID: string, deckTitle: string, deckID: string}>()
    let { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        getEntity("deck", deckID).then(resp => setCards(resp.Cards))
    }, [deckID])

    function shortenString(str: string) {
        return str.length < 23 ? str : `${str.substr(0, 20)}...`
    }

    async function openModal(cardID: number) {
        let resp = await getEntity("card", cardID)
        setInputState({
            front: resp.Front,
            back: resp.Back
        })
        setEditingCard(resp)
        onOpen()
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault()
       if(editingCard !== undefined) {
           putEntity("card", {...editingCard})
       }
    }

    return (
        <Container textAlign="center">
        <Box mt="6" borderWidth="thin" borderRadius="sm" boxShadow="lg">
        <Table variant="striped" >
            <TableCaption placement="top">Cards</TableCaption>
            <Thead>
                <Tr>
                <Th>Front</Th>
                <Th>Back</Th>
                </Tr>
            </Thead>
            <Tbody>
                {cards?.map((card: Card, idx) => (
                <Tr key={idx} _hover={{ cursor: "pointer", backdropFilter: "brightness(0.5)" }} onClick={() => openModal(card.ID)}>
                <Td >{shortenString(card.Front)}</Td>
                <Td >{shortenString(card.Back)}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Edit Card</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
            <form onSubmit={onSubmit}>

            <FormControl isRequired>
                <FormLabel>Front</FormLabel>
                <Textarea name="front" value={inputState.front} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Back</FormLabel>
                <Textarea name="back" value={inputState.back} onChange={handleChange}/>
            </FormControl>
            <Button type="submit" colorScheme="blue">Save</Button>
            </form>
        </ModalBody>
        </ModalContent>
        </Modal>
        </Container>
    )
}

export default EditCardsView
