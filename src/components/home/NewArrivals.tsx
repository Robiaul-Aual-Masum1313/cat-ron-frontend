import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Book} from "@/types/dataTypes";
export default async function NewArrivals() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
        const books: Book[] = await res.json()
  return (<>
          {/* New Arrivals */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Fresh from our library
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                New Arrivals
              </h2>

              <p className="mt-3 max-w-xl text-muted-foreground">
                Discover the latest additions to our collection. Your next
                favorite book might be waiting here.
              </p>
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline"
              >
              View All Books
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Books Grid */}
          {books.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                  <article
                  key={book._id}
                  className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                  {/* Book Image */}
                  <Link
                    href={`/books/${book._id}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-muted"
                    >
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                    <div className="absolute left-4 top-4">
                      <Badge variant="secondary">
                        {book.category}
                      </Badge>
                    </div>
                  </Link>

                  {/* Book Information */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
                      {book.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <UserRound className="size-4 shrink-0" />
                      <span className="line-clamp-1">{book.author}</span>
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
                      <p className="text-xs text-muted-foreground">
                        {book.availableCopies > 0 ? (
                            <span className="font-medium text-emerald-600">
                            {book.availableCopies} copies available
                          </span>
                        ) : (
                            <span className="font-medium text-destructive">
                            Currently unavailable
                          </span>
                        )}
                      </p>

                      <Link
                        href={`/books/${book._id}`}
                        className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                        View Details
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
              <div className="rounded-xl border border-dashed px-6 py-16 text-center">
              <BookOpen className="mx-auto size-12 text-muted-foreground" />

              <h3 className="mt-4 text-xl font-semibold">
                No Books Available Yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Our collection is waiting for its first additions.
              </p>

              <Link
                href="/books"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                Explore Books
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}

          {/* See All Books */}
          <div className="mt-10 text-center">
            <Link
              href="/books"
              className="inline-flex h-12 items-center gap-3 rounded-lg border px-7 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
              See All Books
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
  </>);
}
