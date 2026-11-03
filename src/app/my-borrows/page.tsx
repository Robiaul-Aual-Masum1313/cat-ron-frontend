import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
import MyBorrowsClient from "@/components/BorrowsBooks/BorrowedBookData";
import { IBorrowedBook } from "@/types/dataTypes";
import { Metadata } from "next";
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

  // Connect to MongoDB
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGODB_DB);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${session?.user.email}`)
const resData : IBorrowedBook[] = await res.json()

  // Fetch only books borrowed by the logged-in user
//   const borrowedBooks = await db
//     .collection("borrows")
//     .find({
//       userEmail: session.user.email,
//     })
//     .sort({ borrowDate: -1 })
//     .toArray();

//   // Convert MongoDB values into serializable values
//   const books: BorrowedBook[] = borrowedBooks.map((borrow) => ({
//     _id: borrow._id.toString(),
//     bookId: borrow.bookId.toString(),
//     bookTitle: borrow.bookTitle,
//     bookImage: borrow.bookImage,
//     userEmail: borrow.userEmail,
//     borrowDate: new Date(borrow.borrowDate).toISOString(),
//     returnDate: new Date(borrow.returnDate).toISOString(),
//   }));

  return <MyBorrowsClient initialBooks={resData} />;
}