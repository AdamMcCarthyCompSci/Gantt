import React, { Component } from "react";
import { Rnd } from "react-rnd";
import moment from "moment";

class Tasks extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
    width: this.props.width,
    height: this.props.height,
    mouseColumn: "",
    mouseRow: "",
    mousingOver: false,
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

  render() {
    const { width, height, x, y } = this.state;
    const { row, column } = this.props;
    return (
      <React.Fragment>
        <Rnd
          onMouseEnter={() => {
            this.handleMouseOver(column, row, x, y);
          }}
          onMouseOver={() => {
            this.handleMouseOver(column, row, x, y);
          }}
          onMouseLeave={() => {
            this.handleMouseLeave();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
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
          onResizeStop={(e, direction, ref, delta, position) => {
            this.setState({
              width: Math.round(ref.offsetWidth / 40) * 40,
              ...position,
            });
            this.handleMouseLeave();
            this.onTrigger();
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
          Test
        </Rnd>
      </React.Fragment>
    );
  }
}

export default Tasks;
