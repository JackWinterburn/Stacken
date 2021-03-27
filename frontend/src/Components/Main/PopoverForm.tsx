import React, { useRef, useState } from 'react'
import {
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Input,
    ButtonGroup,
    Button,
} from "@chakra-ui/react"

import { EditIcon } from "@chakra-ui/icons"


function PopoverForm() {
    // TODO: Get rid of this disgusting "any" type
    const initialFocusRef = useRef<any>()
    const [inputVal, setInputVal] = useState("")

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputVal(e.target.value)
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(`Form submitted: ${inputVal}`)
    }

    return (
        <div>
            <Popover initialFocusRef={initialFocusRef} placement="left">
            {({onClose}) => (
            <>
            <PopoverTrigger>
            <IconButton icon={<EditIcon />} aria-label="Add section" float="right" mt="4rem" />
            </PopoverTrigger>

            <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
                <form onSubmit={onSubmit}>
                    <Input placeholder="Section title" value={inputVal} ref={initialFocusRef} onChange={onChange}/>
                    <ButtonGroup mt="4" size="sm" isAttached variant="outline">
                    <Button bg="red.300" mr="-px" onClick={onClose}>Cancel</Button>
                    <Button bg="green.300" type="submit">Save</Button>
                    </ButtonGroup>
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
