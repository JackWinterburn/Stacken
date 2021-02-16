import axios, { AxiosRequestConfig } from "axios";

export const login = async (email: string, password: string) => {
    const options: AxiosRequestConfig = {
        url: "http://localhost:8080/login",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
            email,
            password,
        },
    };

    let res = await axios(options);
    let value = res.data.token;

    if (!res.data.status) {
        return { successful: false, errmsg: res.data.message, value: "" };
    } else return { successful: true, errmsg: res.data.user.ID, value };
};
