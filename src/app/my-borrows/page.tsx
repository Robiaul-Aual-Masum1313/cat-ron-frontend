import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
import MyBorrowsClient from "@/components/BorrowsBooks/BorrowedBookData";
import { IBorrowedBook } from "@/types/dataTypes";
import { Metadata } from "next";
import getTokenFromServer from "@/lib/getTokenFromServer";
export const metadata: Metadata ={
  title:"My Borrows"
}

export default async function MyBorrowsPage() {
  // Check logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
 const JWTtoken = await getTokenFromServer()

 
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${session?.user.email}`,{
  headers:{
    authorization: `Bearer ${JWTtoken}`
  }
})
const resData : IBorrowedBook[] = await res.json()


  return <MyBorrowsClient initialBooks={resData} />;
}