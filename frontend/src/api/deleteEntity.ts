export async function deleteEntity(entity: "section" | "deck" | "card", ID: number | string) {
    const response = await fetch(`http://192.168.0.31:8080/delete/${entity}/${ID}`, {
        // Method has to be POST to bypass CORS issues
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response
}