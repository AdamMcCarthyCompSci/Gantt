import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  rowCountTable,
  currentDayTable,
  daysTable,
  tasksTable,
  createTask,
  themesTable,

} from './TableSlice';
import styles from './Table.module.css';
import dayjs from 'dayjs';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import { Task } from './Task';

const checkWeekend = (date, currentDay) => {
  if (dayjs(date).isSame(currentDay)) {
    return (
      <th className={styles.today}
      //  key={date}
       >
        {date.format("D")}
      </th>)
  }
  else if (date.format("d") == 0 || date.format("d") == 6) {
    return (
    <th className={styles.weekend}
    //  key={date}
     >
      {date.format("D")}
    </th>)
  }
  else {
    return (
      <th className={styles.weekday} key={date}>
        {date.format("D")}
      </th> )
  }
}

const checkMonth = (date) => {
  if(dayjs(date).format("D") == 1) {
    return (
      <th className={styles.month}
      //  key={date} 
       colSpan={date.daysInMonth()}>
        {date.format("MMMM YYYY")}
      </th>
    );
  }
  else {
    return;
  }
}

export function Table() {

  const dispatch = useDispatch();
  const count = useSelector(rowCountTable);
  const themes = useSelector(themesTable);
  const currentDay = useSelector(currentDayTable);
  const days = useSelector(daysTable);
  const tasks = useSelector(tasksTable);
  const [mouseOverCell, setMouseOverCell] = React.useState({date: null, rowNumber: null});

  const handleMouseOver = (date, rowNumber) => {
    setMouseOverCell({date, rowNumber});
  };

  const checkRow = (date, index, theme, row) => {

      return (
      <td className={rowClass(row)}
        // key={date}
        onMouseOver={() => handleMouseOver(date, row)}
        onMouseLeave={() => handleMouseOver(null, null)}
        onClick={() => dispatch(createTask({name: "", desc: "", index: index, row: row, themeLocation: theme, theme: theme, width: 52}))}>
            {tasks.map((task) => (
            task.index.isSame(index, "day") && task.themeLocation === theme && task.row === row && <Task index={index} row={row} themeLocation={theme}/>
              ))}
          <Zoom in={date == mouseOverCell.date && row == mouseOverCell.rowNumber} {...(mouseOverCell ? { timeout: 800 } : {})} mountOnEnter unmountOnExit>
            <AddIcon />
          </Zoom>
      </td>
      )
  }

  const rowClass = (row) => {
    return (row === 0 ? styles.oddRow : styles.evenRow)
  }

  return (
      <div className={styles.mainTableContainer}>
      <table className={styles.mainTable}>
        <thead style={{color: "white"}}>
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
          {/* <tbody className="ganttBody">
            {[...Array(count)].map((index, row) => (
                <tr>
                  {days.map((index, date) => (
                    checkRow(date, index, row)
                  ))}
                </tr>
          ))}
            </tbody> */}
          <tbody className="ganttBody">
            {themes.map((theme) => (
              [...Array(theme.rows)].map((index, row) => (
                <tr>
                {days.map((index, date) => (
                  checkRow(date, index, theme.title, row)
              ))}
              </tr>
            ))
          ))}
            </tbody>
      </table>
      </div>
  );
}
