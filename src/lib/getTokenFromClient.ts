import { authClient } from "./auth-client"


export const gttTokenFromClient = async () => {
    const {data} = await authClient.token()
    const jwtToken = data?.token
    return jwtToken
}