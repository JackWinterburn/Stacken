import { useRef, useState, useEffect } from "react";
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
import { useCookies } from "react-cookie";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { alterSections } from "../actions/actions";

export function PopoverSectionForm() {
    const [sectionTitle, setSectionTitle] = useState("");
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = useRef(null);
    const [cookie] = useCookies(["UUID"]);
    const dispatch = useDispatch();
    const sections = useSelector((state: RootStateOrAny) => state.sections);
    let UUID: string;

    useEffect(() => {
        UUID = cookie.UUID;
    });

    const handleFormSubmit = async (id: number) => {
        const options: AxiosRequestConfig = {
            url: "http://localhost:8080/create/section",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                title: sectionTitle,
                UserID: id,
            },
        };

        let res = await axios(options);
        let sectionsToDispatch = sections.concat([res.data.Value]);
        dispatch(alterSections(sectionsToDispatch));
        setSectionTitle("");
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
                    aria-label="Add Section"
                    icon={<AddIcon />}
                />
            </PopoverTrigger>
            <PopoverContent p="7">
                <PopoverArrow />
                <PopoverCloseButton />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit(Number(UUID));
                    }}
                >
                    <InputGroup>
                        <Input
                            ref={firstFieldRef}
                            placeholder="New Section Title"
                            value={sectionTitle}
                            onChange={(e) => setSectionTitle(e.target.value)}
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
