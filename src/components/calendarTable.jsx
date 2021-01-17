import React, { Component } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";

class CalendarTable extends Component {
  state = {};



  render() {
    const { days, months, rows, colourChangeOn, colourChangeOff } = this.props;

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
        <tbody>
          {[...Array(rows.count)].map((row, index) => (
            <tr key={index}>
              {days.map((items) => (
                <td
                  key={items.key}
                  style={{ width: "60px" }}
                  id={index}
                  onMouseOver={colourChangeOn.bind(this, items.value, index)}
                  onMouseLeave={colourChangeOff.bind(this, items.value, index)}
                >
                  {rows.active == index && items.background !== "" && <AddBoxIcon color="disabled" fontSize="small" />}
                                  
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
