export function getUUID() {
    let c = document.cookie
    let arr = c.split(";")

    let UUID=""
    arr.forEach(el => {
        if(el.includes("UUID")) UUID = el.substr(6)
    })
    return UUID
}