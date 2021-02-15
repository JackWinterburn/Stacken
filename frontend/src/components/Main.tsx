import { useState, useEffect } from "react";
import {
    Heading,
    VStack,
    Divider,
    Button,
    Box,
    useColorMode,
} from "@chakra-ui/react";
import { PopoverSectionForm } from "./PopoverSectionForm";
import { ContextMenuItems } from "./ContextMenuItems";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios, { AxiosRequestConfig } from "axios";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { alterSections } from "../actions/actions";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function Main() {
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.isLoggedIn);
    const sections: any[] = useSelector(
        (state: RootStateOrAny) => state.sections
    );
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [cookie] = useCookies(["UUID"]);
    const { colorMode } = useColorMode();

    useEffect(() => {
        if (!isLoggedIn) {
            setRedirect(true);
        } else {
            getSectionsByUser(cookie.UUID);
        }
    }, []);

    const getSectionsByUser = async (UUID: string | number) => {
        const options: AxiosRequestConfig = {
            url: `http://localhost:8080/user/${UUID}`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };

        let res = await axios(options);
        dispatch(alterSections(res.data.Sections));
    };

    const putSectionsByUser = () => {
        let bgcolor = "";
        colorMode === "dark" ? (bgcolor = "#1A202C") : (bgcolor = "whitesmoke");
        const sectionsElt = sections.map((section: any, key: number) => (
            <Box key={key}>
                <ContextMenuTrigger id={section.ID}>
                    <Button
                        minWidth="15rem"
                        m="0.5rem 1rem"
                        colorScheme="blue"
                        id={section.ID}
                    >
                        {section.Title}
                    </Button>
                </ContextMenuTrigger>

                <ContextMenu
                    id={section.ID}
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
                    <ContextMenuItems id={section.ID} />
                </ContextMenu>
            </Box>
        ));
        return sectionsElt;
    };

    return redirect ? (
        <Redirect to="login" />
    ) : (
        <>
            <div style={{ margin: "auto", width: "60%", textAlign: "center" }}>
                <Heading>Sections</Heading>

                <Divider orientation="horizontal" />
                <VStack border="1px solid #eee" borderRadius="5px">
                    {putSectionsByUser()}
                </VStack>
            </div>
            <div style={{ margin: "auto", width: "60%", textAlign: "right" }}>
                <PopoverSectionForm />
            </div>
        </>
    );
}

export default Main;
