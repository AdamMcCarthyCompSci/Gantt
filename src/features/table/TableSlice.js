import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";

const current = moment();
let firstOfMonth = moment(current).subtract(moment().format("D") - 1, "days")
let days = []
let currentMonth = moment(firstOfMonth);
let daysInCurrentMonth = moment(currentMonth).daysInMonth();
for (let i = 1; i <= daysInCurrentMonth; i++) {
  days.push(currentMonth)
  currentMonth = moment(currentMonth).add(1, "days");
}

export const slice = createSlice({
  name: 'table',
  initialState: {
    rowCount: 10,
    currentDay: moment(current),
    rightMonth: moment(firstOfMonth),
    leftMonth: moment(firstOfMonth),
    firstOfMonth: moment(firstOfMonth),
    monthCount: 0,
    days: days,
    tasks: []
  },
  reducers: {
    increment: state => {
      state.rowCount += 1;
    },
    decrement: state => {
      state.rowCount -= 1;
    },
    futureMonth: state => {
      state.monthCount += 1;
      state.leftMonth.add(1, "month");
      let futureMonthDays = []
      let futureMonth = moment(state.leftMonth);
      let daysInFutureMonth = moment(futureMonth).daysInMonth();
      for (let i = 1; i <= daysInFutureMonth; i++) {
        futureMonthDays.push(futureMonth)
        futureMonth = moment(futureMonth).add(1, "days");
      }
      state.days = state.days.concat(futureMonthDays);
    },
    pastMonth: state => {
      state.monthCount += 1
      state.rightMonth.subtract(1, "month");
      let pastMonthDays = []
      let pastMonth = moment(state.rightMonth)
      let daysInPastMonth = moment(pastMonth).daysInMonth();
      for (let i = 1; i <= daysInPastMonth; i++) {
        pastMonthDays.push(pastMonth)
        pastMonth = moment(pastMonth).add(1, "days");
      }
      state.days = pastMonthDays.concat(state.days);
    },
    createTask: (state, action) => {
      if (state.tasks.find(task => (task.index).isSame(action.payload.index) && task.row == action.payload.row)) {
        
      }
      else {
        state.tasks.push(action.payload)
      }
    },
    dragTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(action.payload.index) && task.row == action.payload.row);
      const taskIndex = state.tasks.findIndex(isTask);
      let task = state.tasks[taskIndex];
      if (task == undefined) {
        console.log("Task not found!", taskIndex);
      }
      if (action.payload.x > 0) {
        task.index = moment(task.index).add(Math.abs(action.payload.x), "days");
      }
      else if (action.payload.x < 0) {
        task.index = moment(task.index).subtract(Math.abs(action.payload.x), "days");
      }
      if (action.payload.y > 0) {
        task.row += action.payload.y;
      }
      else if (action.payload.y < 0) {
        task.row += action.payload.y;
      }
      console.log(action.payload.x, action.payload.y)
      console.log(task.index, task.row)
      state.tasks[taskIndex].index = task.index;
      state.tasks[taskIndex].row = task.row;
    },
    resizeTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(action.payload.index) && task.row == action.payload.row);
      const taskIndex = state.tasks.findIndex(isTask);
      let task = state.tasks[taskIndex];
      if (task == undefined) {
        console.log("Task not found!", taskIndex);
      }
      state.tasks[taskIndex].width = action.payload.width;
    }
  },
});

export const { increment, decrement, futureMonth, pastMonth, createTask, dragTask, resizeTask } = slice.actions;

export const rowCountTable = state => state.table.rowCount;
export const currentDayTable = state => state.table.currentDay;
export const daysTable = state => state.table.days;
export const tasksTable = state => state.table.tasks;

export default slice.reducer;
