export const dynamic = "force-dynamic";
import BookCard from "@/components/books/bookCard";
import { Book } from "@/types/dataTypes";
import { BookOpen } from "lucide-react";




export default async function BooksPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
    const books : Book[] = await res.json()

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BookOpen className="size-4" />
            BookNook Collection
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Books
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Discover your next favorite read from our collection
            of books across different categories.
          </p>
        </div>

        {/* Book Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            All Books
          </h2>

          <p className="text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? "Book" : "Books"} found
          </p>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-4 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="size-8" />
            </div>

            <h2 className="text-xl font-semibold">
              No Books Found
            </h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Our collection is currently empty. Check back
              later for new books.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
