import React, { useRef, useState } from 'react'
import {
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Input,
    Text,
    ButtonGroup,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    VStack,
    Box
} from "@chakra-ui/react"
import { EditIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { invalidFormToast } from "../Login/ToastMessages"
import { postEntity } from "../../api/postEntity"
import { useDispatch } from "react-redux"
import { alterSections, alterDecks } from "../../actions"
import { getEntity } from "../../api/getEntity"
import { colors as cardColors } from "./colors"

function PopoverForm({entity, parentID}: {entity: "section" | "deck", parentID: number | string}) {
    // TODO: Get rid of this disgusting "any" type
    const initialFocusRef = useRef<any>()
    const [inputVal, setInputVal] = useState("")
    const [chosenColor, setChosenColor] = useState({name: "", color: ""})
    const [colors,] = useState(cardColors)
    const dispatch = useDispatch()

    let entityParent: "user" | "section" | "deck"
    let reduxAction: typeof alterSections | typeof alterDecks
    switch (entity) {
        case "section":
            entityParent = "user"
            reduxAction = alterSections
            break
        case "deck":
            entityParent = "section"
            reduxAction = alterDecks
            break
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputVal(e.target.value)
    }

    function validateForm() {
        if (inputVal.includes("/") 
            || inputVal.includes("#")
            || inputVal.includes("%")) return "Please try to keep it alphanumeric (✨emojis are allowed✨)"
        return false
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!validateForm()){
            if (entity === "section")   {await postEntity(entity, {UserID: Number(parentID), title: inputVal, Color: chosenColor.color}).then(() => setInputVal(""))}
            else if (entity === "deck") {await postEntity(entity, {SectionID: Number(parentID), title: inputVal, Color: chosenColor.color}).then(() => setInputVal(""))}
            await getEntity(entityParent, parentID).then((resp) => dispatch(reduxAction(entity === "section" ? resp.Sections : resp.Decks)))
            setChosenColor({name: "", color: ""})
        } else {
            return invalidFormToast()
        }
    }

    return (
        <div>
            <Popover initialFocusRef={initialFocusRef} >
            {({onClose}) => (
            <>
            <PopoverTrigger>
            <IconButton icon={<EditIcon />} aria-label={`Add ${entity}`} float="right" mt="4rem" />
            </PopoverTrigger>

            <PopoverContent >
            <PopoverArrow />
            <PopoverBody>
                <form onSubmit={onSubmit}>
                    <Input maxLength={35} required placeholder={`${entity} title`} value={inputVal} ref={initialFocusRef} onChange={onChange}/>
                    <Text color="red.500">{validateForm()}</Text>

                    <VStack mt="2">
                    <Menu>
                    <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
                        {chosenColor.name === "" ? "Add color" : chosenColor.name}
                    </MenuButton>   

                    <MenuList>
                        {colors.map((color, idx) => (
                            <MenuItem key={idx} onClick={() => setChosenColor({name: color.name, color: color.color})}>
                                <Box mr="2" w="25px" h="25px" borderRadius="50%" bgColor={color.color}></Box>
                                <span>{color.name}</span>
                            </MenuItem>   
                        ))}
                    </MenuList>
                    </Menu>

                    <ButtonGroup mt="4" size="sm" isAttached variant="outline">
                    <Button colorScheme="red" variant="solid" mr="-px" onClick={onClose}>Cancel</Button>
                    <Button colorScheme="green" variant="solid" type="submit">Save</Button>
                    </ButtonGroup>
                    </VStack>
                </form>
            </PopoverBody>
            </PopoverContent>
            </>
            )}
            </Popover>
        </div>
    )
}

export default PopoverForm
