const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deletBookByIdHandler } = require('./handler');

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
    // Ubah Data Buku
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    // Hapus Data Buku
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deletBookByIdHandler,
    }
]

module.exports = routes;