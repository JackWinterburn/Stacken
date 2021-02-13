import { useState, useEffect } from "react";
import { Heading, VStack, Divider, Button } from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import { Section } from "../types";
import { RootStateOrAny, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function Main() {
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.isLoggedIn);
    const [redirect, setRedirect] = useState(false);
    const [cookie] = useCookies(["UUID"]);
    let sections: any[] = [];

    const [sectionState, setSectionState] = useState<any>([]);

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
        setSectionState((prevState: any) => (prevState = res.data.Sections));
    };

    const putSectionsByUser = () => {
        if (sectionState === [] || sectionState === undefined) {
            return;
        }

        const sectionsElt = sectionState.map((section: any, key: number) => (
            <Button colorScheme="blue" key={key}>
                {section.Title}
            </Button>
        ));
        return sectionsElt;
    };

    return redirect ? (
        <Redirect to="login" />
    ) : (
        <div>
            <Heading>Main Page</Heading>
            <Divider orientation="horizontal" />

            {console.log(sectionState)}

            {putSectionsByUser()}
        </div>
    );
}

export default Main;
