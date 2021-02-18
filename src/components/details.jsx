import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class Details extends Component {
  state = {
    name: this.props.name,
    description: this.props.description,
  };

  handleNameEdit = (event) => {
    this.setState({ name: event }, () =>
      this.handleCallback("name", "description")
    );
  };

  handleDescriptionEdit = (event) => {
    this.setState({ description: event }, () =>
      this.handleCallback("description", "name")
    );
  };

  handleCallback = (change, stay) => {
    let childData = {
      id: this.props.id,
      highlighted: this.props.highlighted,
    };
    childData[change] = this.state[change];
    if (this.state[stay] === "") childData[stay] = "";
    else childData[stay] = this.props[stay];
    this.props.nameCallback(childData);
  };

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <h3>Task Name</h3>
          <TextField
            id="outlined-basic"
            value={this.props.name}
            onChange={(event) => {
              this.handleNameEdit(event.target.value);
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <h3>Task Description</h3>
          <TextField
            id="outlined-basic"
            value={this.props.description}
            onChange={(event) => {
              this.handleDescriptionEdit(event.target.value);
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  }
}

export default Details;
