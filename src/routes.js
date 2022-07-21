const { addBookHandler, getAllBooksHandler } = require('./handler');

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
]

module.exports = routes;