var db = require("../models");

module.exports = function(app) {

    app.get("/scraping", function(req, res) {
        axios.get("https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en").then(function(res) {
            var $ = cheerio.load(res.data);

            $("article").each(function(i, element) {
                var result = {};
                result.title = $(this).children("h3 a").text();
                result.url = $(this).children("h3 a").attr("herf");
                result.summary = $(this).children("div span").text();
                result.video = $(this).children("div div a").attr("href");

                db.Article.create(scrapedObj).then(function(dbArticle) {
                    console.log(dbArticle);
                }).catch(function(err) {
                    console.log(err);
                });
            });

            res.send("Scrape Completed");
        });
    });

    app.get("/articles", function(req, res) {
        db.Article.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body).then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

};