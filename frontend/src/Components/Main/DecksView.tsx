import { useState, useRef } from "react"
import PopoverForm from "./PopoverForm"
import { useEffect } from "react"
import { Deck } from "../../types"
import { 
    Container,
    Flex,
    Box,
    Text,
    Stack,
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    IconButton,
    Skeleton,
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
    useDisclosure
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { useParams, Link } from "react-router-dom"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { alterDecks, resetDecks } from "../../actions"
import { getEntity } from "../../api/getEntity"
import { deleteEntity } from "../../api/deleteEntity"
import { putEntity } from "../../api/putEntity"
import { getUUID } from "./getUUID"

import "../../Scss/BreadcrumbLinks.scss"

function DecksView() {
    const { sectionTitle, sectionID } = useParams<{sectionTitle: string, sectionID: string}>()
    const decks = useSelector((state: RootStateOrAny) => state.decks)
    const dispatch = useDispatch()
    const [editingDeck, setEditingDeck] = useState<Deck>()
    const [editedDeck, setEditedDeck] = useState<string>("")
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
        setEditedDeck(e.target.value)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await putEntity("deck", {...editingDeck, Title: editedDeck})
        } catch(e) {}
        await getEntity("section", sectionID).then((resp) => dispatch(alterDecks(resp.Decks)))
        onClose()
    }

    function onModalOpen(deck: Deck) {
        setEditingDeck(deck)
        setEditedDeck(deck.Title)
        onOpen()
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

            {decks.map((deck: Deck) => (
            <Flex direction="row" justifyContent="space-between" key={deck.ID}>
            <Link to={`/${sectionTitle}/${sectionID}/${deck.Title}/${deck.ID}`}>
            <Box
                p="3px"
                borderRadius="sm"
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
                    Edit Deck
                </MenuItem>
                <MenuItem onClick={() => onDelete(deck.ID)}>
                    Delete Deck
                </MenuItem>
                </MenuList>
            </Menu>
            </Flex>
            ))}

            <Modal size="sm" isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editing {editingDeck?.Title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <form action="" onSubmit={onSubmit}>
                    <Input ref={initialRef} value={editedDeck} onChange={onChange} />
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
