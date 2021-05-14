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
    Box,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalOverlay,
    ModalBody,
    useDisclosure,
    FormControl,
    Textarea,
    FormLabel
} from "@chakra-ui/react"
import { Card } from "../../types"
import { getEntity } from "../../api/getEntity"
import { putEntity } from "../../api/putEntity"
import { deleteEntity } from "../../api/deleteEntity"
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import { alterEditingCards } from '../../actions'

function EditCardsView() {
    const dispatch = useDispatch()
    const cards = useSelector((state: RootStateOrAny) => state.editingCards)
    const [isChanged, setIsChanged] = useState<boolean>(false)
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

    function getCards() {
        getEntity("deck", deckID).then(resp => dispatch(alterEditingCards(resp.Cards.sort((a: Card, b: Card) => {
            // sort cards by their IDs so they dont move everytime we re-fetch them
            return a.ID > b.ID ? 1 : -1
        }))))
    }

    useEffect(() => {
        getCards()
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
        setIsChanged(true)
    }

    async function onDelete(ID: number | undefined) {
        if(ID === undefined) return
        else {
            await deleteEntity("card", ID)
            getCards()
            onClose()
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault()
       if(editingCard !== undefined) {
            try {
               await putEntity("card", {...editingCard, Front: inputState.front, Back: inputState.back})
            } catch(e){}
            setIsChanged(false)
            getCards()
            onClose() // close the modal when form is submitted
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
                {cards?.map((card: Card, idx: number) => (
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

        <ModalBody >
            <form onSubmit={onSubmit}>
            <FormControl isRequired>
                <FormLabel>Front</FormLabel>
                <Textarea name="front" value={inputState.front} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Back</FormLabel>
                <Textarea name="back" value={inputState.back} onChange={handleChange}/>
            </FormControl>
            <Button m="2" float="right" colorScheme="red" onClick={() => onDelete(editingCard?.ID)}>Delete</Button>
            <Button m="2" float="right" type="submit" colorScheme="blue" disabled={ isChanged ? false : true}>Save</Button>
            </form>
        </ModalBody>
        </ModalContent>
        </Modal>
        </Container>
    )
}

export default EditCardsView
