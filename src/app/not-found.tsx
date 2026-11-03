import Link from "next/link";
import { BookOpen, ArrowLeft, Search } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata ={
  title: 'Not Found'
}

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-xl text-center">

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex size-36 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="size-16 text-primary" />

          <span className="absolute -right-2 -top-2 flex size-12 items-center justify-center rounded-full bg-destructive text-xl font-bold text-white shadow-lg">
            ?
          </span>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-primary sm:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Looks like this page has gone on a little adventure!
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to your reading journey.
        </p>

        {/* Back to Home */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border px-7 text-sm font-semibold transition-colors hover:bg-muted sm:w-auto"
          >
            <Search className="size-4" />
            Browse Books
          </Link>
        </div>

        {/* Branding */}
        <p className="mt-12 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">BookNook</span>
          {" "}— Every Book Opens a New World.
        </p>
      </div>
    </main>
  );
}
