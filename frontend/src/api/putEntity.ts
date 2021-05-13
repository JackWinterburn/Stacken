type jsonQuery = {
    UserID   ?:      number;
    SectionID?:      number;
    DeckID   ?:      number;
    ID       ?:      number;
    title    ?:      string;
    Front    ?:      string;
    Back     ?:      string;
}

export async function putEntity(entity: "section" | "deck" | "card", requestedCreationData: jsonQuery) {
    const response = await fetch(`http://localhost:8080/update/${entity}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestedCreationData)
    });

    return response.json()
}