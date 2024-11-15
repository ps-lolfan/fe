import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const App = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Book Manager</h1>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </div>
  );
};

export default App;
