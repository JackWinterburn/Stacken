import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, Divider, Text, useColorMode } from "@chakra-ui/react";
import { MenuItem } from "react-contextmenu";
import { deleteEntity } from "../api/deleteEntity";
import { alterSections, alterDecks } from "../actions/actions";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

export function ContextMenuItems({
    id,
    entity,
}: {
    id: number;
    entity: string;
}) {
    const { colorMode } = useColorMode();
    let currentEntity: any = useSelector((state: RootStateOrAny) => state);
    const dispatch = useDispatch();

    let bgcolor = "";
    let hoverbgcolor = "";
    if (colorMode === "dark") {
        bgcolor = "#1A202C";
        hoverbgcolor = "gray.700";
    } else {
        bgcolor = "whitesmoke";
        hoverbgcolor = "gray.300";
    }

    const handleClick = (id: number, type: string) => {
        let action: any;
        switch (entity) {
            case "section":
                currentEntity = currentEntity.sections;
                action = alterSections;
                break;
            case "deck":
                currentEntity = currentEntity.decks;
                action = alterDecks;
                break;
        }

        if (type === "delete") {
            deleteEntity(id, entity);

            let ds: any;
            for (let i of currentEntity) {
                if (i.ID === id) {
                    ds = i;
                } else {
                    continue;
                }
            }

            currentEntity = currentEntity.filter((s: any) => s !== ds);
            dispatch(action(currentEntity));
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
                    backgroundColor={bgcolor}
                    _hover={{ backgroundColor: hoverbgcolor }}
                >
                    <DeleteIcon color="red.600" />
                    <Text>Delete </Text>
                </HStack>
            </MenuItem>

            <Divider />

            <MenuItem data={{ id, type: "edit" }}>
                <HStack
                    transition="0.3s ease"
                    cursor="pointer"
                    p="6px"
                    backgroundColor={bgcolor}
                    _hover={{ backgroundColor: hoverbgcolor }}
                >
                    <EditIcon color="green.500" />
                    <Text>Edit</Text>
                </HStack>
            </MenuItem>
        </>
    );
}
