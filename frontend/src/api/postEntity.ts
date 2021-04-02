type jsonQuery = {
    UserID    :      number;
    SectionID?:      number;
    DeckID   ?:      number;
    title    ?:      string;
    question ?:      string;
    answer   ?:      string;
}

export async function postEntity(entity: "section" | "deck" | "card", requestedCreationData: jsonQuery) {
    const response = await fetch(`http://localhost:8080/create/${entity}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestedCreationData)
    });

    return response.json()
}