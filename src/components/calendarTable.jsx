import React, { Component } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Tasks from "./tasks";

class CalendarTable extends Component {
  state = {
    tasks: [],
    taskCount: 0,
    mouseOverTask: {
      mouseColumn: "",
      mouseRow: "",
      id: "",
      mousingOver: false,
    },
    highlighted: this.props.highlighted,
  };

  handleCreateTask = (index, items, taskCount) => {
    const tasks = [...this.state.tasks];
    const task = {
      row: index,
      column: items.key,
      x: 0,
      y: 0,
      width: 40,
      height: 30,
      id: taskCount,
      name: "",
      description: "",
    };
    let counter = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (
        tasks[i].row === index &&
        tasks[i].column === items.key &&
        items.background == ""
      ) {
        counter++;
      } else if (
        tasks[i].row === index &&
        tasks[i].column === items.key &&
        tasks[i].x == 0 &&
        tasks[i].y == 0
      ) {
        counter++;
      }
    }
    if (counter === 0) {
      taskCount++;
      tasks.push(task);
      this.setState({ tasks, taskCount: taskCount });
    }
  };

  getTasksIndex = (id) => {
    const tasks = [...this.state.tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return i;
      }
    }
  };

  getStateValue = (id, property) => {
    const index = this.getTasksIndex(id);
    return this.state.tasks[index][property];
  };

  updateTaskState = (id, property, value) => {
    const tasks = [...this.state.tasks];
    const index = this.getTasksIndex(id);
    const task = { ...tasks[index] };
    task[property] = value;
    tasks[index] = task;
    this.setState({ tasks });
  };

  handleCallback = (childData) => {
    this.updateTaskState(childData.id, "x", childData.x);
    this.updateTaskState(childData.id, "y", childData.y);
    this.updateTaskState(childData.id, "width", childData.width);
    this.updateTaskState(childData.id, "height", childData.height);
    const mouseOverTask = {
      mouseColumn: childData.mouseColumn,
      mouseRow: childData.mouseRow,
      id: childData.id,
      mousingOver: childData.mousingOver,
    };
    this.setState({ mouseOverTask });
  };

  handleColourChange = (data, axis) => {
    if (this.state.mouseOverTask.mousingOver) {
      return this.state.mouseOverTask[axis];
    } else {
      return data;
    }
  };

  handleColourWidth = () => {
    if (this.state.mouseOverTask.mousingOver) {
      return this.getStateValue(this.state.mouseOverTask.id, "width") / 40;
    } else {
      return 0;
    }
  };

  updateTaskName = (id, name, description) => {
    if (
      this.getStateValue(id, "name") != name ||
      this.getStateValue(id, "description") != description
    ) {
      const tasks = [...this.state.tasks];
      const index = this.getTasksIndex(id);
      const task = { ...tasks[index] };
      task.name = name;
      task.description = description;
      tasks[index] = task;
      this.setState({ tasks });
    }
  };

  getName = (id, property) => {
    if (this.props.id === id) {
      return this.props[property];
    } else {
      return this.getStateValue(id, property);
    }
  };

  getDescription = (id) => {
    if (this.props.id === id) {
      return this.props.description;
    } else {
      return this.getStateValue(id, "description");
    }
  };

  isHighlighted = (id) => {
    if (this.props.highlighted == id) {
      return "solid 1px #ddd";
    } else {
      return "solid 3px #0E5A8A";
    }
  };

  render() {
    const {
      days,
      months,
      rows,
      colourChangeOn,
      colourChangeOff,
      allColoursOff,
    } = this.props;

    return (
      <table class="table table-bordered table-striped table-sm table-dark table-hover">
        <thead class="">
          <tr key="months">
            {months.map((items) => (
              <th key={items.key} colSpan={items.daysInMonth}>
                {items.month} {items.year}
              </th>
            ))}
          </tr>
          <tr key="days">
            {days.map((items) => (
              <th
                class="header"
                key={items.key}
                style={{ background: items.background }}
              >
                {items.dayNumber}
                <br />
                {items.dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bodyBoundary">
          {[...Array(rows.count)].map((row, index) => (
            <tr key={index}>
              {days.map((items) => (
                <td
                  key={items.key}
                  style={{ width: "60px" }}
                  id={index}
                  onMouseOver={colourChangeOn.bind(
                    this,
                    this.handleColourChange(items.value, "mouseColumn"),
                    this.handleColourChange(index, "mouseRow"),
                    this.handleColourWidth()
                  )}
                  onMouseLeave={colourChangeOff.bind(
                    this,
                    this.handleColourChange(items.value, "mouseColumn"),
                    this.handleColourChange(index, "mouseRow")
                  )}
                  onClick={this.handleCreateTask.bind(
                    this,
                    index,
                    items,
                    this.state.taskCount
                  )}
                >
                  {rows.active == index &&
                    items.background !== "" &&
                    !this.state.mouseOverTask.mousingOver && (
                      <AddBoxIcon color="disabled" fontSize="small" />
                    )}
                  {this.state.tasks
                    .filter(
                      (task) => task.row === index && task.column === items.key
                    )
                    .map((t) => (
                      <Tasks
                        row={index}
                        column={items.key}
                        x={this.getStateValue(t.id, "x")}
                        y={this.getStateValue(t.id, "y")}
                        width={this.getStateValue(t.id, "width")}
                        height={this.getStateValue(t.id, "height")}
                        id={t.id}
                        parentCallback={this.handleCallback}
                        nameCallback={this.props.nameCallback}
                        name={this.getName(t.id, "name")}
                        description={this.getName(t.id, "description")}
                        column={items.value}
                        row={index}
                        colourChangeOff={colourChangeOff}
                        allColoursOff={allColoursOff}
                        updateTask={this.updateTaskName}
                        highlighted={this.isHighlighted(t.id)}
                        dragging={this.props.dragging}
                        dragCallback={this.props.dragCallback}
                      />
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default CalendarTable;
