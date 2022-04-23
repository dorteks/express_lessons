//   middleware - logger (a new file logger.js created, exported and requested)
//   json - members (exporting and req. members)
//   moments - to log current date and time
//   get single member

const { doesNotMatch } = require("assert");
const express = require("express");
const path = require("path");

const { getMaxListeners } = require("process");

const app = express();

const members = require("./Members");

const logger = require("./logger");

//middleware
//log a message to the terminal
// const logger = (req, res, next) => {
//   console.log("Request made");
//   next();
// };

//to log a http,
// const logger = (req, res, next) => {
//   console.log(
//     req.protocol +
//       " //" +
//       req.get("host") +
//       req.originalUrl +
//       " " +
//       moment().format()
//   );
//   next();
// };

//init middleware
app.use(logger);

//to return json
app.get("/api/members", (req, res) => {
  res.json(members);
});

//get single member
app.get("/api/members/:id", (req, res) => {
  // res.send(req.params.id);

  const find = members.some((member) => member.id === parseInt(req.params.id));

  if (find) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json(`No member with the id of ` + req.params.id);
  }
});

// to send a static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port " + PORT));
