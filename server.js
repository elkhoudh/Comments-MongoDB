const db = require("./src/database");
const express = require("express");
const bodyParser = require("body-parser");
const Comment = require("./src/models/comment");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; font-size: 40px;'>PLEASE USE /api/* Endpoints</h1>"
  );
});

app.get("/api/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) return err;
    res.json(comments);
  });
});

app.post("/api/comments", (req, res) => {
  const username = req.body.username;
  const comment = req.body.comment;
  const wassup = req.body.wassup;
  if (!username || !comment) {
    res.status(422);
    res.json({ error: "Incomplete Params in Body" });
  }

  const newComment = new Comment({
    username: username,
    comment: comment,
    wassup: wassup
  });
  newComment.save().then(() => console.log("new comment inserted"));

  Comment.find({}, (err, comments) => {
    if (err) return err;
    res.json(comments);
  });
});

app.listen(5000, () => console.log("listening on port 5000...."));
