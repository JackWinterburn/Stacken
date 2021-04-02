import React from 'react'
import { Section } from "../../types"
import { deleteEntity } from "../../api/deleteEntity"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import {
    Box,
    Flex,
    Text,
    IconButton,
    useColorMode
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import CookieConsent  from "react-cookie-consent"
import PopoverForm from "./PopoverForm"
import { alterSections } from "../../actions"
import { getUUID } from "./getUUID"
import { getEntity } from "../../api/getEntity"

import "../../Scss/SectionsView.scss"

export function SectionsView() {
    const sections = useSelector((state: RootStateOrAny) => state.sections)
    const dispatch = useDispatch()
    const {colorMode} = useColorMode()

    let sectionHoverBg: string
    if (colorMode === "light")
        sectionHoverBg = "gray.100"
    else sectionHoverBg = "gray.700"

    async function onDelete(ID: number | string) {
        await deleteEntity("section", ID)
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
    }

    return (
        <>
        <Flex direction="column" mt="10">
            {sections.map((section: Section) => (
            <Box
                p="0.5"
                fontSize="lg"
                textAlign="left"
                _hover={{ bg: sectionHoverBg, textDecor: "underline" }}
                key={section.ID}
            >
                {section.Title}
                <IconButton variant="ghost" size="sm" aria-label="delete section" float="right" icon={
                <DeleteIcon onClick={() => onDelete(section.ID) } />}/>
            </Box>
        ))}

        <PopoverForm />

        </Flex>
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="CookiePermission"
            style={{ background: "#141924", textAlign: "center" }}
            buttonStyle={{ color: "white", fontSize: "15px", background: "#3182CE", borderRadius: "3px"}}
            expires={900}
        >
            This app uses cookies to provide the required functionality.
            <Text size="sm" color="blue.200">We do not store any user sensitive data.</Text>
        </CookieConsent>
        </>
    )
}
