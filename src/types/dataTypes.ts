export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  username: string;
  email: string;
  userimage: string;
  availableCopies: number;
}

export interface IBorrowedBook {
  _id: string;
  BookID: string;
  BookTitle: string;
  BookImage: string;
  UserEmail: string;
  BorrowDate: string;
  ReturnDate: string;
}
