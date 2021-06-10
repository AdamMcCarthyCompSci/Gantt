import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  rowCountTable,
  currentDayTable,
  daysTable,
  tasksTable,
  createTask

} from './TableSlice';
import styles from './Table.module.css';
import moment from "moment";
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import { Task } from './Task';

const checkWeekend = (date, currentDay) => {
  if (moment(date).isSame(currentDay)) {
    return (
      <td className={styles.today} key={date}>
        {date.format("Do")}
      </td>)
  }
  else if (date.format("d") == 0 || date.format("d") == 6) {
    return (
    <td className={styles.weekend} key={date}>
      {date.format("Do")}
    </td>)
  }
  else {
    return (
      <td className={styles.weekday} key={date}>
        {date.format("Do")}
      </td> )
  }
}

const checkMonth = (date) => {
  if(moment(date).format("D") == 1) {
    return (
      <td className={styles.month} key={date} colSpan={date.daysInMonth()}>
        {date.format("MMMM YYYY")}
      </td>
    );
  }
  else {
    return;
  }
}

export function Table() {

  const dispatch = useDispatch();
  const count = useSelector(rowCountTable);
  const currentDay = useSelector(currentDayTable);
  const days = useSelector(daysTable);
  const tasks = useSelector(tasksTable);
  const [mouseOverCell, setMouseOverCell] = React.useState({date: null, rowNumber: null});

  const handleMouseOver = (date, rowNumber) => {
    setMouseOverCell({date, rowNumber});
  };

  const checkRow = (date, index, row) => {

    if (row % 2 == 0) {
      return (
        <td className={styles.evenRow} 
        key={date}
        onMouseOver={() => handleMouseOver(date, row)}
        onMouseLeave={() => handleMouseOver(null, null)}
        onClick={() => dispatch(createTask({index: index, row: row, width: 53}))}>
            {tasks.map((task) => (
            task.index.isSame(index, "day") && task.row == row && <Task index={index} row={row}/>
              ))}
          <Zoom in={date == mouseOverCell.date && row == mouseOverCell.rowNumber} {...(mouseOverCell ? { timeout: 800 } : {})} mountOnEnter unmountOnExit>
            <AddIcon />
          </Zoom>
        </td>
      )
    }
    else {
      return (
        <td className={styles.oddRow} 
        key={date}
        onMouseOver={() => handleMouseOver(date, row)}
        onMouseLeave={() => handleMouseOver(null, null)}
        onClick={() => dispatch(createTask({index: index, row: row, width: 53}))}>
            {tasks.map((task) => (
            task.index.isSame(index, "day") && task.row == row && <Task index={index} row={row}/>
              ))}
          <Zoom in={date == mouseOverCell.date && row == mouseOverCell.rowNumber} {...(mouseOverCell ? { timeout: 800 } : {})} mountOnEnter unmountOnExit>
            <AddIcon />
          </Zoom>
        </td>
      )
    }
  }

  return (
    <div>
      <div className={styles.tableContainer}>
      <table>
        <thead>
            <tr>
          {days.map((date) => (
            checkMonth(date)
          ))}
        </tr>
            <tr>
          {days.map((date) => (
            checkWeekend(date, currentDay)
          ))}
          </tr>
          </thead>
          <tbody className="ganttBody">
            {[...Array(count)].map((index, row) => (
                <tr className={styles.row}>
                  {days.map((index, date) => (
                    checkRow(date, index, row)
                  ))}
                </tr>
          ))}
            </tbody>
      </table>
      </div>
    </div>
  );
}
