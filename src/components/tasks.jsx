import React, { Component } from "react";
import { Rnd } from "react-rnd";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

class Tasks extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
    width: this.props.width,
    height: this.props.height,
    mouseColumn: "",
    mouseRow: "",
    mousingOver: false,
    name: this.props.name,
    description: this.props.description,
    dragging: this.props.dragging,
    liveWidth: 40
  };

  onTrigger = () => {
    const childData = {
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
      id: this.props.id,
      mouseColumn: this.state.mouseColumn,
      mouseRow: this.state.mouseRow,
      mousingOver: this.state.mousingOver,
    };
    this.props.parentCallback(childData);
  };

  handleMouseOver = (column, row, x, y) => {
    this.props.allColoursOff();
    if (x !== 0) {
      x /= 40;
    }
    const mouseColumn = moment(column, "DD/MM/YYYY")
      .add(x, "days")
      .format("DD/MM/YYYY");
    const mousingOver = true;

    if (y !== 0) {
      y /= 30;
    }
    row += y;
    const mouseRow = row;

    this.setState({ mouseColumn, mouseRow, mousingOver }, this.onTrigger);
  };

  handleMouseLeave = () => {
    const mousingOver = false;
    this.props.allColoursOff();
    this.setState({ mousingOver }, this.onTrigger);
  };

  // handleNameEdit = (event) => {
  //   this.setState({ name: event }, console.log(this.state.name));
  // };

  onNameTrigger = () => {
    const childData = {
      name: this.props.name,
      description: this.props.description,
      id: this.props.id,
      highlighted: this.props.id,
      dragging: this.props.dragging,
    };
    // console.log("trigger",this.state.dragging)
    this.props.nameCallback(childData);
  };

  titleLength = (width) => {
    let remainder =
      this.props.name.length -
      (width / 40) * 3 -
      (width / 40 - 1);
    if (remainder <= 0) {
      return this.props.name;
    } else {
      return this.props.name.slice(0, -remainder).concat("...");
    }
  };

  updateWidth = (newWidth) => {
    return newWidth;
  };

  render() {
    const { width, height, x, y } = this.state;
    const { row, column, highlighted } = this.props;
    return (
      <React.Fragment>
        {this.props.updateTask(
          this.props.id,
          this.props.name,
          this.props.description
        )}
        <Rnd
          onClick={() => {
            this.onNameTrigger();
          }}
          onMouseEnter={() => {
            this.handleMouseOver(column, row, x, y);
          }}
          // onMouseOver={() => {
          //   this.handleMouseOver(column, row, x, y);
          // }}
          onMouseLeave={() => {
            this.handleMouseLeave();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: highlighted,
            background: "#0E5A8A",
            borderRadius: "5px",
          }}
          size={{ width: width, height: height }}
          position={{ x: Math.round(x / 40) * 40, y: y }}
          bounds=".bodyBoundary"
          onDragStart={() => {
            this.handleMouseLeave();
            this.onTrigger();
          }}
          onDragStop={(e, d) => {
            const currentX = Math.round(d.x / 40) * 40;
            const currentY = Math.round(d.y / 30) * 30;
            this.setState({ x: currentX, y: currentY });
            this.handleMouseLeave();
            this.onTrigger();
          }}
          // onResize={(ref) => {
          //     this.updateWidth(Math.round(ref.offsetWidth / 40) * 40)
          //   }}
          onResizeStart={() => {
            this.setState({ dragging: true }, this.onNameTrigger);
            // console.log("start",this.state.dragging);
          }}
          onResize={(e, direction, ref, delta, position) => {
            // let liveWidth = Math.round(ref.offsetWidth / 40) * 40
            // window.liveWidth = Math.round(ref.offsetWidth / 40) * 40
            // console.log(window.liveWidth)
            const liveWidth = Math.round(ref.offsetWidth / 40) * 40
            this.setState({liveWidth})
            // console.log(liveWidth)
            //   this.titleLength(liveWidth)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.handleMouseLeave();
            this.setState(
              {
                width: Math.round(ref.offsetWidth / 40) * 40,
                ...position,
                dragging: false,
              },
              this.onNameTrigger
            );
            this.onTrigger();
            // console.log("stop",this.state.dragging);
          }}
          enableResizing={{
            top: false,
            right: true,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          {this.titleLength(this.state.liveWidth)}
          {/* <TextField
            id="outlined-basic"
            value={this.state.name}
            onChange={(event) => {
              this.handleNameEdit(event.target.value);
            }}
            variant="outlined"
          /> */}
        </Rnd>
      </React.Fragment>
    );
  }
}

export default Tasks;
