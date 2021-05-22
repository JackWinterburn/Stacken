export function storeInCookies({authToken, UUID}: {authToken: string, UUID: string}) {
    const authTokenCookie = `authToken=${authToken}; Expires=Thu, 31 Dec 4000 07:28:00 GMT`
    const UUIDCookie = `UUID=${UUID}; Expires=Thu, 31 Dec 4000 07:28:00 GMT`

    document.cookie=authTokenCookie
    document.cookie=UUIDCookie
}