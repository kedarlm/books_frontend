import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  author: "",
  publisher: "",
  publishedDate: "",
  description: ""
};

export default function BookForm({ onSubmit, editingBook, cancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingBook) {
      setForm({
        ...editingBook,
        publishedDate: editingBook.publishedDate?.slice(0, 10)
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingBook]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        required
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="author"
        required
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
      />
      <input
        name="publisher"
        placeholder="Publisher"
        value={form.publisher}
        onChange={handleChange}
      />
      <input
        type="date"
        name="publishedDate"
        value={form.publishedDate}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button className="primary">
        {editingBook ? "Update Book" : "Add Book"}
      </button>

      {editingBook && (
        <button
          type="button"
          className="secondary"
          onClick={() => {
            cancelEdit();
            setForm(emptyForm);
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
