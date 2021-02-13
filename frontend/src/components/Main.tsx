import { useState, useEffect } from "react";
import { Heading, VStack, Divider, Button } from "@chakra-ui/react";
import { PopoverSectionForm } from "./PopoverSectionForm";
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
        console.log(sections);

        const sectionsElt = sections.map((section: any, key: number) => (
            <VStack key={key}>
                <Button
                    minWidth="15rem"
                    m="0.5rem 1rem"
                    colorScheme="blue"
                    id={section.ID}
                >
                    {section.Title}
                </Button>
            </VStack>
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

                {putSectionsByUser()}
            </div>
            <div style={{ margin: "auto", width: "60%", textAlign: "right" }}>
                <PopoverSectionForm />
            </div>
        </>
    );
}

export default Main;
