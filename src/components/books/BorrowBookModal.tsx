"use client";

import React, { useState} from "react";
import { useRouter } from "next/navigation";
import { Bookmark} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Book } from "@/types/dataTypes";
import { useSession } from "@/lib/auth-client";


export default function BorrowBookModal({book} : {book : Book}) {
  const router = useRouter();
      const {data:session} = useSession()
      const sessionUser = session?.user

  const [open, setOpen] = useState(false);
  const BorrowDate =  new Date()
  const ReturnDate = new Date(BorrowDate)
  ReturnDate.setDate(ReturnDate.getDate() + 10)

  const handleBorrow = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const borrowData = {
         BookID: book._id,
        BookTitle: book.title,
        BookImage: book.image, 
        UserEmail: sessionUser?.email,
        BorrowDate,
        ReturnDate,
    }

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to borrow this book.");
      }

      toast.success("Book borrowed successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } 
  };

  return (
    <>
      <Button
        size="lg"
        className="w-full gap-2"
        disabled={book.availableCopies <= 0}
        onClick={() => setOpen(true)}
      >
        <Bookmark className="size-4" />
        {book.availableCopies > 0 ? "Borrow This Book" : "Currently Unavailable"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow This Book</DialogTitle>

            <DialogDescription>
              Confirm your details before borrowing{" "}
              <span className="font-semibold text-foreground">
                {book.title}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBorrow} className="space-y-5">
            {/* User Name */}
            <div className="space-y-2">
              <label
                htmlFor="borrowerName"
                className="text-sm font-medium"
              >
                User Name
              </label>

              <input
                id="borrowerName"
                type="text"
                value={sessionUser?.name}
                readOnly
                className="w-full rounded-md border bg-muted px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* User Email */}
            <div className="space-y-2">
              <label
                htmlFor="borrowerEmail"
                className="text-sm font-medium"
              >
                Email Address
              </label>

              <input
                id="borrowerEmail"
                type="email"
                value={sessionUser?.email}
                readOnly
                className="w-full rounded-md border bg-muted px-3 py-2 text-sm outline-none"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={book.availableCopies <= 0}
              >

                  Confirm Borrow
        
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}