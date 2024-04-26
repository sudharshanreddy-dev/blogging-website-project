const mongo = require('mongoose');

const articleSchema = new mongo.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique:true
    }
});

const ArticleData = mongo.model('ArticleData', articleSchema);

module.exports = ArticleData
