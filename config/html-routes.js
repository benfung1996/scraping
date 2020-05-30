var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio")

module.exports = function (app) {

    app.get("/scraping", function (req, res) {
        axios.get("https://www.nytimes.com/section/us").then(function (response) {
            var $ = cheerio.load(response.data);

            $("article div").each(function (i, element) {
                var result = {};
                result.title = $(this).children("h2").children("a").text();
                result.link = $(this).children("h2").children("a").attr("href");
                result.summary = $(this).children("p").text();
                result.image = $(this).parent("figure").children("a").attr("src")

                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                });
            });

            res.send("Scrape Completed");
            res.redirect("/");
        });
    });

    app.get("/", function (req, res) {
        res.render("home");
    });

    app.get("/saved", function(req, res) {
        res.render("saved");
    })

    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body).then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.delete("/articles/:id", function (req, res) {
        db.Note.findOneAndRemove(req.body).then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });


};