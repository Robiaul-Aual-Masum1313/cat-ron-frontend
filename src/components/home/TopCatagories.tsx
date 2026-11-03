import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  Shapes,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories that spark imagination.",
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    name: "Science",
    description: "Discover how the world works.",
    icon: FlaskConical,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "History",
    description: "Explore the stories of our past.",
    icon: Landmark,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "Kids",
    description: "Fun adventures for young minds.",
    icon: Baby,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Others",
    description: "Something different for everyone.",
    icon: Shapes,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Explore by interest
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Top Categories
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Find books that match your interests and discover something
              wonderful to read.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore all books
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href="/books"
                className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex size-14 items-center justify-center rounded-xl ${category.color}`}
                >
                  <Icon className="size-7" />
                </div>

                <h3 className="text-lg font-semibold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                  Explore
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}