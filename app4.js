//

const { doesNotMatch } = require("assert");
const express = require("express");
const path = require("path");

const { getMaxListeners } = require("process");

const app = express();

const exphbs = require("express-handlebars");

const members = require("./Members");

const logger = require("./logger");

//init middleware
app.use(logger);

// handlebars middleware
// app.engine("handlebars", exphbs({ default: "main" }));
// app.set("view engine", "handlebars");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express handlebars - Hompage router
app.get("/", (req, res) => {
  res.render("index");
});

// to send a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port " + PORT));
