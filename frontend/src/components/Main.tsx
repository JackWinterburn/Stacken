import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import { getEntity } from "../api/getEntity";
import { RootStateOrAny, useSelector } from "react-redux";

function Main() {
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.isLoggedIn);

    return (
        <div>
            <Heading>Main Page</Heading>
            <p>{isLoggedIn ? "logged in" : "not logged in"}</p>
        </div>
    );
}

export default Main;
