
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Copy,
  UserRound,
  Mail,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import BorrowBookModal from "@/components/books/BorrowBookModal";

interface singleBookProps {
  params: {
bookid: string
  }
}


export default async function BookDetailsPage({params} : singleBookProps) {
  const { bookid } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookid}`)
  const book = await res.json()

 if(!res.ok) notFound()
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Books
        </Link>

        {/* Book Details */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Book Image */}
          <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl border bg-muted shadow-lg">
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <div className="mb-4">
              <Badge variant="secondary">
                {book.category}
              </Badge>
            </div>

            {/* Title and Author */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {book.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-lg text-muted-foreground">
              <UserRound className="size-5" />
              By {book.author}
            </p>

            {/* Availability */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Copy className="size-4" />
                  Total Copies
                </div>

                <p className="mt-2 text-2xl font-bold">
                  {book.totalCopies}
                </p>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="size-4" />
                  Available Copies
                </div>

                <p className="mt-2 text-2xl font-bold text-primary">
                  {book.availableCopies}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold">
                About This Book
              </h2>

              <p className="text-sm leading-8 text-muted-foreground">
                {book.description}
              </p>
            </div>

            {/* Added By */}
            <div className="mt-8 rounded-xl border bg-muted/30 p-5">
              <h2 className="mb-4 text-sm font-semibold">
                Book Added By
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    {book.username}
                  </p>

                  <p className="flex items-center gap-2 truncate text-sm text-muted-foreground">
                    <Mail className="size-3 shrink-0" />
                    {book.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Borrow Button */}
            <div className="mt-8">
              <BorrowBookModal book = {book}/>
              {/* <Button
                size="lg"
                className="w-full gap-2"
                disabled={book.availableCopies <= 0}
              >
                <Bookmark className="size-4" />
                {book.availableCopies > 0
                  ? "Borrow This Book"
                  : "Currently Unavailable"}
              </Button> */}

              {book.availableCopies <= 0 && (
                <p className="mt-2 text-center text-xs text-destructive">
                  Sorry, all copies of this book are currently borrowed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
