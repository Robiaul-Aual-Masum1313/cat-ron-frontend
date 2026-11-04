
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Book } from "@/types/dataTypes";
import MyBooksEdit from "@/components/myBooks/editForm";
import { Metadata } from "next";
import getTokenFromServer from "@/lib/getTokenFromServer";

export const metadata: Metadata = {
  title: 'My Books'
}

export default async function MyBooksPage() {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const JWTtoken = await getTokenFromServer()
  const user = session?.user
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mybooks/${user?.email}`,{
    headers:{
      authorization: `Bearer ${JWTtoken}`
    }
  })
  const books : Book[] = await res.json()

//   if (!session) {
//     redirect("/login");
//   }
  return <MyBooksEdit initialBooks={books} />;
}
