var axios = require("axios");
var cheerio = require("cheerio")

var scrape = function (cb) {

    axios.get("https://www.nytimes.com/section/us").then(function (response) {
        var $ = cheerio.load(response.data);
        
        var result = {};

        $("article div").each(function (i, element) {
            var title = $(this).children("h2").children("a").text();
            var link = $(this).children("h2").children("a").attr("href");
            var summary = $(this).children("p").text();
            var image = $(this).parent("figure").children("a").attr("src")

            if(title && link && summary && image) {
                var titleNeat = title.replace(/(\r\n||n|\r|\t|\s+)/gm, " ").trim();
                var linkNeat = link.replace(/(\r\n||n|\r|\t|\s+)/gm, " ").trim();
                var summaryNeat = summary.replace(/(\r\n||n|\r|\t|\s+)/gm, " ").trim();
                var imageNeat = image.replace(/(\r\n||n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    title: titleNeat,
                    link: linkNeat,
                    summary: summaryNeat,
                    image: imageNeat
                };

                result.push(dataToAdd);
            }
        });
        cb(result);
    });
};

module.exports = scrape;