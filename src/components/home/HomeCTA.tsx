import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-indigo-700 to-violet-800 px-6 py-16 text-center text-white sm:px-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/15">
          <BookOpen className="size-7" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Your Next Chapter Starts Here.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
          Explore our collection, discover new stories, and make reading a
          part of your everyday life.
        </p>

        <Link
          href="/books"
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-lg bg-white px-7 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
        >
          Browse All Books
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}