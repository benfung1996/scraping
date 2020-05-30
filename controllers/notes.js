var makeDate = require("../scripts/date");
var Note = require("../models/Note");

module.exports = {
    get: function(req, res) {
        Note.find({
            _articleId: req._id
        }, res);
    },
    save: function(req, res) {
        var newNote = {
            _articleId: req._id,
            date: makeDate(),
            body: req.body
        };

        Note.create(newNote, function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc)
                res(doc);
            }
        });
    },
    delete: function(req, res) {
        Note.remove({
            _id: data._id
        }, res);
    }
    
};