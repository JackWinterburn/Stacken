export function storeInCookies({authToken, UUID}: {authToken: string, UUID: string}) {
    const authTokenCookie = `authToken=${authToken}`
    const UUIDCookie = `UUID=${UUID}`

    document.cookie=authTokenCookie
    document.cookie=UUIDCookie
}