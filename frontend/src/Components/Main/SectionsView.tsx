import React, { useState } from 'react'
import PopoverForm from "./PopoverForm"
import { Section } from "../../types"
import { deleteEntity } from "../../api/deleteEntity"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import {
    Box,
    Flex,
    IconButton,
    Breadcrumb,
    BreadcrumbItem,
    Text,
    Tag,
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
    HStack,
    Input,
    Button,
    Heading,
    Spinner,
    useDisclosure
} from "@chakra-ui/react"
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { alterSections } from "../../actions"
import { getUUID } from "./getUUID"
import { getEntity } from "../../api/getEntity"
import { putEntity } from "../../api/putEntity"
import { Link } from "react-router-dom"
import { colors as cardColors } from "./colors"

import "../../Scss/SectionsView.scss"

export function SectionsView({dataFetched}: {dataFetched: boolean}) {
    const sections = useSelector((state: RootStateOrAny) => state.sections)
    const dispatch = useDispatch()
    const [editingSection, setEditingSection] = useState<Section>()
    const [editedSectionTitle, setEditedSectionTitle] = useState("")
    const [editedSectionColor, setEditedSectionColor] = useState("")
    const [colorName, setColorName] = useState("")
    const [colors,] = useState(cardColors)
    const initialRef = React.useRef<any>()
    let { isOpen, onOpen, onClose } = useDisclosure()

    async function onDelete(ID: number) {
        await deleteEntity("section", ID)
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditedSectionTitle(e.target.value)
    }
    
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await putEntity("section", {...editingSection, Title: editedSectionTitle, Color: editedSectionColor})
        } catch(e) {}
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
        setEditedSectionColor("")
        setColorName("")
        onClose()
    }

    function onModalOpen(section: Section) {
        setEditingSection(section)
        setEditedSectionTitle(section.Title)
        onOpen()
    }

    function getColor(color: string | null) {
        if(color === "" || color === null) return "transparent"
        else return color
    }

    function onColorChange(color: string, name: string) {
        setEditedSectionColor(color)
        setColorName(name)
    }

    return (
        <Flex direction="column" mt="10" h="100%">
        <Tag size="sm" mb="5" borderRadius="full">
         <Breadcrumb textAlign="left">
            <BreadcrumbItem>
            <Link className="bdcm-link" to="/">
                    Home
            </Link>
            </BreadcrumbItem>
          </Breadcrumb>
          </Tag>

        {!dataFetched ? 
        <Flex direction="row" alignItems="center" justifyContent="center">
            <Spinner/>
        </Flex> 
        :
        <Box>
          {sections[0] === undefined ? <Heading size="lg">No sections yet.</Heading> : 
            <Box maxHeight="60vh" overflowY="scroll">
            {sections.map((section: Section) => (
            <Flex direction="row" justifyContent="space-between" key={section.ID}>
            <Link to={`/${section.Title}/${section.ID}`}>
            <Box
                borderLeft={`3px solid ${getColor(section.Color)}`}
                p="3px"
                textAlign="left"
                borderRadius="sm"
                _hover={{ textDecor: "underline" }}
                key={section.ID}
                >
                <Text>{section.Title}</Text>
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
                <MenuItem onClick={() => onModalOpen(section)}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => onDelete(section.ID)}>
                    Delete Section
                </MenuItem>
                </MenuList>
            </Menu>
            </Flex>
        ))
        }
        </Box>}
        <PopoverForm entity="section" parentID={getUUID()} />
        </Box>}

    <Modal size="sm" isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Editing <strong>{editingSection?.Title}</strong></ModalHeader>
        <ModalCloseButton />
        <ModalBody >
            <form onSubmit={onSubmit}>
            <Input ref={initialRef} value={editedSectionTitle} onChange={onChange} />

            <Menu>
                <MenuButton size="sm" mt={5} as={Button} rightIcon={<ChevronDownIcon />}>{colorName || "Change color"}</MenuButton>

                <MenuList>
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

        </Flex>
    )
}
