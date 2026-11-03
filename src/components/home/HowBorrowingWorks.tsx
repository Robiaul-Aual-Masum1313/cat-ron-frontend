import Link from "next/link";
import {
  Search,
  BookmarkCheck,
  BookCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Book",
    description:
      "Explore our collection and discover a book that matches your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow Your Book",
    description:
      "Open the book details, check availability, and confirm your borrowing request.",
    icon: BookmarkCheck,
  },
  {
    number: "03",
    title: "Read & Return",
    description:
      "Enjoy your reading journey and return the book when you're finished.",
    icon: BookCheck,
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Simple and convenient
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How Borrowing Works
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Getting your next favorite book is easy. Follow these three
            simple steps and start reading.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden border-t-2 border-dashed border-border md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-7 flex size-20 items-center justify-center rounded-2xl border bg-background shadow-sm">
                  <Icon className="size-9 text-primary" />
                </div>

                <span className="mb-3 text-xs font-bold tracking-widest text-primary">
                  STEP {step.number}
                </span>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/books"
            className="inline-flex h-12 items-center gap-3 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Exploring
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}