import React from 'react'
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
            <Link to={`/${section.Title}/${section.ID}`}>
            <Box
                p="3px"
                textAlign="left"
                borderRadius="sm"
                _hover={{ background: "rgba(104, 104, 104, 0.3)", textDecor: "underline" }}
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

        <PopoverForm entity="section" parentID={getUUID()}/>
        </Flex>
    )
}
