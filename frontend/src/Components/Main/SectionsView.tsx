import React from 'react'
import { Section } from "../../types"
import { useSelector, RootStateOrAny } from "react-redux"
import {
    Box,
    Flex,
    Text
} from "@chakra-ui/react"
import CookieConsent  from "react-cookie-consent"
import PopoverForm from "./PopoverForm"

export function SectionsView() {
    const sections = useSelector((state: RootStateOrAny) => state.sections)

    return (
        <>
        <Flex direction="column" mt="10">
            {sections.map((section: Section) => (
            <Box
                as="button"
                bg="yellow.400"
                m="1"
                p="0.5"
                color="white"
                fontSize="lg"
                
                key={section.ID}
            >
                {section.Title}
            </Box>
        ))}

        <PopoverForm />

        </Flex>
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="Cookie Permission"
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
