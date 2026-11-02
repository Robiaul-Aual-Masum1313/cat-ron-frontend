
"use client";

// import { toast } from "sonner";
import { BookOpen } from "lucide-react";
import { useSession } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBookPage() {


    const {data:session} = useSession()
    const sessionUser = session?.user



  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const formEntries = Object.fromEntries(formData.entries())
      const data = {
        username: sessionUser?.name,
        email: sessionUser?.email,
        userimage: sessionUser?.image,
        ...formEntries,
        totalCopies: Number(formEntries.totalCopies),
        availableCopies:  Number(formEntries.totalCopies)
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`,{
        method: 'POST',
        headers:{
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
      })
      const resultData = await res.json()
      if(resultData){
        toast.success("Book added successfully!");
      }
       
      // if (!res.ok) {
        
      // }

    } catch (error) {
      toast.error("Failed to add book.");
      console.log(error);
      
    } 
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClass = "mb-2 block text-sm font-medium";

  return (
    <div className="mx-auto w-2xl  lg:w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="size-7" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Add a New Book
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Share a new book with the BookNook community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
      >
        {/* Book Title */}
        <div>
          <label htmlFor="title" className={labelClass}>
            Book Title *
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter book title"
            maxLength={120}
            required
            className={inputClass}
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className={labelClass}>
            Author Name *
          </label>

          <input
            id="author"
            name="author"
            type="text"
            placeholder="Enter author name"
            maxLength={100}
            required
            className={inputClass}
          />
        </div>

        {/* Category and Copies */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelClass}>
              Category *
            </label>

            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select category
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="totalCopies" className={labelClass}>
              Total Copies *
            </label>

            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min={1}
              max={100}
              step={1}
              placeholder="Enter total copies"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className={labelClass}>
            Book Cover Image *
          </label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="EnterYour image link"
            required
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Short Description *
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            placeholder="Write a short description about this book..."
            required
            className={`${inputClass} resize-y`}
          />

          <p className="mt-1 text-xs text-muted-foreground">
            Maximum 500 characters.
          </p>
        </div>

        {/* Logged-in User Information */}
        <div className="grid gap-6 rounded-xl bg-muted/40 p-4 sm:grid-cols-2">
          <div>
            <label htmlFor="userName" className={labelClass}>
              User Name
            </label>

            <input
              id="userName"
              type="text"
              value={sessionUser?.name}
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
          </div>

          <div>
            <label htmlFor="userEmail" className={labelClass}>
              User Email
            </label>

            <input
              id="userEmail"
              type="email"
              value={sessionUser?.email}
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
              <BookOpen className="size-4" />
              Add Book

        </button>
      </form>
    </div>
  );
}
