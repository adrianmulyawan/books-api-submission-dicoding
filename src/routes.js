const { addBookHandler } = require('./handler');

const routes = [
    // Menambahkan data buku
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
]

module.exports = routes;