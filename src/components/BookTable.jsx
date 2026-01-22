import { Link } from "react-router-dom";

export default function BookTable({ books, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td>
              <Link to={`/book/${book._id}`}>{book.title}</Link>
            </td>
            <td>{book.author}</td>
            <td>
              <button className="secondary" onClick={() => onEdit(book)}>Edit</button>
              <button
                className="danger"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this book?")) {
                    onDelete(book._id);
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
