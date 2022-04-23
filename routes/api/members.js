//get all members (return json)

const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

const app = express();

//to return json
router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  // res.send(req.params.id);

  const find = members.some((member) => member.id === parseInt(req.params.id));

  if (find) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json(`No member with the id of ` + req.params.id);
  }
});

// create Member
router.post("/", (req, res) => {
  // res.send(req.body);

  const newMember = {
    id: uuid.v5(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json(`Please include a name and email`);
  }

  members.push(newMember);
  res.json(members);
});

// Update Member
router.put("/:id", (req, res) => {
  const find = members.some((member) => member.id === parseInt(req.params.id));

  if (find) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json(`Member updated` + member);
      }
    });
  } else {
    res.status(400).json(`No member with the id of ` + req.params.id);
  }
});

module.exports = router;
