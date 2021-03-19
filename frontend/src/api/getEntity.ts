export async function getEntity(entity: "user" | "section" | "deck" | "card", parentID: string | number) {
    const response = await fetch(`http://localhost:8080/get/${entity}/${parentID}`, {
        method: "Get",
        headers: {
            "Content-Type": "application/json"
        },
    });

    return response.json()
}