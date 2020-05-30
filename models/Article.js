var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        requried: true
    },
    image: {
        type: String,
        requried: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;