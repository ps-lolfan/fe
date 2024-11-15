import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/books');
            setBooks(response.data);
        } catch (err) {
            setError('Failed to fetch books');
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/books/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>Book List</h2>
                <Link to="/add" className="btn btn-primary">Add Book</Link>
            </div>
            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <Link to={`/edit/${book._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                    <button onClick={() => deleteBook(book._id)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookList;
