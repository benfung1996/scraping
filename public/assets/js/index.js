
$(document).ready(function() {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", saveArticle);
    $(document).on("click", ".scrape-new", scrapeArticle);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/articles?saved=false")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    };

    
})

