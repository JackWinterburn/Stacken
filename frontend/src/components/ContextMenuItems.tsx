import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, Divider, Text } from "@chakra-ui/react";
import { MenuItem } from "react-contextmenu";
import { deleteEntity } from "../api/deleteEntity";
import { alterSections } from "../actions/actions";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

export function ContextMenuItems({ id }: { id: number }) {
    let sections: any[] = useSelector(
        (state: RootStateOrAny) => state.sections
    );
    const dispatch = useDispatch();

    const handleClick = (id: number, type: string) => {
        if (type === "delete") {
            deleteEntity(id, "section");

            let ds: any;
            for (let i of sections) {
                if (i.ID === id) {
                    ds = i;
                } else {
                    continue;
                }
            }

            sections = sections.filter((s) => s !== ds);
            dispatch(alterSections(sections));
        }
    };

    return (
        <>
            <MenuItem
                data={{ id, type: "delete" }}
                onClick={(_, { id, type }: { id: number; type: string }) =>
                    handleClick(id, type)
                }
            >
                <HStack
                    transition="0.3s ease"
                    cursor="pointer"
                    p="6px"
                    backgroundColor="gray.50"
                    _hover={{ backgroundColor: "gray.300" }}
                >
                    <DeleteIcon color="red.600" />
                    <Text color="gray.700">Delete </Text>
                </HStack>
            </MenuItem>

            <Divider />

            <MenuItem data={{ id, type: "edit" }}>
                <HStack
                    transition="0.3s ease"
                    cursor="pointer"
                    p="6px"
                    backgroundColor="gray.50"
                    _hover={{ backgroundColor: "gray.300" }}
                >
                    <EditIcon color="green.500" />
                    <Text color="gray.700">Edit</Text>
                </HStack>
            </MenuItem>
        </>
    );
}
