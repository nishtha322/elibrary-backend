// bookService.js
const path = require("path");
const fs = require("fs/promises");
const { PDFDocument, rgb, degrees } = require("pdf-lib");
const bookRepository = require("../repositories/bookRepository");
const categoryRepository = require("../repositories/categoryRepository");
const downloadRepository = require("../repositories/downloadRepository");

// Get all books
async function getBooks() {
    return bookRepository.getAllBooks();
}

// Get a single book
async function getBookById(id) {
    const book = await bookRepository.findBookById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    return book;
}

// Create a new book
async function createBook(
    title,
    author,
    description,
    categoryId,
    content,
    filePath,
    coverImageUrl
) {
    // Check category if one was provided
    if (categoryId) {
        const category = await categoryRepository.findCategoryById(categoryId);

        if (!category) {
            throw new Error("Category not found");
        }
    }

    const bookId = await bookRepository.createBook(
        title,
        author,
        description,
        categoryId,
        content,
        filePath,
        coverImageUrl
    );

    return bookRepository.findBookById(bookId);
}

// Update a book
async function updateBook(
    id,
    title,
    author,
    description,
    categoryId,
    content,
    filePath,
    coverImageUrl
) {
    const existingBook = await bookRepository.findBookById(id);

    if (!existingBook) {
        throw new Error("Book not found");
    }

    // Check category if one was provided
    if (categoryId) {
        const category = await categoryRepository.findCategoryById(categoryId);

        if (!category) {
            throw new Error("Category not found");
        }
    }

    await bookRepository.updateBook(
        id,
        title,
        author,
        description,
        categoryId,
        content,
        filePath,
        coverImageUrl
    );

    return bookRepository.findBookById(id);
}
// Delete a book
async function removeBook(id) {
    const existingBook = await bookRepository.findBookById(id);

    if (!existingBook) {
        throw new Error("Book not found");
    }

    await bookRepository.deleteBookById(id);
}
// Search books
async function searchBooks(query) {
    if (!query || !query.trim()) {
        throw new Error("Search query is required");
    }

    return bookRepository.searchBooks(query.trim());
}
// Get book content for reading
async function readBook(id) {
    const book = await bookRepository.findBookById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    return {
        id: book.id,
        title: book.title,
        author: book.author,
        content: book.content
    };
}
// Get book file for download
async function downloadBook(id) {
    const book = await bookRepository.findBookById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!book.file_path) {
        throw new Error("Book file not available");
    }

    const relativePath = book.file_path.replace(/^[/\\]+/, "");

    const filePath = path.resolve(
        __dirname,
        "../../files",
        relativePath
    );

    const booksDirectory = path.resolve(
        __dirname,
        "../../files/books"
    );

    if (!filePath.startsWith(booksDirectory)) {
        throw new Error("Invalid book file path");
    }

    return {
        filePath,
        fileName: path.basename(filePath)
    };
}
async function getWatermarkedBook(id, user) {
    const book = await bookRepository.findBookById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!book.file_path) {
        throw new Error("Book file not available");
    }

    const relativePath = book.file_path.replace(/^[/\\]+/, "");

    const filePath = path.resolve(
        __dirname,
        "../../files",
        relativePath
    );

    const booksDirectory = path.resolve(
        __dirname,
        "../../files/books"
    );

    if (!filePath.startsWith(booksDirectory)) {
        throw new Error("Invalid book file path");
    }

    const pdfBytes = await fs.readFile(filePath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const watermarkText =
        `Downloaded by: ${user.email} | User ID: ${user.id}`;

    const pages = pdfDoc.getPages();

    for (const page of pages) {
        const { width, height } = page.getSize();

        page.drawText(watermarkText, {
            x: width / 4,
            y: height / 2,
            size: 12,
            color: rgb(0.7, 0.7, 0.7),
            rotate: degrees(45),
            opacity: 0.4
        });
    }

    const watermarkedPdf = await pdfDoc.save();

// Record the download
await downloadRepository.createDownload(user.id, book.id);

return {
    pdf: Buffer.from(watermarkedPdf),
    fileName: `${path.parse(book.title).name}-watermarked.pdf`
};
}
module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook,
    searchBooks,
    readBook,
    downloadBook,
    getWatermarkedBook
};