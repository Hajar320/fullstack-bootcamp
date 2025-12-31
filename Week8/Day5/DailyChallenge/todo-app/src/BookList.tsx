import React, { useState } from "react";
import List from "./components/List";

type Book = {
  id: number;
  title: string;
  author: string;
};

const BookApp: React.FC = () => {
  // State for books
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" },
  ]);

  // State for form inputs
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const addBook = () => {
    if (!title || !author) return;

    const newBook: Book = {
      id: Date.now(), // simple unique id
      title,
      author,
    };

    setBooks((prev) => [...prev, newBook]);

    // Clear inputs
    setTitle("");
    setAuthor("");
  };

  return (
    <div>
      <h1>Book List</h1>
      {/* Book List */}
      <List
        items={books}
        renderItem={(book: Book) => (
          <div key={book.id}>
            <strong>{book.title}</strong> by {book.author}
          </div>
        )}
      />
      {/* Input Form */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginLeft: "5px" }}
        />
        <button onClick={addBook} style={{ marginLeft: "5px" }}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default BookApp;
