var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

require("./routes/html-routes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://test:password1@ds045637.mlab.com:45637/heroku_d63fqf64";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("App is running on port " + PORT + "!");
});

