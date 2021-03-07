import { RegistrationUserInfo } from "../types";

export async function register(userInfo: RegistrationUserInfo) {
    const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });

    return response.json();
}