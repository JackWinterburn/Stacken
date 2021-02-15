import axios, { AxiosRequestConfig } from "axios";

export const deleteEntity = async (id: number, entity: string) => {
    const options: AxiosRequestConfig = {
        url: `http://localhost:8080/delete/${entity}/${id}`,
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    };

    let res = await axios(options);
    return res;
};
