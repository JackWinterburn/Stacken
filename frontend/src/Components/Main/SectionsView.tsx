import React from 'react'
import { Section } from "../../types"
import { useSelector, RootStateOrAny } from "react-redux"
import {
    Button,
    Box,
    Flex
} from "@chakra-ui/react"

export function SectionsView() {
    const sections = useSelector((state: RootStateOrAny) => state.sections)

    return (
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
        </Flex>
    )
}
