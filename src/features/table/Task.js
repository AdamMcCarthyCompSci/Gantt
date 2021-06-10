import { useDispatch, useSelector } from 'react-redux';
import {
    dragTask,
    resizeTask,
    tasksTable
} from './TableSlice';
import styles from './Table.module.css';
import { Rnd } from "react-rnd";

export function Task({index, row}) {
    const dispatch = useDispatch();
    const tasks = useSelector(tasksTable);

    const getWidth = () => {
        const isTask = (task) =>  ((task.index).isSame(index) && task.row == row);
        const taskIndex = tasks.findIndex(isTask);
        let task = tasks[taskIndex];
        if (task == undefined) {
          console.log("Task not found!", taskIndex);
        }
        return tasks[taskIndex].width;
    }

    return (
            <Rnd className={styles.task}
        onDragStop={(e, d) => {
            const currentX = Math.round(d.x / 50);
            const currentY = Math.round(d.y / 30);
            if (currentX != 0 || currentY != 0) {
                dispatch(dragTask({index: index, row: row, x: currentX, y: currentY}));
            } 
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
            dispatch(resizeTask({index: index, row: row, width: ref.style.width}));
            }}
          bounds=".ganttBody"
          dragGrid={[53, 33]}
          resizeGrid={[53, 33]}
          size={{ width: getWidth() , height: 33 }}
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
            test
        </Rnd>
    )
}