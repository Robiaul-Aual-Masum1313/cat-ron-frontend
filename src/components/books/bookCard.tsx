
import Image from "next/image";
import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";
import { Book } from "@/types/dataTypes";



interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Book Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={book.image}
          alt={book.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {book.category}
        </span>
      </div>

      {/* Book Information */}
      <div className="space-y-4 p-5">
        <div>
          <h2 className="line-clamp-1 text-lg font-semibold tracking-tight">
            {book.title}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound className="size-4 shrink-0" />
            {book.author}
          </p>
        </div>

        {/* View Details Button */}
        <Link
          href={`/books/${book._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <BookOpen className="size-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}
