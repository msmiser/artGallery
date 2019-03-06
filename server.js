var express=require("express");
var bodyParser=require("body-parser");
var logger=require("morgan");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();
app.use(logger("dev"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
var routes = require("./routes/allRoutes.js");


app.use(routes);


app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});