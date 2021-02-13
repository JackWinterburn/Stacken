import axios, { AxiosRequestConfig } from "axios";
import { Section } from "../types";

export const GetUserSections = ({ ID }: { ID: string | number }) => {
    const options: AxiosRequestConfig = {
        url: `http://localhost:8080/user/${ID}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
    };

    let sectionRes: any = axios(options).then((res) => {
        let sections = res.data.Sections;
        console.log(sections);

        return (
            <>
                {sections.map((section: Section, key: number) => (
                    <div key={key} id={section.ID}>
                        {section.Title}
                    </div>
                ))}
            </>
        );
    });

    console.log(sectionRes);
};
