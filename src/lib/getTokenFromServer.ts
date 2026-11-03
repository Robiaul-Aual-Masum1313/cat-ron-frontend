import { headers } from "next/headers";
import { auth } from "./auth";

export default async function getTokenFromServer(){
    const data = await auth.api.getToken({
        headers: await headers()
    })
    return data?.token
}