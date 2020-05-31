var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

var router = express.Router();
require("./config/routes")(router);
app.use(router)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Mongoose connection built");
    }
});

app.listen(PORT, function() {
    console.log("App is running on port " + PORT + "!");
});

