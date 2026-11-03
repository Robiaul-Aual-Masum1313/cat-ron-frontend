
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Book } from "@/types/dataTypes";
import MyBooksEdit from "@/components/myBooks/editForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Books'
}

export default async function MyBooksPage() {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mybooks/${user?.email}`)
  const books : Book[] = await res.json()

//   if (!session) {
//     redirect("/login");
//   }
  return <MyBooksEdit initialBooks={books} />;
}
