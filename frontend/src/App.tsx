import React from "react";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { signin, signout } from "./actions/actions";
import { useCookies } from "react-cookie";

function App() {
    const dispatch = useDispatch();
    const [cookie] = useCookies();

    if (cookie.authToken) {
        dispatch(signin());
    } else {
        dispatch(signout());
    }

    return <Header />;
}

export default App;
