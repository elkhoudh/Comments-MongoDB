import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    maxWidth: 615,
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  TextField: {
    width: "100%"
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, post, handleDelete, handleLikes, handleComments, handleChange, state } = this.props;
    const comments = post.comments.map((comment, i) => (
      <div key={i}>
        <span className="bold">{comment.username}</span>
        <span> {comment.text}</span>
      </div>
    ));
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={post.thumbnailUrl}
              className={classes.avatar}
            />
          }
          action={
            <IconButton>
              {/* <DeleteIcon onClick={handleDelete} /> */}
            </IconButton>
          }
          title={post.username}
          subheader={post.timestamp}
        />
        <CardMedia
          className={classes.media}
          image={post.imageUrl}
          title="Paella dish"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon onClick={handleLikes} />
          </IconButton>
          <span className="bold" component="h1">
            {post.likes} Likes
          </span>
          <IconButton aria-label="Share">
            <CommentIcon />
          </IconButton>
        </CardActions>
        <CardContent>{comments}</CardContent>
        <form onSubmit={handleComments}>
          <TextField
            id="comment"
            name="text"
            onChange={handleChange}
            className={classes.TextField}
            type="text"
            placeholder="Add a Comment..."
            value={state.text}
          />
        </form>

      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
