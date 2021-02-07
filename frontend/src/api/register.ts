import axios, { AxiosRequestConfig } from "axios";
export const register = async (
    username: string,
    email: string,
    password: string
) => {
    const options: AxiosRequestConfig = {
        url: "http://localhost:8080/register",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
            name: username,
            email,
            password,
        },
    };

    let res = await axios(options);

    // Detail is only included in error messages
    if (res.data.Detail) {
        return false;
    } else return true;
};
