import { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook, updateBook } from "../api/bookApi";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import "../App.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [alert, setAlert] = useState(null);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => { loadBooks(); }, []);

  const showAlert = (msg, type="success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, data);
        showAlert("Book updated successfully");
        setEditingBook(null);
      } else {
        await addBook(data);
        showAlert("Book added successfully");
      }
      loadBooks();
    } catch {
      showAlert("Operation failed", "error");
    }
  };

  return (
    <div className="container">
      <h2>Book Inventory</h2>

      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.msg}
        </div>
      )}

      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        cancelEdit={() => setEditingBook(null)}
      />

      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
        <BookTable
          books={books}
          onEdit={setEditingBook}
          onDelete={async id => {
            await deleteBook(id);
            showAlert("Book deleted successfully");
            loadBooks();
          }}
        />
      </div>
    </div>
  );
}
