const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title:String,
    pages: Number
});

const AuthorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    books: [BookSchema]
});

const Author = mongoose.model('author', AuthorSchema);

module.exports = Author;