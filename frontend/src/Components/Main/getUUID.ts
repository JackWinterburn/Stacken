export function getUUID() {
    let c = document.cookie
    return c.substr(c.indexOf("UUID=" + 5))
}