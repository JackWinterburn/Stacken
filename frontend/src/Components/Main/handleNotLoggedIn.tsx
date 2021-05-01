import React from 'react'
import { useSelector, RootStateOrAny } from "react-redux"
import { Redirect } from "react-router-dom"

function getCookie(name: string): string | null {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}

export function HandleNotLoggedIn() {
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.isLoggedIn)
    const UUID = getCookie("UUID")

    if (!isLoggedIn || UUID === null) {
        return (
            <Redirect to="login" />
        )
    } else {
        return <></>
    }

}
