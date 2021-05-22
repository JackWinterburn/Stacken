type jsonQuery = {
    UserID           ?: number;
    SectionID        ?: number;
    DeckID           ?: number;
    ID               ?: number;
    Title            ?: string;
    Front            ?: string;
    Back             ?: string;
    Name             ?: string;
    Email            ?: string;
    Password         ?: string;
    ProfilePictureURL?: string;
    CreatedAt        ?: string;
    DeletedAt        ?: string;
    UpdatedAt        ?: string;
}

export async function putEntity(entity: "user" | "section" | "deck" | "card", requestedCreationData: any) {
    const response = await fetch(`http://localhost:8080/update/${entity}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestedCreationData)
    });

    return response.json()
}