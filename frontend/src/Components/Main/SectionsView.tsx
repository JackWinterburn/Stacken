import React from 'react'
import CookieConsent  from "react-cookie-consent"
import PopoverForm from "./PopoverForm"
import { Section } from "../../types"
import { deleteEntity } from "../../api/deleteEntity"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Breadcrumb,
    BreadcrumbItem,
    Tag
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { alterSections } from "../../actions"
import { getUUID } from "./getUUID"
import { getEntity } from "../../api/getEntity"
import { Link } from "react-router-dom"

import "../../Scss/SectionsView.scss"

export function SectionsView() {
    const sections = useSelector((state: RootStateOrAny) => state.sections)
    const dispatch = useDispatch()

    async function onDelete(ID: number | string) {
        await deleteEntity("section", ID)
        await getEntity("user", getUUID()).then((resp) => dispatch(alterSections(resp.Sections)))
    }

    return (
        <>
        <Flex direction="column" mt="10">
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
            <Link to={`/${section.Title}/${section.ID}/decks`}>
            <Box
                p="0.5"
                fontSize="lg"
                textAlign="left"
                _hover={{ textDecor: "underline" }}
                key={section.ID}
                >
                <Text>
                    {section.Title}
                </Text>

            </Box>
            </Link>
            <IconButton variant="ghost" size="sm" aria-label="delete section" float="right" icon={
                <DeleteIcon onClick={() => onDelete(section.ID) } />}/>
            </Flex>
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
