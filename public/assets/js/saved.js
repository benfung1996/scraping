$(document).ready(function() {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", deleteArticle);
    $(document).on("click", ".btn.notes", notesArticle);
    $(document).on("click", ".btn.save", saveNote);
    $(document).on("click", ".btn.note-delete", deleteNote);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/articles?saved=true")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    };

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
        $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            article.title,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article.link,
            article.summary,
            article.image,
            "</div>",
            "</div>"
        ].join(""));
        panel.data("_id", article._id);

        return panel;
    }

    function renderEmpty() {
        var emptyAlert = 
        $([
            "<div class='alert alert-warning text-center'>",
            "<h4> No saved articles.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>Would you like to browse available articles?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a href='/'>Browse Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
        
    }

    function deleteArticle() {
        var articleToDelete = $(this).parents(".panel").data();

        $.ajax({
            method: "DELETE",
            url: "/api/articles/" + articleToDelete._id,
        })
        .then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function notesArticle() {
        var currentArticle = $(this).parents(".panel").data();
        $.get("/api/notes/" + currentArticle._id).then(function(data) {
            var modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>",
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentArticle._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        })
    }


    function saveArticle() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave = true;

        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        })
        .then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function scrapeArticle() {
        $.get("/api/fetch")
        .then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }
});