import React, { useState, useRef } from 'react'
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
    Input,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { alterSections } from "../../actions"
import { getUUID } from "./getUUID"
import { getEntity } from "../../api/getEntity"
import { putEntity } from "../../api/putEntity"
import { Link } from "react-router-dom"

import "../../Scss/SectionsView.scss"

export function SectionsView() {
    const sections = useSelector((state: RootStateOrAny) => state.sections)
    const dispatch = useDispatch()
    const [editingSection, setEditingSection] = useState<Section>()
    const [editedSection, setEditedSection] = useState<string>("")
    const initialRef = React.useRef<any>()
    let { isOpen, onOpen, onClose } = useDisclosure()

    async function onDelete(ID: number) {
        await deleteEntity("section", ID)
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditedSection(e.target.value)
    }
    
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await putEntity("section", {...editingSection, Title: editedSection})
        } catch(e) {}
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
        onClose()
    }

    function onModalOpen(section: Section) {
        setEditingSection(section)
        setEditedSection(section.Title)
        onOpen()
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

            {sections.map((section: Section) => (
            <Flex direction="row" justifyContent="space-between" key={section.ID}>
            <Link to={`/${section.Title}/${section.ID}`}>
            <Box
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
                    Edit Title
                </MenuItem>
                <MenuItem onClick={() => onDelete(section.ID)}>
                    Delete Section
                </MenuItem>
                </MenuList>
            </Menu>
            </Flex>
        ))}

    <Modal size="sm" isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Editing <strong>{editingSection?.Title}</strong></ModalHeader>
          <ModalCloseButton />
          <ModalBody >
              <form action="" onSubmit={onSubmit}>
              <Input ref={initialRef} value={editedSection} onChange={onChange} />
              <Button ml={2} mt={5} float="right" type="submit" colorScheme="red" size="sm" onClick={onClose}>Cancel</Button>
              <Button mt={5} float="right" type="submit" colorScheme="green" size="sm">Save</Button>
              </form>
          </ModalBody>
        </ModalContent>
        </Modal>

        <PopoverForm entity="section" parentID={getUUID()} />
        </Flex>
    )
}
