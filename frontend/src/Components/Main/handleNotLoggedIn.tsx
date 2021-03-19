import React from 'react'
import { useSelector, RootStateOrAny } from "react-redux"
import { Redirect } from "react-router-dom"

export function HandleNotLoggedIn() {
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.isLoggedIn)
    const cookie = document.cookie

    if (!isLoggedIn || cookie === "") {
        return (
            <Redirect to="login" />
        )
    } else {
        return <></>
    }

}
