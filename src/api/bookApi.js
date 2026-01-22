import axios from "axios";

const API = "https://api-books-inventory.onrender.com/api/books";

export const getBooks = () => axios.get(API);
export const getBook = (id) => axios.get(`${API}/${id}`);
export const addBook = (data) => axios.post(API, data);
export const updateBook = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API}/${id}`);
