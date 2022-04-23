const express = require("express");
const path = require("path");

const app = express();

//1 - to send a text
// app.get("/", (req, res) => {
//   res.send("Hello there!");
// });

//2 - to send a file
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//3.to send a static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port " + PORT));
