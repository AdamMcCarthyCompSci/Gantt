import React, { Component } from "react";
import moment from "moment";
import CalendarTable from "./calendarTable";
import AddRow from "./addRow";
import Left from "./left";
import Right from "./right";
import AddBoxIcon from "@material-ui/icons/AddBox";

class Gantt extends Component {
  state = {
    days: [],
    months: [],
    rows: { count: 0, active: "" },
    startTime: { value: 0, count: 1 },
    start: { value: 1, count: 1 },
    endTime: { value: 0, count: 2 },
  };

  componentDidMount() {
    const { startTime } = this.state;
    const { endTime } = this.state;

    if (startTime.value === 0 && endTime.value === 0) {
      endTime.value =
        moment().daysInMonth() + moment().add(1, "months").daysInMonth();
    }
    const days = [];
    const months = [];

    const { start } = this.state;
    let monthCheck = "";
    const dateStart = moment();
    const currentDay = dateStart.format("D") - start.value;
    dateStart.subtract(currentDay, "days");
    const dateEnd = moment().add(startTime.value + endTime.value, "days");
    dateEnd.subtract(currentDay, "days");

    while (dateEnd.diff(dateStart, "days") > 0) {
      if (monthCheck !== dateStart.format("MMM")) {
        monthCheck = dateStart.format("MMM");
        months.push({
          month: dateStart.format("MMM"),
          year: dateStart.format("YYYY"),
          daysInMonth: dateStart.daysInMonth(),
          key: dateStart.format("MM/YYYY"),
        });
      }
      days.push({
        dayNumber: dateStart.format("D"),
        dayName: dateStart.format("ddd"),
        key: dateStart.format("DD/MM/YYYY"),
        value: dateStart.format("DD/MM/YYYY"),
        background: "",
      });
      dateStart.add(1, "days");
    }

    this.setState({ days, months, startTime, endTime });

    return { days, months, startTime, endTime };
  }

  handleAddRows = () => {
    const rows = this.state.rows;
    rows.count++;
    this.setState({ rows });
  };

  addLeft = () => {
    let start = { ...this.state.start };
    const subStart = moment().subtract(start.count, "months");
    start.value -= subStart.daysInMonth();
    start.count += 1;

    let startTime = { ...this.state.startTime };
    const addMonth = moment().subtract(startTime.count, "months");
    startTime.value += addMonth.daysInMonth();
    startTime.count += 1;
    this.setState({ start, startTime }, this.componentDidMount);
  };

  addRight = () => {
    let endTime = { ...this.state.endTime };
    const addMonth = moment().add(endTime.count, "months");
    endTime.value += addMonth.daysInMonth();
    endTime.count += 1;
    console.log(addMonth.daysInMonth());
    this.setState({ endTime }, this.componentDidMount);
  };

  colourChangeOn = (cellKey, activeRow) => {
    const days = [...this.state.days];
    const index = days.findIndex((day) => day.value === cellKey);
    const cell = { ...days[index] };
    cell.background = "#4f5b66";
    days[index] = cell;
    const rows = { ...this.state.rows };
    rows.active = activeRow;
    this.setState({ days, rows });
  };

  colourChangeOff = (cellKey, activeRow) => {
    const days = [...this.state.days];
    const index = days.findIndex((day) => day.value === cellKey);
    const cell = { ...days[index] };
    cell.background = "";
    days[index] = cell;
    this.setState({ days });
  };

  render() {
    const { days, months, rows } = this.state;
    return (
      <div>
        <AddRow handleAddRows={this.handleAddRows} />
        <Left addLeft={this.addLeft} />
        <Right addRight={this.addRight} />
        <div
          style={{
            height: "500px",
            overflow: "scroll",
            backgroundColor: "gray",
          }}
        >
          <CalendarTable
            days={days}
            months={months}
            rows={rows}
            colourChangeOn={this.colourChangeOn}
            colourChangeOff={this.colourChangeOff}
          />
        </div>
      </div>
    );
  }
}

export default Gantt;
