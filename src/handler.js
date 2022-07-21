const { nanoid } = require('nanoid');
const books = require('./books');

// Handler Menambahkan Data Buku
const addBookHandler = (request, h) => {

    // Disimpan di body request
    const { 
        name, year, author, summary, 
        publisher, pageCount, readPage, reading
    } = request.payload;

    // Buat id 
    const id = nanoid(16);

    // Tambah inserted dan updated
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    let finished = null;

    // Cek buku selesai dibaca atau belum
    if (pageCount === readPage) {
        finished = true;
    } else {
        finished = false;
    }

    // Simpan data buku sebagai objek baru
    const newBook = {
        id, name, year, author, summary, publisher, 
        pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    // Cek Dulu: Properti 'name' kosong atau tidak
    if (newBook.name === undefined || newBook.name === null || newBook.name === "") {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    // Cek Dulu: properti readPage > pageCount?
    if (newBook.readPage > newBook.pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    // Simpan data buku
    books.push(newBook);

    // Cek berhasil atau tidak ditambahkan
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    // Jika berhasil
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } 
    // Jika gagal
    else {
        const response = h.response({
            status: "fail",
            message: "Buku gagal ditambahkan",
        });
        response.code(500);
        return response;
    }

};

// Handler Menampilkan Seluruh Data Buku 
const getAllBooksHandler = (request, h) => {

    // Melakukan map terhadap data di array books[]
    // Yang dicari id, name, dan publisher
    const filterBook = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    const response = h.response({
        status: "success",
        data: {
            books: filterBook,
        },
    });
    response.code(200);
    return response;

};

// Handler Menampilkan Buku Secara Spesifik
const getBookByIdHandler = (request, h) => {

    // dapat id dari request.params
    const { bookId } = request.params;

    // Cek ada tidak buku dengan id tsb
    const book = books.filter((b) => b.id === bookId)[0];

    // Jika ada
    if (book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    } 
    // Jika tidak ada
    else {
        const response = h.response({
            status: "success",
            message: "Buku tidak ditemukan",
        });
        response.code(404);
        return response;
    }

}

// Handler Untuk Edit Data Buku
const editBookByIdHandler = (request, h) => {

    // Dapatkan id dari request.params
    const { bookId } = request.params

    // Mendapatkan data buku terbaru
    // Melalui body request
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Cek input name terisi / tidak
    if (name === undefined || name === null || name === "") {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    // Cek apakah readPage > pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    // Update data updateAt
    const updatedAt = new Date().toISOString();

    // Dapatkan id didalam array
    const index = books.findIndex((book) => book.id === bookId);

    // Jika index != -1 (ditemukan id-nya)
    if (index !== -1) {

        // Update data 
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        };

        // response bila berhasil update data
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
    // Jika index = -1 (tidak ditemukan id-nya) 
    else {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    }

}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler };