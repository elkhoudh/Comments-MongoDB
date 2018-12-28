import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

const OutlinedTextFields = props => {
  const { classes, handleChange, handleSubmit } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.container}
      noValidate
      autoComplete="off"
    >
      <TextField
        required={true}
        id="outlined-full-width"
        label="Username"
        style={{ margin: 8 }}
        placeholder="Username"
        helperText="Enter Username"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        name="username"
        onChange={handleChange}
      />
      <TextField
        required={true}
        id="outlined-full-width"
        label="Thumbnail"
        style={{ margin: 8 }}
        placeholder="Avatar"
        helperText="Enter avatar URL"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        name="thumbnailUrl"
        onChange={handleChange}
      />
      <TextField
        required={true}
        id="outlined-full-width"
        label="Image"
        style={{ margin: 8 }}
        placeholder="Image"
        helperText="Enter Image URL"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        name="imageUrl"
        onChange={handleChange}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Add Post
      </Button>
    </form>
  );
};

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
