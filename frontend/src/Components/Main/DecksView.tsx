import { useState, useRef } from "react"
import PopoverForm from "./PopoverForm"
import { useEffect } from "react"
import { Deck } from "../../types"
import { 
    Container,
    Heading,
    Flex,
    Box,
    Text,
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    Spinner,
    useDisclosure
} from "@chakra-ui/react"
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { useParams, Link } from "react-router-dom"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { alterDecks, resetDecks } from "../../actions"
import { getEntity } from "../../api/getEntity"
import { deleteEntity } from "../../api/deleteEntity"
import { putEntity } from "../../api/putEntity"
import { getUUID } from "./getUUID"
import { colors as cardColors } from "./colors"

import "../../Scss/BreadcrumbLinks.scss"

function DecksView() {
    const { sectionTitle, sectionID } = useParams<{sectionTitle: string, sectionID: string}>()
    const decks = useSelector((state: RootStateOrAny) => state.decks)
    const dispatch = useDispatch()
    const [editingDeck, setEditingDeck] = useState<Deck>()
    const [editedDeckTitle, setEditedDeckTitle] = useState("")
    const [editedDeckColor, setEditedDeckColor] = useState("")
    const [colorName, setColorName] = useState("")
    const [colors,] = useState(cardColors)
    const initialRef = useRef<any>()
    let { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(()=> {
        dispatch(resetDecks())
        if(getUUID()) {
            getEntity("section", sectionID).then(resp => dispatch(alterDecks(resp.Decks)))
        }
    }, [sectionID, dispatch])

    async function onDelete(ID: number | string) {
        await deleteEntity("deck", ID)
        await getEntity("section", sectionID).then((resp) => dispatch(alterDecks(resp.Decks)))
    }

    function shortenBreadcrumbItem(breadCrumbItem: string) {
        if (breadCrumbItem.length > 19) {
            let shortenedBreadCrumbItem = breadCrumbItem.substr(0, 16) + "..."
            return shortenedBreadCrumbItem
        }
        return breadCrumbItem
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditedDeckTitle(e.target.value)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await putEntity("deck", {...editingDeck, Title: editedDeckTitle, Color: editedDeckColor})
        } catch(e) {}
        await getEntity("section", sectionID).then((resp) => dispatch(alterDecks(resp.Decks)))
        setEditedDeckColor("")
        setColorName("")
        onClose()
    }

    function onModalOpen(deck: Deck) {
        setEditingDeck(deck)
        setEditedDeckTitle(deck.Title)
        onOpen()
    }

    function getColor(color: string | null) {
        if(color === "" || color === null) return "transparent"
        else return color
    }

    function onColorChange(color: string, name: string) {
        setEditedDeckColor(color)
        setColorName(name)
    }


    if (decks[0] && decks[0].CreatedAt === "DEFAULT") {
        // TODO: extract this useless piece of crap into its own component pls :)
        return (
        <Container textAlign="center">
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
                { shortenBreadcrumbItem(sectionTitle) }
            </Link> 
            </BreadcrumbItem>
        </Breadcrumb>
        </Tag>
        <Flex justifyContent="center" alignItems="center">
        <Spinner/>
        </Flex>
        </Flex>
        </Container>
    )}  else {
            return (
            <Container textAlign="center">
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
                    { shortenBreadcrumbItem(sectionTitle) }
                </Link> 
                </BreadcrumbItem>
            </Breadcrumb>
            </Tag>

            {decks[0] === undefined ? 
            <Heading>No decks yet.</Heading>
            :
            <Box>
                

            {decks.map((deck: Deck) => (
                <Flex direction="row" justifyContent="space-between" key={deck.ID}>
            <Link to={`/${sectionTitle}/${sectionID}/${deck.Title}/${deck.ID}`}>
            <Box
                p="3px"
                borderRadius="sm"
                borderLeft={`3px solid ${getColor(deck.Color)}`}
                _hover={{ textDecor: "underline" }}
                >
            <Text>{deck.Title}</Text>
            </Box>
            </Link>
            <Menu>
                <MenuButton
                    aria-label="Section Options"
                    as={IconButton} 
                    icon={<SettingsIcon />}
                    variant="ghost"
                    size="sm"
                    ></MenuButton>

                <MenuList>
                <MenuItem onClick={() => onModalOpen(deck)}>
                    Edit Title
                </MenuItem>
                <MenuItem onClick={() => onDelete(deck.ID)}>
                    Delete Deck
                </MenuItem>
                </MenuList>
            </Menu>
            </Flex>
            ))}</Box>}

            <Modal size="sm" isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editing <strong>{editingDeck?.Title}</strong></ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <form action="" onSubmit={onSubmit}>
                    <Input ref={initialRef} value={editedDeckTitle} onChange={onChange} />

                    <Menu>
                    <MenuButton size="sm" mt={5} as={Button} rightIcon={<ChevronDownIcon />}>{colorName || "Change color"}</MenuButton>
                        <MenuList >
                            {colors.map((color, idx) => (
                                <MenuItem key={idx} onClick={() => onColorChange(color.color, color.name)}>
                                <Box mr="2" w="25px" h="25px" borderRadius="50%" bgColor={color.color}></Box>
                                <span>{color.name}</span>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    <Button ml={2} mt={5} float="right" type="submit" colorScheme="red" size="sm" onClick={onClose}>Cancel</Button>
                    <Button mt={5} float="right" type="submit" colorScheme="green" size="sm">Save</Button>
                    </form>
                </ModalBody>
                </ModalContent>
            </Modal>

            <PopoverForm entity="deck" parentID={sectionID}/>
            </Flex>
            </Container>
    )}
}

export default DecksView
