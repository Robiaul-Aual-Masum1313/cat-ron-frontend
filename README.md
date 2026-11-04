# 📚 BookNook – Online Library Management System

**BookNook** is an online library management platform where users can explore books, borrow their favorite titles, and manage their personal book collections. It provides a simple and user-friendly experience for discovering and managing books.

🌐 **Live Website:** [Visit BookNook](https://cat-ron-frontend.vercel.app)

## ✨ Features

- 📖 **Browse All Books:** Explore a collection of books with details such as title, author, category, and availability.
- 🔍 **Book Details:** View detailed information about each book, including its description, total copies, and available copies.
- ➕ **Add New Books:** Authenticated users can add books to the library with relevant information.
- ✏️ **Manage Your Books:** Users can edit or delete the books they have added.
- 📚 **Borrow Books:** Borrow available books and keep track of borrowing information.
- 🔄 **Return Books:** Return borrowed books and automatically update the available copy count.
- 👤 **Authentication:** Secure user authentication to access personalized features.
- 🏠 **Dynamic Homepage:** Discover new arrivals, explore popular categories, and learn how the borrowing process works.
- 📱 **Responsive Design:** Enjoy a consistent experience across desktop, tablet, and mobile devices.
- ⏳ **Loading Experience:** Smooth loading indicators while data is being fetched.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Better Auth
- shadcn/ui
- Lucide React

## 🚀 Getting Started

Follow these steps to run BookNook on your local machine.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Robiaul-Aual-Masum1313/cat-ron-frontend.git
```

Navigate to the project directory:

```bash
cd BookNook
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of your project.

Add the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name

BETTER_AUTH_SECRET=your_better_auth_secret

GOOGLE_CLIENT_ID = Your Google client ID for Google authentication

GOOGLE_CLIENT_SECRET = Your Google client Secret for Google authentication

NEXT_PUBLIC_API_URL=http://localhost:8000/ Or your backend server URL

```

Replace the placeholder values with your actual credentials.

**Note:** Configure the environment variables according to your authentication, database. Never share your secret keys publicly.

### 4. Run the Development Server

Start the local development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

You should now be able to explore BookNook locally!

### 5. Build for Production

To create a production build, run:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🌐 Live Demo

Explore the website here:

👉 [https://cat-ron-frontend.vercel.app](https://cat-ron-frontend.vercel.app)

## 📌 Project Purpose

BookNook aims to make library management easier by providing a centralized platform for discovering books, managing book collections, and handling borrowing and returning activities.

---

**Built with ❤️ using Next.js and modern web technologies.**