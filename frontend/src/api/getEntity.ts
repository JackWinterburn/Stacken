import axios, { AxiosRequestConfig } from "axios";

export const getEntity = async (entity: string, id: number | string) => {
    const options: AxiosRequestConfig = {
        url: `http://localhost:8080/get/${entity}/${id}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
    };

    let res = await axios(options);
    return res.data;
};
