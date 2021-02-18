import React, { Component } from "react";

class TaskTable extends Component {
  state = {};
  render() {
    const { days, months, rows } = this.props;

    return (
      <table
        class="table table-bordered table-striped table-sm table-dark table-hover"
        style={{ width: "300%" }}
      >
        <thead>
          <tr>
            <th class="taskHeader" style={{ fontSize: "20px" }}>
              Tasks
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows.count)].map((row, index) => (
            <tr key={index}>
              <td>task</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TaskTable;
