import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/bookApi";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook(id).then(res => setBook(res.data));
  }, []);

  if (!book) return null;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Publisher:</b> {book.publisher}</p>
      <p><b>Published:</b> {book.publishedDate?.slice(0,10)}</p>
      <div style={{ margin: "20px" }}>
      <p><b>Description:</b> {book.description}</p>
      </div>
    </div>
  );
}
