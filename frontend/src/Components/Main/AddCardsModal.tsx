import React, { useState, useEffect, useRef } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Textarea,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { postEntity } from "../../api/postEntity"

function AddCardsModal({isOpen, onClose, setAmntOfCardsInDeck}: {isOpen: boolean; onClose: () => void, setAmntOfCardsInDeck: React.Dispatch<React.SetStateAction<number | undefined>>}) {
    const { deckID } = useParams<{deckID: string}>()
    const [inputState, setInputState] = useState({
        front: "",
        back: ""
    })
    const submitRef = useRef<any>()
    const frontTextareaRef = useRef<any>()

    useEffect(() => {
        document.addEventListener("keydown", ctrlPlusEnterHandler)
        return () => { document.removeEventListener("keydown", ctrlPlusEnterHandler) }
    })
    
    
    // Add keyboard shortcut for ctrl+enter to submit the form
    function ctrlPlusEnterHandler(e: KeyboardEvent) {
        //clicking the submit button is easier than creating my own system for form validation
        if((e.key==="Enter" && e.ctrlKey) && (isOpen)) submitRef.current.click() 
    }
    
    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }
    
    async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
        if(e !== undefined) e.preventDefault()
            await postEntity("card", {DeckID: Number(deckID), Front: inputState.front, Back: inputState.back})
            setInputState({ front: "", back: "" })
            frontTextareaRef.current.focus()
            setAmntOfCardsInDeck(prevState => prevState !== undefined ? prevState + 1 : undefined)
    }

    return (
        <div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Create a Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                <FormLabel>Front</FormLabel>
                <Textarea 
                    autoFocus 
                    ref={frontTextareaRef} 
                    name="front" 
                    value={inputState.front} 
                    onChange={onChange} placeholder="What does DNA stand for?"/>

                <FormLabel mt="3">Back</FormLabel>
                <Textarea name="back" value={inputState.back} onChange={onChange} placeholder="Deoxyribonucleic Acid"/>
                </FormControl>

                <Button ref={submitRef} float="right" mt="6" type="submit" variant="outline" colorScheme="blue">Add Card</Button>  
            </form>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
        </ModalContent>
        </Modal>
        </div>
    )
}

export default AddCardsModal
