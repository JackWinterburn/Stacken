import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, Divider, Text } from "@chakra-ui/react";
import { MenuItem } from "react-contextmenu";

export function ContextMenuItems() {
    return (
        <>
            <MenuItem data={{ foo: "bar" }}>
                <HStack
                    transition="0.3s ease"
                    cursor="pointer"
                    p="6px"
                    backgroundColor="gray.50"
                    _hover={{ backgroundColor: "gray.300" }}
                >
                    <DeleteIcon color="red.600" />
                    <Text>Delete </Text>
                </HStack>
            </MenuItem>
            <Divider />
            <MenuItem data={{ foo: "bar" }}>
                <HStack
                    transition="0.3s ease"
                    cursor="pointer"
                    p="6px"
                    backgroundColor="gray.50"
                    _hover={{ backgroundColor: "gray.300" }}
                >
                    <EditIcon color="green.500" />
                    <Text>Edit</Text>
                </HStack>
            </MenuItem>
        </>
    );
}
