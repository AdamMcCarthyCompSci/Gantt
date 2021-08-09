import { useDispatch, useSelector } from 'react-redux';
import {
    selectTask,
    selectedTaskTable,
    dragTask,
    resizeTask,
    tasksTable,
    themesTable
} from './TableSlice';
import styles from './Table.module.css';
import { Rnd } from "react-rnd";
import React from 'react';

export function Task({index, row, themeLocation}) {
    const dispatch = useDispatch();
    const tasks = useSelector(tasksTable);
    const selectedTask = useSelector(selectedTaskTable);
    const themes = useSelector(themesTable);

    const getTask = () => {
        const isTask = (task) =>  ((task.index).isSame(index, "days") && task.row == row);
        const taskIndex = tasks.findIndex(isTask);
        let task = tasks[taskIndex];
        if (task == undefined) {
          console.log("Task not found!", taskIndex);
        }
        return tasks[taskIndex];
    }

    const getBorder = () => {
        if (selectedTask.index == "") {
            return "";
        }
        else if ((selectedTask.index).isSame(index, "days") && selectedTask.row == row) {
            return "3px solid #23C9FF";
        }
        else {
            return "";
        }
    }

    const getColor = (theme) => {
        const isTheme = (object) =>  (theme == object.title);
        const themeIndex = themes.findIndex(isTheme);
        return themes[themeIndex].color;
    }

    const displayTaskName = () => {
        const taskName = getTask().name;
        const taskWidth = getTask().width;
        const taskNameSubstring = (taskWidth / 53) * 4;
        if (taskName.length > taskNameSubstring) {
            return taskName.substring(0, taskNameSubstring).concat("...");
        }
        else {
            return taskName;
        }
        return getTask().name.substring(0, ((getTask().width / 53) * 4) + 4).concat("...");
    }

    return (
        <Rnd className={styles.task}
        style={{border: getBorder(), backgroundColor: getColor(getTask().theme)}}
        onClick={() => dispatch(selectTask({name: getTask().name, desc: getTask().desc, index: index, theme: getTask().theme, width: getTask().width, themeLocation: themeLocation, row: row}))}
        onDragStop={(e, d) => {
            const currentX = Math.round(d.x / 53);
            const currentY = Math.round(d.y / 33);
            if (currentX != 0 || currentY != 0) {
                dispatch(dragTask({index: index, row: row, themeLocation: themeLocation, x: currentX, y: currentY}));
            } 
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
            const resizeChange = Math.round(delta.width / 53);
            dispatch(resizeTask({index: index, row: row, width: ref.offsetWidth, resizeChange: resizeChange, direction: direction}));
            }}
          bounds=".ganttBody"
          dragGrid={[53, 33]}
          resizeGrid={[53, 33]}
          size={{ width: getTask().width , height: 30 }}
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
          {displayTaskName()}  
        </Rnd>
    )
}