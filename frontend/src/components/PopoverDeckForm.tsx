import { useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
    useDisclosure,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Input,
    PopoverTrigger,
    IconButton,
    Button,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { alterDecks } from "../actions/actions";

export function PopoverDeckForm({ id }: { id: number }) {
    const [deckTitle, setDeckTitle] = useState("");
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = useRef(null);
    const dispatch = useDispatch();
    const decks = useSelector((state: RootStateOrAny) => state.decks);

    const handleFormSubmit = async () => {
        const options: AxiosRequestConfig = {
            url: "http://localhost:8080/create/deck",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                title: deckTitle,
                SectionID: id,
            },
        };

        let res = await axios(options);
        let decksToDispatch = decks.concat([res.data.Value]);
        dispatch(alterDecks(decksToDispatch));
        setDeckTitle("");
    };
    return (
        <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <IconButton
                    mt="3rem"
                    size="md"
                    aria-label="Add Deck"
                    icon={<AddIcon />}
                />
            </PopoverTrigger>
            <PopoverContent p="7">
                <PopoverArrow />
                <PopoverCloseButton />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                    }}
                >
                    <InputGroup>
                        <Input
                            ref={firstFieldRef}
                            placeholder="New Deck Title"
                            value={deckTitle}
                            onChange={(e) => setDeckTitle(e.target.value)}
                        />

                        <InputRightElement w="4.5rem">
                            <Button
                                h="1.75rem"
                                colorScheme="green"
                                type="submit"
                            >
                                Add
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </form>
            </PopoverContent>
        </Popover>
    );
}
