import { LoginUserInfo } from "../types"

export async function login(userInfo: LoginUserInfo) {
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });

    return response.json()
}