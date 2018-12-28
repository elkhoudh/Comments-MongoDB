import React, { Component } from "react";
import "./App.css";
import Card from "./components/Card";
import Modal from "./components/Modal";
class App extends Component {
  state = {
    "username": "CJ",
    "thumbnailUrl": "",
    "imageUrl": "",
    "likes": 0,
    "comments": [],
    "posts": [],
    "open": false,
    "text": ''
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  componentDidMount = () => {
    this.getData()
  };

  getData = () => {
    const commentsList = [];
    fetch(`http://71.65.239.221:5000/api/posts`)
      .then(res => res.json())
      .then(data =>
        this.setState({ posts: data }, () =>
          this.state.posts.map(post => commentsList.push(post.comments))
        )
      );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    this.handleClose();
    if (!this.state.username ? null : fetch("http://71.65.239.221:5000/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => data, () => this.setState({ username: "" })));
    console.log(this.props.state)
  };


  handleLikes = (id) => {
    fetch(`http://71.65.239.221:5000/api/posts/${id}/likes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(() => this.getData())
  }

  handleDelete = (id) => {
    fetch(`http://71.65.239.221:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(() => this.getData())
  }

  handleComments = (e, id) => {
    e.preventDefault();
    fetch(`http://71.65.239.221:5000/api/posts/${id}/comment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: this.state.text ? JSON.stringify(this.state) : null
    }).then(res => res.json()).then(() => this.getData())
    this.setState({ text: '' })
  }
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <div className="App">
          <Modal getData={this.getData} open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          {posts.map((post, index) => (
            <Card state={this.state} handleChange={this.handleChange} handleComments={(e) => this.handleComments(e, post._id)} handleLikes={() => this.handleLikes(post._id)} handleDelete={() => this.handleDelete(post._id)} key={post._id} post={post} index={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
