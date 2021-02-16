import React, { useEffect } from "react";
import { PopoverDeckForm } from "./PopoverDeckForm";
import { useParams } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { alterDecks } from "../actions/actions";
import { ContextMenuItems } from "./ContextMenuItems";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import {
    Heading,
    VStack,
    Divider,
    Button,
    useColorMode,
} from "@chakra-ui/react";

function DecksView() {
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const decks = useSelector((state: RootStateOrAny) => state.decks);
    const { colorMode } = useColorMode();

    useEffect(() => {
        getDecksBySection(id);
    }, []);

    const getDecksBySection = async (ID: string | number) => {
        const options: AxiosRequestConfig = {
            url: `http://localhost:8080/get/section/${ID}`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };

        let res = await axios(options);
        dispatch(alterDecks(res.data.Decks));
    };

    const putDecksBySection = () => {
        let bgcolor = "";
        colorMode === "dark" ? (bgcolor = "#1A202C") : (bgcolor = "whitesmoke");
        const decksElt = decks.map((deck: any, key: number) => (
            <div>
                <ContextMenuTrigger id={deck.ID}>
                    <Button minWidth="15rem" key={key}>
                        {deck.Title}
                    </Button>
                </ContextMenuTrigger>

                <ContextMenu
                    id={deck.ID}
                    style={{
                        opacity: "100%",
                        backgroundColor: bgcolor,
                        padding: "3px",
                        boxShadow: "3px 3px 20px rgba(79, 79, 79, 0.4)",
                        borderRadius: "5px",
                        border: "1px solid #3182ce",
                        zIndex: 1,
                    }}
                >
                    <ContextMenuItems id={deck.ID} entity="deck" />
                </ContextMenu>
            </div>
        ));

        return decksElt;
    };

    return (
        <div
            style={{
                textAlign: "center",
                width: "60%",
                margin: "auto",
            }}
        >
            <Heading>📦 Decks</Heading>
            <Divider mb="2rem" />
            <VStack>{putDecksBySection()}</VStack>
            <div style={{ margin: "auto", width: "60%", textAlign: "right" }}>
                <PopoverDeckForm id={Number(id)} />
            </div>
        </div>
    );
}

export default DecksView;
