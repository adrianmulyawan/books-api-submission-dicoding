const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler');

const routes = [
    // Menambahkan data buku
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    // Menampilkan Seluruh Data Buku
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    // Menampilkan Detail Buku
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
]

module.exports = routes;