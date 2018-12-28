const db = require("./src/database");
const express = require("express");
const bodyParser = require("body-parser");
const Comment = require("./src/models/comment");
const Post = require("./src/models/posts");
var cors = require("cors");

const app = express();
app.use(cors());
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

app.get("/api/posts", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return res.json({ error: err });
    res.json(posts.reverse());
  });
});

app.post("/api/posts", (req, res) => {
  const username = req.body.username;
  const thumbnailUrl = req.body.thumbnailUrl;
  const imageUrl = req.body.imageUrl;
  const likes = req.body.likes;
  const comments = req.body.comments;

  if (!username || !thumbnailUrl || !imageUrl) {
    res.status(422);
    res.json({ error: "Username is Required" });
  }

  const newPost = new Post({
    username: username,
    thumbnailUrl: thumbnailUrl,
    imageUrl: imageUrl,
    likes: likes,
    comments: comments
  });

  newPost.save().then(Post.find({}, (err, posts) => {
    if (err) return res.json({ error: error });
    res.json(posts.reverse());
  }));
});

app.delete('/api/posts/:id', (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }, (err, posts) => {
    if (err) return res.json({ error: err })
    Post.find({}, (err, posts) => {
      if (err) return res.json({ error: err })
      res.json(posts.reverse())
    })
  })
})

app.post('/api/posts/:id/likes', (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }, (err, posts) => {
    if (err) res.json({ error: err })
    Post.find({}, (err, posts) => {
      if (err) return res.json({ error: err })
      res.json(posts.reverse())
    })
  })
})

app.post('/api/posts/:id/comment', (req, res) => {
  const username = req.body.username;
  const text = req.body.text;
  Post.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: { username: username, text: text } } }, (err) => {
    if (err) res.json({ error: err })
    Post.find({}, (err, posts) => {
      if (err) return res.json({ err: error })
      res.json(posts.reverse())
    })
  })
})

app.listen(5000, () => console.log("listening on port 5000...."));
