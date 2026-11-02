"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, Pencil, Trash2, UserRound, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Book } from "@/types/dataTypes";
import { toast } from "react-toastify";

interface MyBooksClientProps {
  initialBooks: Book[];
}

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-2 block text-sm font-medium";

export default function MyBooksEdit({ initialBooks }: MyBooksClientProps) {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  // Update Book
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Null guard: fixes "editingBook is possibly null"
    if (!editingBook) return;

    const formData = new FormData(e.currentTarget);
    const updateData: Record<string, unknown> = Object.fromEntries(
      formData.entries()
    );

    // FormData values are strings, so convert the number field
    updateData.totalCopies = Number(updateData.totalCopies);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      // fetch does not throw on 4xx/5xx, so check manually
      if (!res.ok) throw new Error("Update failed");

      // Update the UI immediately (useState won't re-read initialBooks)
      setBooks((prev) =>
        prev.map((b) =>
          b._id === editingBook._id ? ({ ...b, ...updateData } as Book) : b
        )
      );

      setEditingBook(null);
      toast.success("Book updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Book data not updated.");
    }
  };

  // Delete Book
  const handleDelete = async () => {
    if (!deletingBook) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${deletingBook._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      // Remove from the UI immediately
      setBooks((prev) => prev.filter((b) => b._id !== deletingBook._id));

      setDeletingBook(null);
      toast.success("Book deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Book wasn't deleted.");
    }
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <BookOpen className="size-4" />
              Your Collection
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Books
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage the books you have shared with BookNook.
            </p>
          </div>

          <Button onClick={() => router.push("/add-book")} className="gap-2">
            <Plus className="size-4" />
            Add New Book
          </Button>
        </div>

        {/* Book Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Added Books</h2>

          <p className="text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? "Book" : "Books"}
          </p>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <Badge className="absolute left-3 top-3">
                    {book.category}
                  </Badge>
                </div>

                {/* Information */}
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {book.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <UserRound className="size-4" />
                      {book.author}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Available: {book.availableCopies} / {book.totalCopies}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 border-t pt-4">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => setEditingBook(book)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      className="gap-2"
                      onClick={() => setDeletingBook(book)}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-4 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="size-8" />
            </div>

            <h2 className="text-xl font-semibold">
              You Haven&apos;t Added Any Books Yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Start building your collection by adding your first book.
            </p>

            <Button
              className="mt-5 gap-2"
              onClick={() => router.push("/add-book")}
            >
              <Plus className="size-4" />
              Add Your First Book
            </Button>
          </div>
        )}
      </section>

      {/* EDIT BOOK DIALOG */}
      <Dialog
        open={editingBook !== null}
        onOpenChange={(open) => {
          if (!open) setEditingBook(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update your book information and save your changes.
            </DialogDescription>
          </DialogHeader>

          {editingBook && (
            <form onSubmit={handleUpdate} className="space-y-5 pt-2">
              {/* Book Title */}
              <div>
                <label htmlFor="edit-title" className={labelClass}>
                  Book Title *
                </label>

                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  defaultValue={editingBook.title}
                  maxLength={120}
                  required
                  className={inputClass}
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="edit-author" className={labelClass}>
                  Author Name *
                </label>

                <input
                  id="edit-author"
                  name="author"
                  type="text"
                  defaultValue={editingBook.author}
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>

              {/* Category and Copies */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="edit-category" className={labelClass}>
                    Category *
                  </label>

                  <select
                    id="edit-category"
                    name="category"
                    defaultValue={editingBook.category}
                    required
                    className={inputClass}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-totalCopies" className={labelClass}>
                    Total Copies *
                  </label>

                  <input
                    id="edit-totalCopies"
                    name="totalCopies"
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    defaultValue={editingBook.totalCopies}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="edit-image" className={labelClass}>
                  Book Cover Image URL *
                </label>

                <input
                  id="edit-image"
                  name="image"
                  type="text"
                  defaultValue={editingBook.image}
                  placeholder="Enter image URL"
                  required
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="edit-description" className={labelClass}>
                  Short Description *
                </label>

                <textarea
                  id="edit-description"
                  name="description"
                  rows={4}
                  maxLength={500}
                  defaultValue={editingBook.description}
                  required
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  Maximum 500 characters.
                </p>
              </div>

              {/* User Information */}
              <div className="grid gap-5 rounded-xl bg-muted/40 p-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>User Name</label>
                  <input
                    value={editingBook.username}
                    readOnly
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                  />
                </div>

                <div>
                  <label className={labelClass}>User Email</label>
                  <input
                    value={editingBook.email}
                    readOnly
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingBook(null)}
                >
                  Cancel
                </Button>

                <Button type="submit" className="gap-2">
                  <Pencil className="size-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <AlertDialog
        open={deletingBook !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingBook(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                {deletingBook?.title}
              </span>{" "}
              from your collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
            >
              <Trash2 className="size-4" />
              Yes, Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}