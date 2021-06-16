import { useDispatch, useSelector } from 'react-redux';
import {
    selectTask,
    selectedTaskTable,
    dragTask,
    resizeTask,
    tasksTable
} from './TableSlice';
import styles from './Table.module.css';
import { Rnd } from "react-rnd";
import moment from "moment";
import React from 'react';

export function Task({index, row}) {
    const dispatch = useDispatch();
    const tasks = useSelector(tasksTable);
    const selectedTask = useSelector(selectedTaskTable);

    const getTask = () => {
        const isTask = (task) =>  ((task.index).isSame(index) && task.row == row);
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
        else if ((selectedTask.index).isSame(index) && selectedTask.row == row) {
            return "3px solid #23C9FF";
        }
        else {
            return "";
        }
    }

    return (
        <Rnd className={styles.task}
        style={{border: getBorder()}}
        onClick={() => dispatch(selectTask({name: getTask().name, desc: getTask().desc, index: index, row: row}))}
        onDragStop={(e, d) => {
            const currentX = Math.round(d.x / 53);
            const currentY = Math.round(d.y / 33);
            if (currentX != 0 || currentY != 0) {
                dispatch(dragTask({index: index, row: row, x: currentX, y: currentY}));
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
          {getTask().name}  
        </Rnd>
    )
}