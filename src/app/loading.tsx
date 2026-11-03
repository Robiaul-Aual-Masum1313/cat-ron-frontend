import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-5">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="size-16 animate-spin rounded-full border-4 border-muted border-t-primary" />

        <BookOpen className="absolute size-6 text-primary" />
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">
          Loading BookNook...
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please wait while we prepare your experience.
        </p>
      </div>
    </main>
  );
}