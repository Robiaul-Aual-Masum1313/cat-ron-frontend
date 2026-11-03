"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { IBorrowedBook } from "@/types/dataTypes";

interface MyBorrowsClientProps {
  initialBooks: IBorrowedBook[];
}

export default function MyBorrowsClient({
  initialBooks,
}: MyBorrowsClientProps) {
  const router = useRouter();

  const [books, setBooks] = useState(initialBooks);
  const [returningId, setReturningId] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const handleReturnBook = async (borrowId: string, bookId: string) => {
    try {
      setReturningId(borrowId);
      const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${bookId}`, {
        method: "PATCH",
      })
      const data1 = await res1.json() 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to return the book.");
      }

      // Remove the returned book from the UI
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== borrowId),
      );

      toast.success("Book returned successfully!");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setReturningId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <BookOpen className="size-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              BookNook
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Borrowed Books
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your borrowed books and return them when you&apos;re done.
          </p>
        </div>

        {/* Borrowed Books Table */}
        {books.length > 0 ? (
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5 text-left">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Book
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Borrow Date
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Return Date
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {books.map((book) => (
                    <tr
                      key={book._id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      {/* Book Image and Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                            <Image
                              src={book.BookImage}
                              alt={book.BookImage}
                              fill
                              unoptimized
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {book.BookTitle}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Borrowed book
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(book.BorrowDate)}
                      </td>

                      {/* Return Date */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(book.ReturnDate)}
                      </td>

                      {/* Return Button */}
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={returningId !== null}
                          onClick={() => handleReturnBook(book._id, book.BookID)}
                        >
                          {returningId === book._id ? (
                            <>
                              <Loader2 className="mr-2 size-4 animate-spin" />
                              Returning...
                            </>
                          ) : (
                            <>
                              <RotateCcw className="mr-2 size-4" />
                              Return Book
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="border-t bg-muted/30 px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Total borrowed books:{" "}
                <span className="font-semibold text-foreground">
                  {books.length}
                </span>
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="size-8" />
            </div>

            <h2 className="text-xl font-semibold">
              No Borrowed Books Yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You haven&apos;t borrowed any books yet. Explore our collection and
              find something interesting to read.
            </p>

            <Link
              href="/books"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Books
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}