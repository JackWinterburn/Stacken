import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link as Clink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signout } from "../actions/actions";
import { useDispatch } from "react-redux";

function Logout() {
    const dispatch = useDispatch();
    const [, , removeCookie] = useCookies(["authToken"]);

    useEffect(() => {
        removeCookie("authToken");
        removeCookie("UUID");
        dispatch(signout());
    }, []);

    return (
        <div>
            <h1>Logout Page</h1>
            <hr />
            <h2>You have been logged out</h2>
            <Clink color="blue.500">
                <Link to="/login">Log in again</Link>
            </Clink>
        </div>
    );
}

export default Logout;
