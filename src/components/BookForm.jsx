import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
    const [book, setBook] = useState({ title: '', author: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/books/${id}`);
            setBook(response.data);
        } catch (err) {
            console.error('Failed to fetch book:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/books/${id}`, book);
            } else {
                await axios.post('http://localhost:3000/api/books', book);
            }
            navigate('/');
        } catch (err) {
            console.error('Failed to save book:', err);
        }
    };

    useEffect(() => {
        if (id) fetchBook();
    }, [id]);

    return (
        <div>
            <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'} Book</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default BookForm;
