import React, { Component } from "react";
import moment from "moment";
import CalendarTable from "./calendarTable";
import AddRow from "./addRow";
import Left from "./left";
import Right from "./right";
import Details from "./details";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Grid from "@material-ui/core/Grid";

class Gantt extends Component {
  state = {
    days: [],
    months: [],
    rows: { count: 0, active: "" },
    startTime: { value: 0, count: 1 },
    start: { value: 1, count: 1 },
    endTime: { value: 0, count: 2 },
    name: "",
    description: "",
    id: 0,
    highlighted: "",
    dragging: false
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
        momentValue: dateStart,
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
    this.setState({ endTime }, this.componentDidMount);
  };

  colourChangeOn = (cellKey, activeRow, widthCount) => {
    // if (!this.state.dragging) {
      // console.log("colour",this.state.dragging)
    const days = [...this.state.days];
    let index = days.findIndex((day) => day.value === cellKey);
    if (widthCount > 0) {
      for (let i = 0; i < widthCount; i++) {
        const cell = { ...days[index] };
        cell.background = "#4f5b66";
        days[index] = cell;
        const rows = { ...this.state.rows };
        rows.active = activeRow;
        index++;
        this.setState({ days, rows });
      }
    } else {
      const cell = { ...days[index] };
      if (cell.background !== "#4f5b66") {
      cell.background = "#4f5b66";
      days[index] = cell;
      const rows = { ...this.state.rows };
      rows.active = activeRow;
      this.setState({ days, rows });
    }
  }
  // }
  };

  colourChangeOff = (cellKey, activeRow) => {
    // if (this.state.dragging === false) {
      // console.log("off",this.state.dragging)
    const days = [...this.state.days];
    const index = days.findIndex((day) => day.value === cellKey);
    const cell = { ...days[index] };
    cell.background = "";
    days[index] = cell;
    this.setState({ days });
    // }
  };

  allColoursOff = () => {
    const days = [...this.state.days];
    days.forEach((element) => {
      element.background = "";
    });
    this.setState({ days });
  };

  // taskColourChangeOn = (cellKey, activeRow) => {
  //   const days = [...this.state.days];
  //   const index = days.findIndex((day) => day.value === cellKey);
  //   const cell = { ...days[index] };
  //   cell.background = "#4f5b66";
  //   days[index] = cell;
  //   const rows = { ...this.state.rows };
  //   rows.active = activeRow;
  //   this.setState({ days, rows });
  // };

  // taskColourChangeOff = (cellKey, activeRow) => {
  //   const days = [...this.state.days];
  //   const index = days.findIndex((day) => day.value === cellKey);
  //   const cell = { ...days[index] };
  //   cell.background = "";
  //   days[index] = cell;
  //   this.setState({ days });
  // };

  handleNameCallback = (childData) => {
    this.setState({ name: childData.name, description: childData.description, id: childData.id, highlighted: childData.highlighted, dragging: childData.dragging })
  }

  render() {
    const { days, months, rows } = this.state;

    return (
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Left addLeft={this.addLeft} />
        </Grid>
        <Grid item xs={6}>
          <Right addRight={this.addRight} />
        </Grid>
        <Grid item xs={1}>
          <AddRow handleAddRows={this.handleAddRows} />
        </Grid>
        <Grid item xs={11}>
          <div
            style={{
              height: "500px",
              width: "91.777%",
              overflow: "scroll",
              backgroundColor: "gray",
              position: "absolute",
              display: "flex",
            }}
            className="boundary"
          >
            <CalendarTable
              days={days}
              months={months}
              rows={rows}
              colourChangeOn={this.colourChangeOn}
              colourChangeOff={this.colourChangeOff}
              allColoursOff={this.allColoursOff}
              taskColourChangeOn={this.taskColourChangeOn}
              taskColourChangeOff={this.taskColourChangeOff}
              nameCallback={this.handleNameCallback}
              name={this.state.name}
              description={this.state.description}
              id={this.state.id}
              highlighted={this.state.highlighted}
              dragging={this.state.dragging}
              className="tableBoundary"
            />
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "500px" }}>
          <Details name={this.state.name} description={this.state.description} id={this.state.id} highlighted={this.state.highlighted} nameCallback={this.handleNameCallback}/>
        </Grid>
      </Grid>
    );
  }
}

export default Gantt;
