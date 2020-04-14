const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title:String,
    desc: String
});

const PostSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    desc: String,
    steps: [StepSchema]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;