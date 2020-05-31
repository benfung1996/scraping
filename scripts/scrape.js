var axios = require("axios");
var cheerio = require("cheerio")

var scrape = function (cb) {

    axios.get("https://www.nytimes.com/section/us").then(function (response) {
        var $ = cheerio.load(response.data);
        
        var result = [];

        $("article div").each(function (i, element) {
            var title = $(this).children("h2").children("a").text();
            var link = $(this).children("h2").children("a").attr("href");
            var summary = $(this).children("p").text();
            var image = $(this).parent("article").children("figure").children("a").attr("src")

            if(title) {
                
                var dataToAdd = {
                    title: title,
                    link: link,
                    summary: summary,
                    image: image
                };

                result.push(dataToAdd);
            }
        });
        cb(result);
    });
};

module.exports = scrape;